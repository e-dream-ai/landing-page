import { ArrowRight } from "lucide-react";
import FadeUp from "@/components/common/FadeUp/FadeUp";
import SectionHeader from "@/components/common/SectionHeader/SectionHeader";
import {
	StaggerContainer,
	StaggerItem,
} from "@/components/common/Stagger/Stagger";
import TextLink from "@/components/common/TextLink/TextLink";
import Section from "@/components/layout/Section/Section";
import { ROUTES } from "@/constants/routes";
import { THUMBNAILS_5TH_SECTION } from "@/lib/thumbnails";
import ThumbnailGrid from "@/sections/ThumbnailGrid/ThumbnailGrid";

const ROADMAP_ITEMS = [
	'Cloud generation powered by AI and crowd signals. Hit "edit" on any dream — change the prompts, restyle it, make it yours.',
	"Linux, Android, iOS, tvOS, and native TV apps. Every screen you own.",
	"Multi-screen control. Turn your home into a gallery that responds to the room.",
	"Social control — let anyone nearby drive the screen. Drop a QR code next to a display and it becomes a visual jukebox.",
	"Audioreactive mode. A mic picks up the music, IDs the song, and the visuals respond in real time. Become an AI VJ.",
];

export default function RoadmapSection() {
	return (
		<Section className="flex flex-col gap-10">
			<FadeUp>
				<SectionHeader label="Roadmap" title="What's Next" />
			</FadeUp>

			<StaggerContainer className="flex flex-col lg:mx-auto">
				{ROADMAP_ITEMS.map((item) => (
					<StaggerItem
						key={item}
						className="flex gap-6 border-b border-white/10 py-6 first:pt-0"
					>
						<span className="mt-2 size-2 shrink-0 rounded-full bg-primary" />
						<p className="font-secondary text-base text-primary-light">
							{item}
						</p>
					</StaggerItem>
				))}
			</StaggerContainer>

			<div className="mx-auto flex max-w-xl flex-col items-center gap-2 rounded border border-white/10 px-8 py-6 text-center font-secondary text-base text-primary-light">
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
