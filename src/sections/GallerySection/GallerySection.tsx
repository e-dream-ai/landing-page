"use client";

import VideoImage from "@/components/VideoImage/VideoImage";
import { useIsLandscape } from "@/hooks";
import {
  ALL_THUMBNAILS,
  getSectionStartIndex,
  THUMBNAILS_6TH_SECTION,
} from "@/lib/thumbnails";
import { cn } from "@/lib/utils";

export default function GallerySection() {
  const isLandscape = useIsLandscape();

  return (
    <section
      className={cn(
        "gap-5",
        isLandscape
          ? "flex flex-row overflow-x-auto snap-x snap-mandatory pb-4"
          : "grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))]"
      )}
    >
      {THUMBNAILS_6TH_SECTION.map((thumbnail, index) => (
        <VideoImage
          key={thumbnail.src}
          thumbnailSrc={thumbnail.src}
          alt={thumbnail.alt}
          allVideos={ALL_THUMBNAILS}
          videoIndex={getSectionStartIndex(THUMBNAILS_6TH_SECTION) + index}
          forceAutoPlay={isLandscape}
          priority={isLandscape}
          className={cn(
            isLandscape && "flex-shrink-0 snap-start",
            isLandscape
              ? "w-[80vw] sm:w-[60vw] md:w-[40vw] h-auto"
              : "w-full h-full"
          )}
        />
      ))}
    </section>
  );
}
