import ArtistsSection from "@/sections/ArtistsSection/ArtistsSection";
import ExperienceSection from "@/sections/ExperienceSection/ExperienceSection";
import FeaturedDreamsSection from "@/sections/FeaturedDreamsSection/FeaturedDreamsSection";
import GallerySection from "@/sections/GallerySection/GallerySection";
import HeroSection from "@/sections/HeroSection/HeroSection";
import RoadmapSection from "@/sections/RoadmapSection/RoadmapSection";
import TeamSection from "@/sections/TeamSection/TeamSection";

export default function HomePage() {
	return (
		<main className="flex flex-col gap-8">
			<HeroSection />
			<ExperienceSection />
			<ArtistsSection />
			<FeaturedDreamsSection />
			<RoadmapSection />
			<TeamSection />
			<GallerySection />
		</main>
	);
}
