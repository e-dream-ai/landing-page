import Button from "@/components/common/Button/Button";
import Card from "@/components/common/Card/Card";
import FadeUp from "@/components/common/FadeUp/FadeUp";
import SectionHeader from "@/components/common/SectionHeader/SectionHeader";
import { StaggerContainer } from "@/components/common/Stagger/Stagger";
import Section from "@/components/layout/Section/Section";
import { ROUTES } from "@/constants/routes";

export default function SupportSection() {
	return (
		<Section className="flex flex-col gap-10">
			<FadeUp>
				<SectionHeader label="Support" title="Keep the Dream Alive" />
			</FadeUp>

			<StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				<Card className="min-h-30">
					<p className="font-secondary text-lg leading-relaxed text-primary-light">
						Infinidream is free to use, but building it and running it costs
						real money. Please support our mission:
					</p>
					<Button
						href={ROUTES.patreon}
						variant="primary"
						className="mt-2 self-start"
					>
						Back us on Patreon
					</Button>
				</Card>
			</StaggerContainer>
		</Section>
	);
}
