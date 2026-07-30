import type { ReactNode } from "react";
import Card from "@/components/common/Card/Card";
import { StaggerContainer } from "@/components/common/Stagger/Stagger";
import Container from "@/components/layout/Container/Container";
import VideoImage from "@/components/VideoImage/VideoImage";
import {
	ALL_THUMBNAILS,
	getThumbnailIndex,
	THUMBNAILS_2ND_SECTION,
	THUMBNAILS_3RD_SECTION,
} from "@/lib/thumbnails";
import { cn } from "@/lib/utils";

const INTRO_CARDS: { key: string; content: ReactNode }[] = [
	{
		key: "discover",
		content:
			"Discover and experience animated visuals from a multitude of styles, tempos, and artists.",
	},
	{
		key: "tempo",
		content:
			"Adjust the tempo to match the music you already have playing. Infinidream is designed for ambient enjoyment.",
	},
	{
		key: "depth",
		content:
			"Slow it down to chill out. Speed it up and rocket down the rabbit hole. You control how deep it goes.",
	},
	{
		key: "apps",
		content:
			"Get Mac, PC, and Linux apps for the full experience. Or get basic access with any web browser, no install required.",
	},
	{
		key: "remote",
		content:
			"Use your phone as a remote control. Change the visuals from across the room or anywhere. Interact and influence what everyone sees. Infinidream learns from its audience.",
	},
];

const GALLERY = [...THUMBNAILS_2ND_SECTION, ...THUMBNAILS_3RD_SECTION];
const FEATURED = GALLERY.slice(0, 2);
const REST = GALLERY.slice(2);

export default function ExperienceSection() {
	return (
		<Container className="flex flex-col gap-10 pt-0 md:pt-0">
			{/* Five cards: a row of three, then two wider ones filling the second
			    row so the grid never shows a hole (see issue #31). */}
			<StaggerContainer className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
				{INTRO_CARDS.map((card, index) => (
					<Card
						key={card.key}
						className={cn(
							index < 3 ? "lg:col-span-2" : "lg:col-span-3",
							index === 4 && "sm:col-span-2 lg:col-span-3",
						)}
					>
						<p className="font-secondary text-lg leading-relaxed text-primary-light">
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
							largeVideo
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
