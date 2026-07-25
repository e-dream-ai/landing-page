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
import FadeUp from "@/components/common/FadeUp/FadeUp";
import SectionHeader from "@/components/common/SectionHeader/SectionHeader";
import TextLink from "@/components/common/TextLink/TextLink";
import Section from "@/components/layout/Section/Section";
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

// On narrow screens the icons stack as two centered rows instead of
// wrapping greedily (which left a lone icon on the second line).
const SOCIAL_ROWS = [SOCIAL_LINKS.slice(0, 4), SOCIAL_LINKS.slice(4)];

export default function SocialSection() {
	return (
		<Section className="flex flex-col gap-10">
			<FadeUp>
				<SectionHeader label="Community" title="Connect with Us" />
			</FadeUp>

			<div className="flex flex-col items-center gap-3 font-secondary text-sm sm:flex-row sm:justify-center sm:gap-5">
				{SOCIAL_ROWS.map((row, rowIndex) => (
					<div key={row[0].label} className="flex items-center gap-5">
						{rowIndex > 0 && (
							<span className="hidden text-white/20 sm:inline">|</span>
						)}
						{row.map((link, index) => (
							<Fragment key={link.label}>
								{index > 0 && <span className="text-white/20">|</span>}
								<TextLink
									href={link.href}
									aria-label={link.label}
									className="flex items-center"
								>
									<FontAwesomeIcon icon={link.icon} className="size-[34px]" />
								</TextLink>
							</Fragment>
						))}
					</div>
				))}
			</div>
		</Section>
	);
}
