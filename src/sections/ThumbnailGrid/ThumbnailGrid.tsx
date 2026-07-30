import VideoImage from "@/components/VideoImage/VideoImage";
import { ALL_THUMBNAILS, getThumbnailIndex } from "@/lib/thumbnails";
import type { Thumbnail } from "@/lib/types";

interface ThumbnailGridProps {
	thumbnails: Thumbnail[];
}

export default function ThumbnailGrid({ thumbnails }: ThumbnailGridProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
			{thumbnails.map((thumbnail) => (
				<VideoImage
					key={thumbnail.src}
					thumbnailSrc={thumbnail.src}
					alt={thumbnail.alt}
					allVideos={ALL_THUMBNAILS}
					videoIndex={getThumbnailIndex(thumbnail)}
				/>
			))}
		</div>
	);
}
