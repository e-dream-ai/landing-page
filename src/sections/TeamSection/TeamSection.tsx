import Link from "next/link";
import ContentBox from "@/components/common/ContentBox/ContextBox";
import ExternalLink from "@/components/common/ExternalLink/ExternalLink";
import Title from "@/components/common/Title/Title";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

const TeamNameLink = ({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) => (
	<Link
		href={href}
		target="_blank"
		rel="noopener noreferrer"
		className={
			"underline hover:text-cyan-500 transition-all duration-300 ease-in-out text-lg italic"
		}
	>
		{children}
	</Link>
);

const teamMembers = [
	{
		id: "scott-draves",
		content: (
			<>
				<TeamNameLink href={ROUTES.scottDraves}>Scott Draves</TeamNameLink>
				<br />
				<br />
				Pioneering AI artist and engineering leader. Founder of the{" "}
				<ExternalLink href={ROUTES.electricSheep}>Electric Sheep</ExternalLink>.
			</>
		),
	},
	{
		id: "max-carlson",
		content: (
			<>
				<TeamNameLink href={ROUTES.maxCarlson}>Max Carlson</TeamNameLink>
				<br />
				<br />
				Laszlo Systems cofounder, Nest early engineer.
			</>
		),
	},
	{
		id: "guillaume-louel",
		content: (
			<>
				<TeamNameLink href={ROUTES.guillaumeLouel}>
					Guillaume Louel
				</TeamNameLink>
				<br />
				<br />
				Freelance software architect, MacOS expert, open source maintainer of{" "}
				<ExternalLink href={ROUTES.aerial}>Aerial</ExternalLink>.
			</>
		),
	},
	{
		id: "miklos-nagy",
		content: (
			<>
				<TeamNameLink href={ROUTES.miklosNagy}>Miklós Nagy</TeamNameLink>
				<br />
				<br />
				Multidisciplinary creative, VFX, and Open Source{" "}
				<ExternalLink href={ROUTES.deforum}>Deforum developer</ExternalLink>.
			</>
		),
	},
	{
		id: "contributing-artists",
		content: (
			<>
				The artists who made the samples depicted here:{" "}
				<em>Surrealism Today</em>, <em>Hueman Instrumentality</em>,{" "}
				<em>Safety Marc</em>, <em>Jeremy Torman</em>, <em>Mordunkus</em>,{" "}
				<em>R0b0tn1k</em>, and more.
			</>
		),
	},
];

export default function TeamSection() {
	return (
		<section className="flex flex-col gap-7">
			<Title>team</Title>
			<div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
				{teamMembers.map((member) => (
					<ContentBox key={member.id}>{member.content}</ContentBox>
				))}
				<ContentBox>
					Infinidream was previously named 'e&#8209;dream' and that old name
					still shows up in a few places, like the emails, github, and the
					company name. We're working to update everything. Until then, sorry
					for the confusion!
				</ContentBox>
				<ContentBox className="flex flex-col gap-4 items-center">
					<Link href={ROUTES.discord} target="_blank" rel="noopener noreferrer">
						<Button
							className="xl:w-full xl:whitespace-break-spaces"
							variant="reusable"
							size="reusable"
						>
							Chat on Discord
						</Button>
					</Link>
					<Link
						href={"mailto:support@e-dream.ai"}
						target="_blank"
						rel="noopener noreferrer"
					>
						<Button variant="reusable" size="reusable">
							Email us
						</Button>
					</Link>
				</ContentBox>
			</div>
		</section>
	);
}
