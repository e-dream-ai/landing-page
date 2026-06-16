import CollaborationSection from "@/sections/CollaborationSection/CollaborationSection";
import ContentSection from "@/sections/ContentSection/ContentSection";
import GallerySection from "@/sections/GallerySection/GallerySection";
import HeroSection from "@/sections/HeroSection/HeroSection";
import RoadMapSection from "@/sections/RoadMapSection/RoadMapSection";
import ShowcaseSection from "@/sections/ShowcaseSection/ShowcaseSection";
import TeamSection from "@/sections/TeamSection/TeamSection";

export default function HomePage() {
	return (
		<main className="flex flex-col gap-8">
			<HeroSection />
			<ContentSection />
			<CollaborationSection />
			<ShowcaseSection />
			<RoadMapSection />
			<TeamSection />
			<GallerySection />
		</main>
	);
}
