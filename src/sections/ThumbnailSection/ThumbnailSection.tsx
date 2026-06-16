import VideoImage from "@/components/VideoImage/VideoImage";
import { ALL_THUMBNAILS } from "@/lib/thumbnails";
import type { Thumbnail } from "@/lib/types";

interface ThumbnailSectionProps {
	thumbnails: Thumbnail[];
	startIndex: number;
}

export default function ThumbnailSection({
	thumbnails,
	startIndex,
}: ThumbnailSectionProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
			{thumbnails.map((thumbnail, index) => (
				<VideoImage
					key={thumbnail.src}
					thumbnailSrc={thumbnail.src}
					alt={thumbnail.alt}
					allVideos={ALL_THUMBNAILS}
					videoIndex={startIndex + index}
				/>
			))}
		</div>
	);
}
