import { ArrowRight } from "lucide-react";
import Card from "@/components/common/Card/Card";
import FadeUp from "@/components/common/FadeUp/FadeUp";
import SectionHeader from "@/components/common/SectionHeader/SectionHeader";
import { StaggerContainer } from "@/components/common/Stagger/Stagger";
import TextLink from "@/components/common/TextLink/TextLink";
import Section from "@/components/layout/Section/Section";
import { ROUTES } from "@/constants/routes";
import { THUMBNAILS_5TH_SECTION } from "@/lib/thumbnails";
import ThumbnailGrid from "@/sections/ThumbnailGrid/ThumbnailGrid";

const ROADMAP_ITEMS = [
	{
		title: "Cloud Generation",
		content:
			'Cloud generation powered by AI and crowd signals. Hit "edit" on any dream — change the prompts, restyle it, make it yours.',
	},
	{
		title: "Every Screen",
		content:
			"Linux, Android, iOS, tvOS, and native TV apps. Every screen you own.",
	},
	{
		title: "Multi-Screen Control",
		content:
			"Turn your home into a gallery that responds to the room — synced across every display.",
	},
	{
		title: "Social Control",
		content:
			"Let anyone nearby drive the screen. Drop a QR code next to a display and it becomes a visual jukebox.",
	},
	{
		title: "Audioreactive Mode",
		content:
			"A mic picks up the music, IDs the song, and the visuals respond in real time. Become an AI VJ.",
	},
];

export default function RoadmapSection() {
	return (
		<Section className="flex flex-col gap-10">
			<FadeUp>
				<SectionHeader label="Roadmap" title="What's Next" />
			</FadeUp>

			<StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{ROADMAP_ITEMS.map((item) => (
					<Card
						key={item.title}
						className="min-h-30"
					>
						<p className="font-primary text-xl leading-snug text-primary">
							{item.title}
						</p>
						<p className="font-secondary text-sm leading-relaxed text-primary-light/60 transition-colors duration-300 group-hover:text-primary-light">
							{item.content}
						</p>
					</Card>
				))}
			</StaggerContainer>

			<div className="mx-auto flex max-w-xl flex-col items-center gap-2 rounded-lg border border-white/10 px-8 py-6 text-center font-secondary text-base text-primary-light">
				<p>Infinidream is free. Building it is not. If this matters to you,</p>
				<TextLink
					href={ROUTES.patreon}
					tone="primary"
					className="inline-flex items-center gap-1.5"
				>
					back us on Patreon
					<ArrowRight className="size-4" />
				</TextLink>
			</div>

			<ThumbnailGrid thumbnails={THUMBNAILS_5TH_SECTION} />
		</Section>
	);
}
