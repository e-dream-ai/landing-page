import {
	faBluesky,
	faDiscord,
	faFacebook,
	faGithub,
	faInstagram,
	faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
import TextLink from "@/components/common/TextLink/TextLink";
import { ROUTES } from "@/constants/routes";

const SOCIAL_LINKS = [
	{ icon: faDiscord, href: ROUTES.discord, label: "Discord" },
	{ icon: faEnvelope, href: "mailto:support@e-dream.ai", label: "Email" },
	{ icon: faXTwitter, href: ROUTES.x, label: "Twitter" },
	{ icon: faInstagram, href: ROUTES.instagram, label: "Instagram" },
	{ icon: faBluesky, href: ROUTES.bluesky, label: "Bluesky" },
	{ icon: faFacebook, href: ROUTES.facebook, label: "Facebook" },
	{ icon: faGithub, href: ROUTES.github, label: "GitHub" },
];

export default function Footer() {
	return (
		<footer className="flex flex-col items-center gap-10 px-8 py-5 border-t border-white/10">
			<div className="flex flex-wrap items-center justify-center gap-2.5 font-secondary text-sm">
				{SOCIAL_LINKS.map((link, index) => (
					<Fragment key={link.label}>
						{index > 0 && <span className="text-white/20">|</span>}
						<TextLink href={link.href} aria-label={link.label} className="flex items-center">
							<FontAwesomeIcon icon={link.icon} className="size-5" />
						</TextLink>
					</Fragment>
				))}
			</div>

			<p className="font-secondary text-xs uppercase tracking-widest text-white/40">
				© {new Date().getFullYear()} e-dream, inc.
			</p>
		</footer>
	);
}
