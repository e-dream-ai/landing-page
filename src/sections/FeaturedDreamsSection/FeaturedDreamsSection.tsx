import Container from "@/components/layout/Container/Container";
import VideoImage from "@/components/VideoImage/VideoImage";
import {
	ALL_THUMBNAILS,
	getThumbnailIndex,
	THUMBNAILS_4TH_SECTION,
} from "@/lib/thumbnails";

export default function FeaturedDreamsSection() {
	return (
		<section className="-mt-8 border-b border-white/10">
			<Container className="mx-auto grid max-w-7xl grid-cols-1 gap-5 py-12 sm:grid-cols-3">
				{THUMBNAILS_4TH_SECTION.map((thumbnail) => (
					<VideoImage
						key={thumbnail.src}
						thumbnailSrc={thumbnail.src}
						alt={thumbnail.alt}
						aspectClassName="aspect-[4/5] md:aspect-[9/12]"
						allVideos={ALL_THUMBNAILS}
						videoIndex={getThumbnailIndex(thumbnail)}
					/>
				))}
			</Container>
		</section>
	);
}
