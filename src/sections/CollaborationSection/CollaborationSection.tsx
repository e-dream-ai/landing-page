import Button from "@/components/common/Button/Button";
import SectionHeader from "@/components/common/SectionHeader/SectionHeader";
import TextLink from "@/components/common/TextLink/TextLink";
import Section from "@/components/layout/Section/Section";
import { ROUTES } from "@/constants/routes";

const INFO_CARDS = [
	{
		num: "01",
		title: "Interactive audience",
		content:
			"Upload your work the way you would to YouTube or Instagram — except your audience can actually interact with it. Speed it up, slow it down, mix it with other dreams.",
	},
	{
		num: "02",
		title: "AI collaboration",
		content: (
			<>
				Collaborate with AI by using our{" "}
				<TextLink href={ROUTES.api}>Python API</TextLink> to generate art that
				never repeats.
			</>
		),
	},
	{
		num: "03",
		title: "Participatory art",
		content:
			"Build participatory pieces. Let crowds steer your art. Turn viewers into collaborators.",
	},
	{
		num: "04",
		title: "Open source",
		content: (
			<>
				Infinidream is <TextLink href={ROUTES.github}>open source</TextLink> —
				fork it, build on it, share your art, or just{" "}
				<TextLink href={ROUTES.issues}>report a bug</TextLink>.
			</>
		),
	},
	{
		num: "05",
		title: "Collective intelligence",
		content:
			"This is an experiment in collective intelligence — human artists and AIs building on each other's strengths.",
	},
	{
		num: "06",
		title: "Get paid",
		content: "Join the creators program. Make art, get paid.",
	},
];

export default function CollaborationSection() {
	return (
		<Section
			alt
			className="grid grid-cols-1 items-start gap-16 lg:grid-cols-[2fr_3fr]"
		>
			<div className="flex flex-col gap-5 lg:sticky lg:top-24">
				<SectionHeader
					label="Artists"
					title="Make Art That Never Stops Moving"
				/>
				<p className="font-secondary text-base font-light text-white/75">
					A free platform for generative artists, programmers, prompt engineers,
					and anyone who dreams in pixels.
				</p>
				<Button href={ROUTES.creators} variant="primary" className="self-start">
					Creators Program
				</Button>
			</div>

			<div className="grid grid-cols-1 border-l border-t border-white/10 sm:grid-cols-2">
				{INFO_CARDS.map((card) => (
					<div
						key={card.num}
						className="group flex flex-col gap-2 border-r border-b border-white/10 p-6 transition-colors duration-300 hover:bg-white/[0.03]"
					>
						<p className="font-primary text-xs text-white/20 transition-colors duration-300 group-hover:text-primary">
							{card.num}
						</p>
						<p className="font-primary text-sm text-white">{card.title}</p>
						<p className="font-secondary text-sm font-light leading-relaxed text-white/75">
							{card.content}
						</p>
					</div>
				))}
			</div>
		</Section>
	);
}
