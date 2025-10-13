import type { Metadata } from "next";
import { Comfortaa, Lato } from "next/font/google";
import "./globals.css";
import VideoModal from "@/components/VideoModal/VideoModal";
import { VideoModalProvider } from "@/contexts/VideoModalContext";

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
		"Discover and experience animated AI visuals from a multitude of styles, tempos, and artists. Infinidream can be a digital painting, alive and slowly evolving.",
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
			"Discover and experience animated AI visuals from a multitude of styles, tempos, and artists. Infinidream can be a digital painting, alive and slowly evolving.",
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
			"Discover and experience animated AI visuals from a multitude of styles, tempos, and artists.",
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
				<VideoModalProvider>
					{children}
					<VideoModal />
				</VideoModalProvider>
			</body>
		</html>
	);
}
