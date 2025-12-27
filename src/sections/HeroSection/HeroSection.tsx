"use client";

import Title from "@/components/common/Title/Title";
import VideoImage from "@/components/VideoImage/VideoImage";
import { useIsLandscape } from "@/hooks";
import { ALL_THUMBNAILS, HERO_THUMBNAILS } from "@/lib/thumbnails";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  const isLandscape = useIsLandscape();

  return (
    <section className="flex flex-col gap-14">
      <Title>visuals for your vibe</Title>
      <div
        className={cn(
          "gap-5",
          isLandscape
            ? "flex flex-row overflow-x-auto snap-x snap-mandatory pb-4"
            : "grid grid-cols-1 md:grid-cols-3"
        )}
      >
        {HERO_THUMBNAILS.map((thumbnail, index) => (
          <VideoImage
            key={thumbnail.src}
            thumbnailSrc={thumbnail.src}
            alt={thumbnail.alt}
            priority
            allVideos={ALL_THUMBNAILS}
            videoIndex={index}
            forceAutoPlay={isLandscape}
            className={cn(
              isLandscape && "flex-shrink-0 snap-start",
              isLandscape
                ? "w-[80vw] sm:w-[60vw] md:w-[40vw] h-auto"
                : "w-full h-full"
            )}
          />
        ))}
      </div>
    </section>
  );
}
