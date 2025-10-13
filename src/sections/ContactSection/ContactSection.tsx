import {
	faBluesky,
	faDiscord,
	faFacebook,
	faGithub,
	faInstagram,
	faThreads,
	faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import ContentBox from "@/components/common/ContentBox/ContextBox";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

const SOCIAL_LINKS = [
	{ icon: faBluesky, href: ROUTES.bluesky, label: "Bluesky" },
	{ icon: faDiscord, href: ROUTES.discord, label: "Discord" },
	{ icon: faGithub, href: ROUTES.github, label: "GitHub" },
	{ icon: faFacebook, href: ROUTES.facebook, label: "Facebook" },
	{ icon: faThreads, href: ROUTES.threads, label: "Threads" },
	{ icon: faInstagram, href: ROUTES.instagram, label: "Instagram" },
	{ icon: faXTwitter, href: ROUTES.x, label: "X (Twitter)" },
];

export default function ContactSection() {
	return (
		<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
			{/* Discord Support */}
			<ContentBox className="flex flex-col items-center gap-4">
				<span>
					<Link
						href={ROUTES.discord}
						target="_blank"
						rel="noopener noreferrer"
						className="underline hover:text-cyan-500 transition-all duration-300 ease-in-out"
					>
						Discord
					</Link>{" "}
					is our main channel for support and development.
				</span>
				<Link
					href={ROUTES.discord}
					target="_blank"
					rel="noopener noreferrer"
					className="hover:text-cyan-500 transition-all duration-300 ease-in-out"
					aria-label="Discord"
				>
					<FontAwesomeIcon icon={faDiscord} className="size-8" />
				</Link>
			</ContentBox>

			{/* Social Links */}
			<ContentBox className="flex items-center justify-center gap-6 flex-wrap">
				{SOCIAL_LINKS.map(({ icon, href, label }) => (
					<Link
						key={label}
						href={href}
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-cyan-500 transition-all duration-300 ease-in-out"
						aria-label={label}
					>
						<FontAwesomeIcon icon={icon} className="size-8" />
					</Link>
				))}
			</ContentBox>

			{/* Email Contact */}
			<ContentBox className="flex flex-col items-center gap-4">
				<span>Contact us by email at</span>
				<Link href="mailto:support@e-dream.ai">
					<Button variant="reusable" size="reusable">
						SUPPORT@E-DREAM.AI
					</Button>
				</Link>
			</ContentBox>
		</section>
	);
}
