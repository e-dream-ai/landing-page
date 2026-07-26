import FadeUp from "@/components/common/FadeUp/FadeUp";
import SectionHeader from "@/components/common/SectionHeader/SectionHeader";
import Container from "@/components/layout/Container/Container";
import VideoImage from "@/components/VideoImage/VideoImage";
import {
	ALL_THUMBNAILS,
	getThumbnailIndex,
	THUMBNAILS_6TH_SECTION,
} from "@/lib/thumbnails";

export default function GallerySection() {
	return (
		<Container className="mx-auto flex max-w-7xl flex-col gap-8">
			<FadeUp className="mx-auto">
				<SectionHeader
					align="center"
					label="Gallery"
					title="Endless Dreams"
					description="A living and growing library of animated visuals, from dozens of artists and AIs. Just a taste:"
				/>
			</FadeUp>

			<div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6">
				{THUMBNAILS_6TH_SECTION.map((thumbnail) => (
					<VideoImage
						key={thumbnail.src}
						thumbnailSrc={thumbnail.src}
						alt={thumbnail.alt}
						allVideos={ALL_THUMBNAILS}
						videoIndex={getThumbnailIndex(thumbnail)}
					/>
				))}
			</div>
		</Container>
	);
}
