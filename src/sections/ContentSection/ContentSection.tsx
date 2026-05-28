import type { ReactNode } from "react";
import Link from "next/link";
import ContentBox from "@/components/common/ContentBox/ContextBox";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

// Types
interface ContentItem {
	id: string;
	content: ReactNode;
}

// Constants
const CONTENT_ITEMS: ContentItem[] = [
	{
		id: "discover-visuals",
		content:
			"Discover and experience animated AI visuals from a multitude of styles, tempos, and artists.",
	},
	{
		id: "adjustable-visuals",
		content:
			"These ambient visuals are adjustable to go along with the music you already have playing... or no music at all.",
	},
	{
		id: "digital-painting",
		content:
			"Infinidream can be a digital painting, alive and slowly evolving. Or rocket down the rabbit hole, it's up to you.",
	},
	{
		id: "mac-install",
		content:
			"Install Infinidream on your Mac or PC to get the best experience, or use any web browser for basic access.",
	},
	{
		id: "phone-remote",
		content:
			"Install the remote on your phone to control your Infinidream from anywhere.",
	},
	{
		id: "electric-sheep",
		content: (
			<>
				Infinidream is a descendent of the Electric Sheep screensaver&mdash;now
				reborn and gone meta. The Electric sheep are available inside of
				Infinidream in 1080p, better than ever.
			</>
		),
	},
];

export default function ContentSection() {
	return (
		<section className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
			{CONTENT_ITEMS.map((item) => (
				<ContentBox key={item.id}>{item.content}</ContentBox>
			))}

			<ContentBox className="flex items-center justify-center">
				<Link href={ROUTES.createAccount}>
					<Button size="reusable" variant="reusable">
						Create an account
					</Button>
				</Link>
			</ContentBox>
		</section>
	);
}
