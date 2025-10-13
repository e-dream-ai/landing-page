import ContentBox from "@/components/common/ContentBox/ContextBox";
import Title from "@/components/common/Title/Title";

interface RoadmapItem {
	id: string;
	text: string;
}

const ROADMAP_ITEMS: RoadmapItem[] = [
	{
		id: "hosted-cloud-generation",
		text: 'Hosted cloud generation driven by AI and crowd signals. Put an "edit" button on each dream and allow you to change the prompts, restyle, and make your own version.',
	},
	{
		id: "multi-platform",
		text: "Running on more platforms such as Windows, Android, iOS, tvOS, and directly on TVs and set-top boxes.",
	},
	{
		id: "multiple-screens",
		text: "Managing multiple screens. Turn your home or space into an interactive gallery.",
	},
	{
		id: "social-control",
		text: "Social control: allowing the people around a screen to control it, not just the owner. Put a QR code next to a screen to make a video jukebox, or invent your own game.",
	},
	{
		id: "audio-reactive",
		text: "Using a microphone to make playback audioreactive, detect the ambient activity level, and even ID any song. Add realtime effects, more mixing, and become an AI VJ.",
	},
];

export default function RoadMapSection() {
	return (
		<section className="flex flex-col gap-7">
			<Title>roadmap</Title>
			<p className="font-secondary text-base text-primary">
				There are so many ways to expand and improve Infinidream. Currently we
				are working on and thinking about:
			</p>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
				{ROADMAP_ITEMS.map((item) => (
					<ContentBox key={item.id}>{item.text}</ContentBox>
				))}
			</div>
		</section>
	);
}
