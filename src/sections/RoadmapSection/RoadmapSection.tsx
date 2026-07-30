import Card from "@/components/common/Card/Card";
import FadeUp from "@/components/common/FadeUp/FadeUp";
import SectionHeader from "@/components/common/SectionHeader/SectionHeader";
import { StaggerContainer } from "@/components/common/Stagger/Stagger";
import Section from "@/components/layout/Section/Section";
import { THUMBNAILS_5TH_SECTION } from "@/lib/thumbnails";
import { cn } from "@/lib/utils";
import ThumbnailGrid from "@/sections/ThumbnailGrid/ThumbnailGrid";

const ROADMAP_ITEMS = [
	{
		title: "Edit Any Dream",
		content:
			"Change the prompts, restyle it, make it yours. Infinidream has an expanding ecosystem of AI algorithms, editors, and interfaces.",
	},
	{
		title: "Every Screen",
		content:
			"We support macOS, Windows, and Linux. We plan for Android, iOS, tvOS, and native TV apps.",
	},
	{
		title: "Multi-Screen",
		content:
			"Turn your home or venue into a gallery that you control all from one place.",
	},
	{
		title: "Social Interaction",
		content:
			"Let anyone you choose drive the screen within limits set by you. Drop a QR code next to a display and it becomes a visual jukebox.",
	},
	{
		title: "Audio Reactive",
		content:
			"A mic picks up the music, detects the vibe, and the visuals respond in real time. Infinidream becomes an AI VJ, mixing and scratching on the beats.",
	},
];

export default function RoadmapSection() {
	return (
		<Section className="flex flex-col gap-10">
			<FadeUp>
				<SectionHeader label="Roadmap" title="What’s Next" />
			</FadeUp>

			{/* Five cards: a row of three, then two wider ones filling the second
			    row so the grid never shows a hole (see issue #31). */}
			<StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
				{ROADMAP_ITEMS.map((item, index) => (
					<Card
						key={item.title}
						className={cn(
							index < 3 ? "lg:col-span-2" : "lg:col-span-3",
							index === 4 && "sm:col-span-2 lg:col-span-3",
						)}
					>
						<p className="font-primary text-xl leading-snug text-primary">
							{item.title}
						</p>
						<p className="font-secondary text-lg leading-relaxed text-primary-light">
							{item.content}
						</p>
					</Card>
				))}
			</StaggerContainer>

			<ThumbnailGrid thumbnails={THUMBNAILS_5TH_SECTION} />
		</Section>
	);
}
