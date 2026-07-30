import Section from "@/components/layout/Section/Section";

export default function CreditsSection() {
	return (
		<Section className="flex flex-col gap-6 text-center font-secondary">
			<p className="text-sm text-primary-light">
				Infinidream was previously named “e-dream” and the old name still shows
				up in a few places, like the email address, GitHub project, and the
				company name.
				<br />
				We’re working to update everything.
			</p>
		</Section>
	);
}
