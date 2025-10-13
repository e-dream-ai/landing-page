import {
	getSectionStartIndex,
	THUMBNAILS_2ND_SECTION,
	THUMBNAILS_3RD_SECTION,
	THUMBNAILS_4TH_SECTION,
	THUMBNAILS_5TH_SECTION,
} from "@/lib/thumbnails";
import CollaborationSection from "@/sections/CollaborationSection/CollaborationSection";
import ContactSection from "@/sections/ContactSection/ContactSection";
import ContentSection from "@/sections/ContentSection/ContentSection";
import GallerySection from "@/sections/GallerySection/GallerySection";
import HeroSection from "@/sections/HeroSection/HeroSection";
import RoadMapSection from "@/sections/RoadMapSection/RoadMapSection";
import TeamSection from "@/sections/TeamSection/TeamSection";
import ThumbnailSection from "@/sections/ThumbnailSection/ThumbnailSection";

export default function HomePage() {
	return (
		<main className="flex flex-col gap-14">
			<HeroSection />
			<ContentSection />
			<ThumbnailSection
				thumbnails={THUMBNAILS_2ND_SECTION}
				startIndex={getSectionStartIndex(THUMBNAILS_2ND_SECTION)}
			/>
			<ContactSection />
			<ThumbnailSection
				thumbnails={THUMBNAILS_3RD_SECTION}
				startIndex={getSectionStartIndex(THUMBNAILS_3RD_SECTION)}
			/>
			<CollaborationSection />
			<ThumbnailSection
				thumbnails={THUMBNAILS_4TH_SECTION}
				startIndex={getSectionStartIndex(THUMBNAILS_4TH_SECTION)}
			/>
			<RoadMapSection />
			<ThumbnailSection
				thumbnails={THUMBNAILS_5TH_SECTION}
				startIndex={getSectionStartIndex(THUMBNAILS_5TH_SECTION)}
			/>
			<TeamSection />
			<GallerySection />
		</main>
	);
}
