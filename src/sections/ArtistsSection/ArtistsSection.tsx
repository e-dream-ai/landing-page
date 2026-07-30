import Button from "@/components/common/Button/Button";
import Card from "@/components/common/Card/Card";
import FadeUp from "@/components/common/FadeUp/FadeUp";
import SectionHeader from "@/components/common/SectionHeader/SectionHeader";
import { StaggerContainer } from "@/components/common/Stagger/Stagger";
import TextLink from "@/components/common/TextLink/TextLink";
import Section from "@/components/layout/Section/Section";
import { ROUTES } from "@/constants/routes";

const INFO_CARDS = [
	{
		num: "01",
		title: "Interactive Ambience",
		content:
			"Upload your already completed work the way you would to YouTube or Instagram. Your audience gets higher bitrate, smoother playback, and interactive ambient controls.",
	},
	{
		num: "02",
		title: "Create with AI",
		content: (
			<>
				Use our Studio web apps to access AI models and workflows to create
				videos in a fully hosted environment—no GPU required! Collaborate with
				AI by using our <TextLink href={ROUTES.api}>Python API</TextLink> to
				realize your own algorithms and even generate art that evolves
				infinitely.
			</>
		),
	},
	{
		num: "03",
		title: "Participatory Art",
		content:
			"Use our API to build participatory pieces. Let your audience influence or steer your art. Engage your fans and turn them into collaborators. Allow any group of like-minded individuals to coordinate and run the show.",
	},
	{
		num: "04",
		title: "Open Source",
		content: (
			<>
				Infinidream is <TextLink href={ROUTES.github}>open source</TextLink> and
				we invite collaboration of all kinds. Fix it, build on it, share your
				art, or just report a bug. Run your own server or run privately without
				a server.
			</>
		),
	},
	{
		num: "05",
		title: "Collective Intelligence",
		content:
			"Infinidream is an experiment in collective intelligence—human artists, AI, and the audience building on each other’s strengths.",
	},
	{
		num: "06",
		title: "Get Paid",
		content: "Join the Creators Program. Make art, get paid.",
	},
];

export default function ArtistsSection() {
	return (
		<Section
			alt
			className="grid grid-cols-1 items-start gap-16 lg:grid-cols-[2fr_3fr]"
		>
			<FadeUp className="flex flex-col gap-5 lg:sticky lg:top-24">
				<SectionHeader
					label="Artists"
					title="Make Art That Never Stops Moving"
				/>
				<p className="font-secondary text-lg text-primary-light">
					A free platform for generative artists, programmers, prompters, and
					anyone who dreams in pixels.
				</p>
				<Button href={ROUTES.creators} variant="primary" className="self-start">
					Creators Program
				</Button>
			</FadeUp>

			<StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				{INFO_CARDS.map((card) => (
					<Card key={card.num} contentClassName="gap-3">
						<p className="font-primary text-xl leading-snug text-primary">
							{card.title}
						</p>
						<p className="font-secondary text-lg leading-relaxed text-primary-light">
							{card.content}
						</p>
					</Card>
				))}
			</StaggerContainer>
		</Section>
	);
}
