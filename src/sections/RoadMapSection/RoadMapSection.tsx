import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/common/SectionHeader/SectionHeader";
import TextLink from "@/components/common/TextLink/TextLink";
import Section from "@/components/layout/Section/Section";
import { ROUTES } from "@/constants/routes";
import { getSectionStartIndex, THUMBNAILS_5TH_SECTION } from "@/lib/thumbnails";
import ThumbnailSection from "@/sections/ThumbnailSection/ThumbnailSection";

const ROADMAP_ITEMS = [
	'Cloud generation powered by AI and crowd signals. Hit "edit" on any dream — change the prompts, restyle it, make it yours.',
	"Linux, Android, iOS, tvOS, and native TV apps. Every screen you own.",
	"Multi-screen control. Turn your home into a gallery that responds to the room.",
	"Social control — let anyone nearby drive the screen. Drop a QR code next to a display and it becomes a visual jukebox.",
	"Audioreactive mode. A mic picks up the music, IDs the song, and the visuals respond in real time. Become an AI VJ.",
];

export default function RoadMapSection() {
	return (
		<Section className="flex flex-col gap-10">
			<SectionHeader label="Roadmap" title="What's Next" />

			<div className="flex flex-col lg:mx-auto">
				{ROADMAP_ITEMS.map((item) => (
					<div
						key={item}
						className="flex gap-6 border-b border-white/10 py-6 first:pt-0"
					>
						<span className="mt-2 size-2 shrink-0 rounded-full bg-primary" />
						<p className="font-secondary text-base font-light text-white/75">
							{item}
						</p>
					</div>
				))}
			</div>

			<div className="mx-auto flex max-w-xl flex-col items-center gap-2 rounded border border-white/10 px-8 py-6 text-center font-secondary text-base font-light text-white/75">
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

			<ThumbnailSection
				thumbnails={THUMBNAILS_5TH_SECTION}
				startIndex={getSectionStartIndex(THUMBNAILS_5TH_SECTION)}
			/>
		</Section>
	);
}
