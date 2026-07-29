#!/usr/bin/env python3
"""
End-to-end pipeline for adding new videos to the landing page.

For each selected video (given as a UUID or a path to a master MP4) this script:
  1. Copies the master MP4 into video-thumb-masters/ (local archive of sources)
  2. Encodes the 10s large clip  -> public/processed-videos/processed_<uuid>.mp4 (1024x576)
  3. Encodes the 10s small clip  -> public/small-videos/processed_<uuid>.mp4    (384x216)
  4. Extracts the FIRST frame of the large clip as the thumbnail
     -> public/thumbnails/<uuid>.jpg (JPEG quality 85, optimized)
  5. Appends entries to THUMBNAILS_6TH_SECTION in src/lib/thumbnails.ts
     (skipping any thumbnail already referenced; --no-update-ts to just print)

The thumbnail is always the first frame of the processed clip so it matches
exactly what the viewer sees when playback starts.

Examples:
  # by uuid (masters found in the content library)
  ./process_new_videos.py 00f200ff-1ff3-44db-9303-57157819bce4 011a7508-...

  # by file
  ./process_new_videos.py /path/to/some-uuid.mp4

  # uuids listed in a text file, one per line
  ./process_new_videos.py --from-file picks.txt
"""

import argparse
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

UUID_RE = re.compile(r"[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}", re.IGNORECASE)

DEFAULT_MP4_SOURCE = "/Users/Shared/infinidream.ai/content/mp4"
REPO_ROOT = Path(__file__).resolve().parent

LARGE_SCALE = "1024:576"
SMALL_SCALE = "384:216"


def extract_uuid(text):
    """Extract a UUID from a filename or accept a bare UUID."""
    match = UUID_RE.search(text)
    return match.group().lower() if match else None


def resolve_master(item, mp4_source):
    """Resolve a CLI item (uuid or path) to (uuid, master_path)."""
    path = Path(item)
    if path.suffix.lower() == ".mp4" and path.exists():
        uuid = extract_uuid(path.name)
        if not uuid:
            print(f"✗ No UUID in filename: {path.name}")
            return None
        return uuid, path

    uuid = extract_uuid(item)
    if not uuid:
        print(f"✗ Not a UUID or existing .mp4 path: {item}")
        return None

    candidate = mp4_source / f"{uuid}.mp4"
    if candidate.exists():
        return uuid, candidate
    for mp4 in mp4_source.glob("*.mp4"):
        if uuid in mp4.name.lower():
            return uuid, mp4
    print(f"✗ No master found for UUID {uuid} in {mp4_source}")
    return None


def run_ffmpeg(args_list):
    result = subprocess.run(["ffmpeg", "-hide_banner", "-y", *args_list], capture_output=True, text=True)
    if result.returncode != 0:
        print(result.stderr.strip().splitlines()[-1] if result.stderr else "ffmpeg failed")
        return False
    return True


def encode_clip(master, output, scale, duration, start=0.0):
    """10s cut, rescale, x264 CRF 25, no audio — same settings as process_mp4_files.py.

    Anamorphic masters (non-square SAR) are normalized to square pixels and
    center-cropped to 16:9 first, so playback geometry always matches the
    first-frame thumbnail. No-op for square-pixel 16:9 masters.
    """
    output.parent.mkdir(parents=True, exist_ok=True)
    return run_ffmpeg([
        *(["-ss", str(start)] if start else []),
        "-i", str(master),
        "-vf",
        f"scale=iw*sar:ih,crop='min(iw,ih*16/9)':'min(ih,iw*9/16)',scale={scale},setsar=1",
        "-t", str(duration),
        "-c:v", "libx264",
        "-crf", "25",
        "-an",
        str(output),
    ])


def make_thumbnail(large_clip, output):
    """First frame of the processed clip, saved as optimized JPEG quality 85."""
    from PIL import Image

    output.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile(suffix=".jpg", delete=False) as tmp:
        tmp_path = Path(tmp.name)
    try:
        if not run_ffmpeg(["-i", str(large_clip), "-frames:v", "1", "-q:v", "2", str(tmp_path)]):
            return False
        with Image.open(tmp_path) as img:
            if img.mode != "RGB":
                img = img.convert("RGB")
            img.save(output, "JPEG", quality=85, optimize=True)
        return True
    finally:
        tmp_path.unlink(missing_ok=True)


def existing_thumbnail(thumb_dir, uuid):
    path = thumb_dir / f"{uuid}.jpg"
    return path if path.exists() else None


GALLERY_SECTION = "THUMBNAILS_6TH_SECTION"


def format_ts_entry(src, alt):
    return f'\t{{\n\t\tsrc: "{src}",\n\t\talt: "{alt}",\n\t}},\n'


