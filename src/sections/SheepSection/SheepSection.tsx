import type { ReactNode } from "react";
import Card from "@/components/common/Card/Card";
import FadeUp from "@/components/common/FadeUp/FadeUp";
import SectionHeader from "@/components/common/SectionHeader/SectionHeader";
import { StaggerContainer } from "@/components/common/Stagger/Stagger";
import TextLink from "@/components/common/TextLink/TextLink";
import Section from "@/components/layout/Section/Section";
import VideoImage from "@/components/VideoImage/VideoImage";
import {
	ALL_THUMBNAILS,
	getThumbnailIndex,
	THUMBNAILS_SHEEP_SECTION,
} from "@/lib/thumbnails";

const SHEEP_CARDS: { key: string; content: ReactNode }[] = [
	{
		key: "origin",
		content: (
			<>
				Infinidream comes from the{" "}
				<TextLink href="https://scottdraves.com/sheep">Electric Sheep</TextLink>{" "}
				screen saver — reborn and gone meta. The new Sheep are better than ever,
				now in 1080p.
			</>
		),
	},
	{
		key: "sheep-only",
		content:
			"Infinidream is a platform for all kinds of visuals, but it's your choice what to play. So don’t worry, if you want only Sheep and not AI, then it does that fine.",
	},
	{
		key: "team",
		content: (
			<>
				Created by <TextLink href="https://draves.ai">Scott Draves</TextLink>{" "}
				and a team including{" "}
				<TextLink href="https://www.linkedin.com/in/max-carlson-8959531/">
					Max Carlson
				</TextLink>
				, <TextLink href="https://github.com/glouel">Guillaume Louel</TextLink>,
				and <TextLink href="https://github.com/alansley">Al Lansley</TextLink>.
			</>
		),
	},
];

const FEATURED = THUMBNAILS_SHEEP_SECTION.slice(0, 2);
const REST = THUMBNAILS_SHEEP_SECTION.slice(2);

export default function SheepSection() {
	return (
		<Section className="flex flex-col gap-10">
			<FadeUp>
				<SectionHeader label="Heritage" title="Electric Sheep" />
			</FadeUp>

			<StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{SHEEP_CARDS.map((card) => (
					<Card key={card.key} className="min-h-30">
						<p className="font-secondary text-base leading-relaxed text-primary-light">
							{card.content}
						</p>
					</Card>
				))}
			</StaggerContainer>

			<div className="flex flex-col gap-5">
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
		</Section>
	);
}
