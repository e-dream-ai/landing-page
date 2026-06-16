import Container from "@/components/layout/Container/Container";
import VideoImage from "@/components/VideoImage/VideoImage";
import {
	ALL_THUMBNAILS,
	getSectionStartIndex,
	THUMBNAILS_4TH_SECTION,
} from "@/lib/thumbnails";

const START_INDEX = getSectionStartIndex(THUMBNAILS_4TH_SECTION);

export default function FeaturedDreamsSection() {
	return (
		<section className="-mt-8 border-b border-white/10">
			<Container className="mx-auto grid max-w-7xl grid-cols-1 gap-5 py-12 sm:grid-cols-3">
				{THUMBNAILS_4TH_SECTION.map((thumbnail, index) => (
					<VideoImage
						key={thumbnail.src}
						thumbnailSrc={thumbnail.src}
						alt={thumbnail.alt}
						aspectClassName="aspect-[4/5] md:aspect-[9/12]"
						allVideos={ALL_THUMBNAILS}
						videoIndex={START_INDEX + index}
					/>
				))}
			</Container>
		</section>
	);
}
