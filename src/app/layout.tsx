import type { Metadata } from "next";
import { Comfortaa, Lato } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer/Footer";
import NavBar from "@/components/layout/NavBar/NavBar";
import VideoModal from "@/components/VideoModal/VideoModal";
import { VideoModalProvider } from "@/contexts/VideoModalContext";
import { ViewportProvider } from "@/contexts/ViewportContext";

const comfortaa = Comfortaa({
	variable: "--font-comfortaa",
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
});

const lato = Lato({
	variable: "--font-lato",
	subsets: ["latin"],
	weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
	title: "infinidream",
	description:
		"Discover and experience animated visuals from a multitude of styles, tempos, and artists. Turn any screen into a digital painting, an ambience enhancer, a meditation machine, or an interactive installation.",
	icons: {
		icon: "/logo.png",
	},
	metadataBase: new URL("https://infinidream.ai"),
	alternates: {
		canonical: "/",
	},
	openGraph: {
		title: "infinidream - visuals for your vibe",
		description:
			"Discover and experience animated visuals from a multitude of styles, tempos, and artists. Turn any screen into a digital painting, an ambience enhancer, a meditation machine, or an interactive installation.",
		url: "https://infinidream.ai",
		siteName: "infinidream",
		images: [
			{
				url: "/social_preview.jpg",
				width: 1200,
				height: 675,
				alt: "infinidream - visuals for your vibe",
			},
		],
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "infinidream - visuals for your vibe",
		description:
			"Discover and experience animated visuals from a multitude of styles, tempos, and artists.",
		images: ["/social_preview.jpg"],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${comfortaa.variable} ${lato.variable} antialiased`}>
				<ViewportProvider>
					<VideoModalProvider>
						<NavBar />
						{children}
						<Footer />
						<VideoModal />
					</VideoModalProvider>
				</ViewportProvider>
			</body>
		</html>
	);
}
