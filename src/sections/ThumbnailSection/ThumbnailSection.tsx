"use client";

import VideoImage from "@/components/VideoImage/VideoImage";
import { useIsLandscape } from "@/hooks";
import { ALL_THUMBNAILS } from "@/lib/thumbnails";
import type { Thumbnail } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ThumbnailSectionProps {
  thumbnails: Thumbnail[];
  startIndex: number;
}

export default function ThumbnailSection({
  thumbnails,
  startIndex,
}: ThumbnailSectionProps) {
  const isLandscape = useIsLandscape();

  return (
    <div
      className={cn(
        "gap-5",
        isLandscape
          ? "flex flex-row overflow-x-auto snap-x snap-mandatory pb-4"
          : "grid grid-cols-1 md:grid-cols-3"
      )}
    >
      {thumbnails.map((thumbnail, index) => (
        <VideoImage
          key={thumbnail.src}
          thumbnailSrc={thumbnail.src}
          alt={thumbnail.alt}
          allVideos={ALL_THUMBNAILS}
          videoIndex={startIndex + index}
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
    </div>
  );
}
