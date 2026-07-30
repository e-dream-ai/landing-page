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
import FadeUp from "@/components/common/FadeUp/FadeUp";
import SectionHeader from "@/components/common/SectionHeader/SectionHeader";
import TextLink from "@/components/common/TextLink/TextLink";
import Section from "@/components/layout/Section/Section";
import { ROUTES } from "@/constants/routes";

const SOCIAL_LINKS = [
	{ icon: faDiscord, href: ROUTES.discord, label: "Discord" },
	{ icon: faEnvelope, href: "mailto:support@e-dream.ai", label: "Email" },
	{ icon: faXTwitter, href: ROUTES.x, label: "X" },
	{ icon: faInstagram, href: ROUTES.instagram, label: "Instagram" },
	{ icon: faBluesky, href: ROUTES.bluesky, label: "Bluesky" },
	{ icon: faFacebook, href: ROUTES.facebook, label: "Facebook" },
	{ icon: faGithub, href: ROUTES.github, label: "GitHub" },
];

export default function SocialSection() {
	return (
		<Section className="flex justify-center">
			<div className="flex w-full max-w-3xl flex-col items-center gap-10 rounded-2xl border border-white/25 bg-white/12 px-6 py-12 sm:px-12">
				<FadeUp>
					<SectionHeader
						align="center"
						label="Community"
						title="Connect with Us"
					/>
				</FadeUp>

				<FadeUp className="flex flex-wrap items-center justify-center gap-8">
					{SOCIAL_LINKS.map((link) => (
						<TextLink
							key={link.label}
							href={link.href}
							aria-label={link.label}
							className="flex items-center text-primary-light"
						>
							<FontAwesomeIcon icon={link.icon} className="size-[41px]!" />
						</TextLink>
					))}
				</FadeUp>
			</div>
		</Section>
	);
}
