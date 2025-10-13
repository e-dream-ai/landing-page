import Container from "@/components/layout/Container/Container";
import Footer from "@/components/layout/Footer/Footer";
import NavBar from "@/components/layout/NavBar/NavBar";

export default function MarketingLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<NavBar />
			<div className="pt-36 sm:pt-20 lg:pt-28">
				<Container>{children}</Container>
			</div>
			<Footer />
		</>
	);
}
