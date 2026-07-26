"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/common/Button/Button";
import {
	StaggerContainer,
	StaggerItem,
} from "@/components/common/Stagger/Stagger";
import { ROUTES } from "@/constants/routes";
import { getVideoPathFromThumbnail } from "@/lib/helpers";
import { HERO_THUMBNAILS } from "@/lib/thumbnails";
import { cn } from "@/lib/utils";

const HERO_VIDEOS = HERO_THUMBNAILS.map((thumbnail) =>
	getVideoPathFromThumbnail(thumbnail.src),
);

// Matches the duration-1000 opacity transition on the video elements.
const CROSS_FADE_SECONDS = 1;

export default function HeroSection() {
	const [active, setActive] = useState(0);
	const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

	useEffect(() => {
		videoRefs.current[0]?.play().catch(() => {});
	}, []);

	// Play the active video to its end; start the next one just before it
	// finishes so the cross-fade overlaps two playing videos.
	useEffect(() => {
		const video = videoRefs.current[active];
		if (!video) return;

		let advanced = false;
		const advance = () => {
			if (advanced) return;
			advanced = true;

			const nextIndex = (active + 1) % HERO_VIDEOS.length;
			const next = videoRefs.current[nextIndex];
			if (next) {
				next.currentTime = 0;
				next.play().catch(() => {});
			}
			setActive(nextIndex);
		};

		const handleTimeUpdate = () => {
			if (
				video.duration &&
				video.duration - video.currentTime <= CROSS_FADE_SECONDS
			) {
				advance();
			}
		};

		video.addEventListener("timeupdate", handleTimeUpdate);
		video.addEventListener("ended", advance);
		return () => {
			video.removeEventListener("timeupdate", handleTimeUpdate);
			video.removeEventListener("ended", advance);
		};
	}, [active]);

	return (
		<section className="relative flex min-h-125 h-[85vh] items-end overflow-hidden">
			{HERO_VIDEOS.map((src, index) => (
				<video
					key={src}
					ref={(el) => {
						videoRefs.current[index] = el;
					}}
					src={src}
					muted
					playsInline
					preload="auto"
					className={cn(
						"absolute inset-0 h-full w-full object-cover transition-opacity duration-1000",
						index === active ? "opacity-100" : "opacity-0",
					)}
				/>
			))}

			{/* Dev-only label for the active hero video, used when curating thumbnails.ts */}
			{process.env.NODE_ENV === "development" && (
				<span className="absolute top-20 left-4 z-20 rounded bg-black/75 px-2 py-0.5 font-mono text-sm text-white pointer-events-none">
					hero {active}
				</span>
			)}

			<div className="absolute inset-x-0 -bottom-0.5 top-0 bg-linear-to-b from-transparent via-black/50 to-black" />

			<StaggerContainer
				trigger="mount"
				staggerDelay={0.15}
				className="z-10 flex max-w-3xl flex-col gap-6 px-6 pb-12 sm:px-16 sm:pb-20"
			>
				<StaggerItem>
					<h1 className="font-primary text-4xl font-light text-primary sm:text-5xl lg:text-6xl">
						Turn Any Screen Into a Living Painting
					</h1>
				</StaggerItem>
				<StaggerItem>
					<p className="text-lg font-secondary text-primary-light sm:text-xl">
						Animated AI art that breathes, shifts, and evolves — from dozens of
						artists and styles. Pick one that fits your mood.
					</p>
				</StaggerItem>
				<StaggerItem className="flex flex-wrap gap-4">
					<Button href={ROUTES.createAccount} variant="primary">
						Start Free
					</Button>
					<Button href={ROUTES.app} variant="outline">
						Open the App
					</Button>
				</StaggerItem>
			</StaggerContainer>
		</section>
	);
}
