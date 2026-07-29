import Section from "@/components/layout/Section/Section";

export default function CreditsSection() {
	return (
		<Section className="flex flex-col gap-6 text-center font-secondary">
			<p className="text-sm text-primary-light">
				Art on this page by Surrealism Today, Hueman Instrumentality, Safety
				Marc, Glenn Marshall, Jef Harris, Jeremy Torman, and more.
			</p>
			<p className="text-sm text-primary-light">
				You might see the name "e-dream" in a few places—emails, GitHub,
				anything legal. It's the old name for Infinidream. We're updating
				everything.
			</p>
		</Section>
	);
}
