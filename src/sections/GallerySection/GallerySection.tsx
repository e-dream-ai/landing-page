"use client";

import { useEffect, useState } from "react";
import FadeUp from "@/components/common/FadeUp/FadeUp";
import SectionHeader from "@/components/common/SectionHeader/SectionHeader";
import Container from "@/components/layout/Container/Container";
import VideoImage from "@/components/VideoImage/VideoImage";
import { shuffled } from "@/lib/helpers";
import {
	ALL_THUMBNAILS,
	getThumbnailIndex,
	THUMBNAILS_6TH_SECTION,
} from "@/lib/thumbnails";

export default function GallerySection() {
	// Start with the static order so the client render matches the
	// pre-rendered HTML, then shuffle once mounted.
	const [thumbnails, setThumbnails] = useState(THUMBNAILS_6TH_SECTION);

	useEffect(() => {
		setThumbnails(shuffled(THUMBNAILS_6TH_SECTION));
	}, []);

	return (
		<Container className="mx-auto flex max-w-7xl flex-col gap-8">
			<FadeUp className="mx-auto">
				<SectionHeader
					align="center"
					label="Gallery"
					title="Endless Dreams"
					description="A taste of our living and growing library from dozens of artists and AIs including Surrealism Today, Hueman Instrumentality, Safety Marc, Glenn Marshall, Jef Harris, and Jeremy Torman:"
				/>
			</FadeUp>

			<div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6">
				{thumbnails.map((thumbnail) => (
					<VideoImage
						key={thumbnail.src}
						thumbnailSrc={thumbnail.src}
						alt={thumbnail.alt}
						allVideos={ALL_THUMBNAILS}
						videoIndex={getThumbnailIndex(thumbnail)}
					/>
				))}
			</div>
		</Container>
	);
}
