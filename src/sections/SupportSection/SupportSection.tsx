import { faPatreon } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Button from "@/components/common/Button/Button";
import Card from "@/components/common/Card/Card";
import FadeUp from "@/components/common/FadeUp/FadeUp";
import SectionHeader from "@/components/common/SectionHeader/SectionHeader";
import { StaggerContainer } from "@/components/common/Stagger/Stagger";
import Section from "@/components/layout/Section/Section";
import { ROUTES } from "@/constants/routes";

export default function SupportSection() {
	return (
		<Section className="flex justify-center">
			<div className="flex w-full max-w-3xl flex-col items-center gap-10 rounded-2xl border border-white/25 bg-white/12 px-6 py-12 sm:px-12">
				<FadeUp>
					<SectionHeader
						align="center"
						label="Support"
						title="Keep the Dream Alive"
					/>
				</FadeUp>

				<StaggerContainer className="flex w-full justify-center">
					<Card
						className="w-full max-w-xl bg-neutral-700 hover:bg-neutral-600"
						contentClassName="items-center gap-4 p-8 text-center"
					>
						<p className="font-secondary text-lg leading-relaxed text-primary-light">
							Infinidream is free to use, but building it and running it costs
							real money. Please support our mission:
						</p>
						<Button href={ROUTES.patreon} variant="primary" className="mt-2">
							Back us on Patreon
						</Button>
					</Card>
				</StaggerContainer>

				<FadeUp className="flex items-center justify-center gap-20 opacity-60">
					<FontAwesomeIcon
						icon={faPatreon}
						className="size-18! text-primary-light"
						title="Patreon"
					/>
					<Image
						src="/logo.png"
						alt="Infinidream"
						width={80}
						height={80}
						className="size-18"
					/>
					<Image
						src="/logos/electric-sheep.svg"
						alt="Electric Sheep"
						width={53}
						height={43}
						className="h-18 w-auto"
					/>
				</FadeUp>
			</div>
		</Section>
	);
}
