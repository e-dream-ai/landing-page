"use client";

import { useState } from "react";
import Button from "@/components/common/Button/Button";
import FadeUp from "@/components/common/FadeUp/FadeUp";
import SectionHeader from "@/components/common/SectionHeader/SectionHeader";
import Container from "@/components/layout/Container/Container";
import VideoImage from "@/components/VideoImage/VideoImage";
import {
	ALL_THUMBNAILS,
	getSectionStartIndex,
	THUMBNAILS_6TH_SECTION,
} from "@/lib/thumbnails";

const START_INDEX = getSectionStartIndex(THUMBNAILS_6TH_SECTION);
const INITIAL_COUNT = 30;

const FADE_MASK = "linear-gradient(#000 calc(100% - 80px), transparent)";

export default function GallerySection() {
	const [expanded, setExpanded] = useState(false);
	const visible = expanded
		? THUMBNAILS_6TH_SECTION
		: THUMBNAILS_6TH_SECTION.slice(0, INITIAL_COUNT);

	return (
		<Container className="mx-auto flex max-w-7xl flex-col gap-8">
			<FadeUp className="mx-auto">
				<SectionHeader
					align="center"
					label="Gallery"
					title="Endless Dreams"
					description="A living library of animated visuals, from dozens of artists and AIs."
				/>
			</FadeUp>

			<div
				className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6"
				style={
					expanded
						? undefined
						: { maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK }
				}
			>
				{visible.map((thumbnail, index) => (
					<VideoImage
						key={thumbnail.src}
						thumbnailSrc={thumbnail.src}
						alt={thumbnail.alt}
						allVideos={ALL_THUMBNAILS}
						videoIndex={START_INDEX + index}
					/>
				))}
			</div>

			{!expanded && (
				<div className="flex justify-center">
					<Button variant="outlinePrimary" onClick={() => setExpanded(true)}>
						Show more
					</Button>
				</div>
			)}
		</Container>
	);
}
