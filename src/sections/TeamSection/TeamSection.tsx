import Link from "next/link";
import type { ReactNode } from "react";
import FadeUp from "@/components/common/FadeUp/FadeUp";
import SectionHeader from "@/components/common/SectionHeader/SectionHeader";
import {
	StaggerContainer,
	StaggerItem,
} from "@/components/common/Stagger/Stagger";
import TextLink from "@/components/common/TextLink/TextLink";
import Section from "@/components/layout/Section/Section";
import { ROUTES } from "@/constants/routes";

interface TeamMember {
	name: string;
	href: string;
	role: ReactNode;
}

const TEAM_MEMBERS: TeamMember[] = [
	{
		name: "Scott Draves",
		href: ROUTES.scottDraves,
		role: (
			<>
				AI artist and engineering leader. Creator of{" "}
				<TextLink href={ROUTES.electricSheep}>Electric Sheep</TextLink>.
			</>
		),
	},
	{
		name: "Max Carlson",
		href: ROUTES.maxCarlson,
		role: "Laszlo Systems cofounder. Early engineer at Nest.",
	},
	{
		name: "Guillaume Louel",
		href: ROUTES.guillaumeLouel,
		role: (
			<>
				Software architect. macOS specialist. Maintains{" "}
				<TextLink href={ROUTES.aerial}>Aerial</TextLink>.
			</>
		),
	},
	{
		name: "Miklós Nagy",
		href: ROUTES.miklosNagy,
		role: (
			<>
				VFX artist, creative technologist, and open source{" "}
				<TextLink href={ROUTES.deforum}>Deforum developer</TextLink>.
			</>
		),
	},
];

export default function TeamSection() {
	return (
		<Section alt className="flex flex-col gap-10">
			<FadeUp>
				<SectionHeader label="Team" title="Who's Building This" />
			</FadeUp>

			<StaggerContainer className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
				{TEAM_MEMBERS.map((member) => (
					<StaggerItem key={member.name} className="flex flex-col gap-1.5">
						<Link
							href={member.href}
							target="_blank"
							rel="noopener noreferrer"
							className="font-primary text-base font-light text-primary transition-colors hover:text-primary-light"
						>
							{member.name}
						</Link>
						<p className="font-secondary text-sm leading-relaxed text-primary-light">
							{member.role}
						</p>
					</StaggerItem>
				))}
			</StaggerContainer>

			<div className="flex flex-col gap-6 text-center font-secondary">
				<p className="text-sm text-primary-light">
					Art on this page by Surrealism Today, Hueman Instrumentality, Safety
					Marc, Jeremy Torman, and more.
				</p>
				<p className="mx-auto max-w-2xl text-xs text-primary-light/60">
					You might see the name 'e-dream' in a few places — emails, GitHub,
					company filings. Same project, new name. We're updating everything.
				</p>
			</div>
		</Section>
	);
}
