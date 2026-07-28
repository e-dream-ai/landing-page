import Card from "@/components/common/Card/Card";
import FadeUp from "@/components/common/FadeUp/FadeUp";
import SectionHeader from "@/components/common/SectionHeader/SectionHeader";
import { StaggerContainer } from "@/components/common/Stagger/Stagger";
import Section from "@/components/layout/Section/Section";
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
			"We support macOS, Windows, and Linux. We plan for Android, iOS, tvOS, and native TV apps.",
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
			"A mic picks up the music, detects the vibe, and the visuals respond in real time. Infinidream becomes an AI VJ.",
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
					<Card key={item.title} className="min-h-30">
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
