import Title from "@/components/common/Title/Title";
import VideoImage from "@/components/VideoImage/VideoImage";
import { ALL_THUMBNAILS, HERO_THUMBNAILS } from "@/lib/thumbnails";

export default function HeroSection() {
  return (
    <section className="flex flex-col gap-14">
      <Title>visuals for your vibe</Title>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {HERO_THUMBNAILS.map((thumbnail, index) => (
          <VideoImage
            key={thumbnail.src}
            thumbnailSrc={thumbnail.src}
            alt={thumbnail.alt}
            priority
            allVideos={ALL_THUMBNAILS}
            videoIndex={index}
          />
        ))}
      </div>
    </section>
  );
}
