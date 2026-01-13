import VideoImage from "@/components/VideoImage/VideoImage";
import {
  ALL_THUMBNAILS,
  getSectionStartIndex,
  THUMBNAILS_6TH_SECTION,
} from "@/lib/thumbnails";

export default function GallerySection() {
  return (
    <section className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
      {THUMBNAILS_6TH_SECTION.map((thumbnail, index) => (
        <VideoImage
          key={thumbnail.src}
          thumbnailSrc={thumbnail.src}
          alt={thumbnail.alt}
          allVideos={ALL_THUMBNAILS}
          videoIndex={getSectionStartIndex(THUMBNAILS_6TH_SECTION) + index}
        />
      ))}
    </section>
  );
}