def update_thumbnails_ts(ts_file, srcs):
    """Append entries for srcs to the gallery section of thumbnails.ts.

    Entries whose thumbnail path is already referenced anywhere in the file
    are skipped, so re-runs are safe. Returns (added, skipped) lists.
    """
    content = ts_file.read_text()

    added, skipped = [], []
    new_srcs = []
    for src in srcs:
        (skipped if src in content else new_srcs).append(src)
    if not new_srcs:
        return added, skipped

    # Continue the existing "New AI Visual N" alt-text numbering.
    alt_numbers = [int(n) for n in re.findall(r'alt: "New AI Visual (\d+)"', content)]
    next_alt = max(alt_numbers, default=0) + 1

    # Find the end of the gallery section array: the first "];" after its declaration.
    decl = content.find(f"export const {GALLERY_SECTION}")
    if decl == -1:
        print(f"✗ {GALLERY_SECTION} not found in {ts_file}")
        return added, skipped
    end = content.find("];", decl)
    if end == -1:
        print(f"✗ Could not find end of {GALLERY_SECTION} in {ts_file}")
        return added, skipped

    entries = ""
    for src in new_srcs:
        entries += format_ts_entry(src, f"New AI Visual {next_alt}")
        added.append(src)
        next_alt += 1

    ts_file.write_text(content[:end] + entries + content[end:])
    return added, skipped


def main():
    parser = argparse.ArgumentParser(description="Process new videos into landing-page assets")
    parser.add_argument("items", nargs="*", help="UUIDs or paths to master MP4 files")
    parser.add_argument("--from-file", help="Text file with one UUID (or mp4 path) per line")
    parser.add_argument("--mp4-source", default=DEFAULT_MP4_SOURCE,
                        help=f"Content library with master MP4s (default: {DEFAULT_MP4_SOURCE})")
    parser.add_argument("--site-root", default=str(REPO_ROOT),
                        help="Repo root containing public/ and video-thumb-masters/ (default: script location)")
    parser.add_argument("--thumb-dir", default="thumbnails",
                        help="Thumbnail directory under public/ (default: thumbnails)")
    parser.add_argument("--duration", type=int, default=10, help="Clip duration in seconds (default: 10)")
    parser.add_argument("--start", type=float, default=0.0,
                        help="Timecode in the master to start the clip at, in seconds (default: 0)")
    parser.add_argument("--force", action="store_true", help="Re-process even if outputs already exist")
    parser.add_argument("--no-update-ts", action="store_true",
                        help="Print thumbnails.ts entries instead of editing the file")
    args = parser.parse_args()

    items = list(args.items)
    if args.from_file:
        for line in Path(args.from_file).read_text().splitlines():
            line = line.strip()
            if line and not line.startswith("#"):
                items.append(line)
    if not items:
        parser.error("No videos given. Pass UUIDs/paths or --from-file.")

    mp4_source = Path(args.mp4_source)
    site_root = Path(args.site_root)
    masters_dir = site_root / "video-thumb-masters"
    large_dir = site_root / "public" / "processed-videos"
    small_dir = site_root / "public" / "small-videos"
    thumb_dir = site_root / "public" / args.thumb_dir

    thumb_dir.mkdir(parents=True, exist_ok=True)

    ts_entries = []
    failed = []
    for i, item in enumerate(items, 1):
        print(f"\n[{i}/{len(items)}] {item}")
        resolved = resolve_master(item, mp4_source)
        if not resolved:
            failed.append(item)
            continue
        uuid, master = resolved

        large = large_dir / f"processed_{uuid}.mp4"
        small = small_dir / f"processed_{uuid}.mp4"
        thumb = existing_thumbnail(thumb_dir, uuid)

        if not args.force and large.exists() and small.exists() and thumb:
            print(f"  = already processed (use --force to redo): {thumb.name}")
            ts_entries.append(f"/{args.thumb_dir}/{thumb.name}")
            continue

        masters_dir.mkdir(parents=True, exist_ok=True)
        archived = masters_dir / f"{uuid}.mp4"
        if not archived.exists():
            shutil.copy2(master, archived)
            print(f"  + archived master -> {archived.relative_to(site_root)}")

        ok = True
        for output, scale, label in ((large, LARGE_SCALE, "large"), (small, SMALL_SCALE, "small")):
            if args.force or not output.exists():
                if encode_clip(master, output, scale, args.duration, args.start):
                    print(f"  + {label} clip -> {output.relative_to(site_root)}")
                else:
                    print(f"  ✗ failed to encode {label} clip")
                    ok = False
                    break
        if not ok:
            failed.append(item)
            continue

        if args.force and thumb:
            thumb.unlink()
            thumb = None
        if not thumb:
            thumb = thumb_dir / f"{uuid}.jpg"
            if make_thumbnail(large, thumb):
                print(f"  + thumbnail (first frame) -> {thumb.relative_to(site_root)}")
            else:
                print("  ✗ failed to extract thumbnail")
                failed.append(item)
                continue
        ts_entries.append(f"/{args.thumb_dir}/{thumb.name}")

    print(f"\nDone: {len(ts_entries)} processed, {len(failed)} failed")
    if failed:
        for item in failed:
            print(f"  ✗ {item}")

    if ts_entries:
        ts_file = site_root / "src" / "lib" / "thumbnails.ts"
        if args.no_update_ts or not ts_file.exists():
            print("\nEntries for src/lib/thumbnails.ts:\n")
            for src in ts_entries:
                print(format_ts_entry(src, "New AI Visual"))
        else:
            added, skipped = update_thumbnails_ts(ts_file, ts_entries)
            if added:
                print(f"\nAdded {len(added)} entries to {GALLERY_SECTION} in {ts_file.relative_to(site_root)}")
            if skipped:
                print(f"({len(skipped)} already referenced in thumbnails.ts, left as-is)")

    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
