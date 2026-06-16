import TextLink from "@/components/common/TextLink/TextLink";
import Container from "@/components/layout/Container/Container";
import VideoImage from "@/components/VideoImage/VideoImage";
import { ROUTES } from "@/constants/routes";
import {
	ALL_THUMBNAILS,
	getThumbnailIndex,
	THUMBNAILS_2ND_SECTION,
	THUMBNAILS_3RD_SECTION,
} from "@/lib/thumbnails";

const PARAGRAPHS = [
	"Discover and experience animated AI visuals from a multitude of styles, tempos, and artists.",
	"Adjust the tempo to match the music you already have playing. Or let it drift in silence — your call.",
	"Slow it down for a digital painting that barely moves. Speed it up and fall down the rabbit hole. You control how deep it goes.",
	"Mac and PC apps for the full experience. Any web browser for instant access — no install required.",
	"Use your phone as a remote. Change visuals from across the room.",
];

const GALLERY = [...THUMBNAILS_2ND_SECTION, ...THUMBNAILS_3RD_SECTION];
const FEATURED = GALLERY.slice(0, 2);
const REST = GALLERY.slice(2);

export default function ExperienceSection() {
	return (
		<Container className="flex flex-col gap-10">
			<div className="mx-auto flex max-w-4xl flex-col gap-5 font-secondary text-base font-light text-white/75">
				{PARAGRAPHS.map((paragraph) => (
					<p key={paragraph}>{paragraph}</p>
				))}

				<p>
					<TextLink href={ROUTES.createAccount}>Create an account</TextLink> —
					where we build this thing together. Get support, share your work,
					shape what comes next.
				</p>
			</div>

			<div className="flex flex-col gap-5 max-w-7xl mx-auto">
				<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
					{FEATURED.map((thumbnail) => (
						<VideoImage
							key={thumbnail.src}
							thumbnailSrc={thumbnail.src}
							alt={thumbnail.alt}
							allVideos={ALL_THUMBNAILS}
							videoIndex={getThumbnailIndex(thumbnail)}
						/>
					))}
				</div>

				<div className="grid grid-cols-2 gap-5 md:grid-cols-4">
					{REST.map((thumbnail) => (
						<VideoImage
							key={thumbnail.src}
							thumbnailSrc={thumbnail.src}
							alt={thumbnail.alt}
							allVideos={ALL_THUMBNAILS}
							videoIndex={getThumbnailIndex(thumbnail)}
						/>
					))}
				</div>
			</div>
		</Container>
	);
}
