import type { ReactNode } from "react";
import Card from "@/components/common/Card/Card";
import { StaggerContainer } from "@/components/common/Stagger/Stagger";
import TextLink from "@/components/common/TextLink/TextLink";
import Container from "@/components/layout/Container/Container";
import VideoImage from "@/components/VideoImage/VideoImage";
import {
	ALL_THUMBNAILS,
	getThumbnailIndex,
	THUMBNAILS_2ND_SECTION,
	THUMBNAILS_3RD_SECTION,
} from "@/lib/thumbnails";

const INTRO_CARDS: { key: string; content: ReactNode }[] = [
	{
		key: "discover",
		content:
			"Discover and experience animated AI visuals from a multitude of styles, tempos, and artists.",
	},
	{
		key: "tempo",
		content:
			"Adjust the tempo to match the music you already have playing. Or let it drift in silence — your call.",
	},
	{
		key: "depth",
		content:
			"Slow it down for a digital painting that barely moves. Speed it up and fall down the rabbit hole. You control how deep it goes.",
	},
	{
		key: "apps",
		content:
			"Mac and PC apps for the full experience. Any web browser for instant access — no install required.",
	},
	{
		key: "remote",
		content: "Use your phone as a remote. Change visuals from across the room.",
	},
	{
		key: "sheep",
		content: (
			<>
				Infinidream is based on the{" "}
				<TextLink href="https://scottdraves.com/sheep">Electric Sheep</TextLink>{" "}
				screen saver — reborn and gone meta. And don’t worry, if you want only
				Sheep and not AI, then it does that too.
			</>
		),
	},
];

const GALLERY = [...THUMBNAILS_2ND_SECTION, ...THUMBNAILS_3RD_SECTION];
const FEATURED = GALLERY.slice(0, 2);
const REST = GALLERY.slice(2);

export default function ExperienceSection() {
	return (
		<Container className="flex flex-col gap-10">
			<StaggerContainer className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{INTRO_CARDS.map((card) => (
					<Card key={card.key} className="min-h-30">
						<p className="font-secondary text-base leading-relaxed text-primary-light">
							{card.content}
						</p>
					</Card>
				))}
			</StaggerContainer>

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
