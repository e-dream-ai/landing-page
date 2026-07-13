import Section from "@/components/layout/Section/Section";

export default function CreditsSection() {
	return (
		<Section className="flex flex-col gap-6 text-center font-secondary">
			<p className="text-sm text-primary-light">
				Art on this page by Surrealism Today, Hueman Instrumentality, Safety
				Marc, Jeremy Torman, and more.
			</p>
			<p className="mx-auto max-w-2xl text-xs text-primary-light/60">
				You might see the name 'e-dream' in a few places — emails, GitHub,
				company filings. Same project, new name. We're updating everything.
			</p>
		</Section>
	);
}
