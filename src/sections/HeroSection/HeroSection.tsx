"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/common/Button/Button";
import {
	StaggerContainer,
	StaggerItem,
} from "@/components/common/Stagger/Stagger";
import { ROUTES } from "@/constants/routes";
import { trackSignUpClick } from "@/lib/analytics";
import { getVideoPathFromThumbnail } from "@/lib/helpers";
import { HERO_THUMBNAILS } from "@/lib/thumbnails";
import { cn } from "@/lib/utils";

const HERO_VIDEOS = HERO_THUMBNAILS.map((thumbnail) =>
	getVideoPathFromThumbnail(thumbnail.src),
);

// Matches the duration-1000 opacity transition on the video elements.
const CROSS_FADE_SECONDS = 1;

const HERO_PHRASES = [
	"a Living Painting",
	"an Ambience Enhancer",
	"a Meditation Machine",
	"an Interactive Installation",
];

const PHRASE_INTERVAL_MS = 2600;

export default function HeroSection() {
	const [active, setActive] = useState(0);
	const [phraseIndex, setPhraseIndex] = useState(0);
	const reducedMotion = useReducedMotion();
	const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

	useEffect(() => {
		const interval = setInterval(() => {
			setPhraseIndex((index) => (index + 1) % HERO_PHRASES.length);
		}, PHRASE_INTERVAL_MS);
		return () => clearInterval(interval);
	}, []);

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
		<section className="relative flex min-h-125 h-[85svh] items-end overflow-hidden short-landscape:min-h-0">
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
				className="z-10 flex max-w-3xl flex-col gap-7 px-6 pb-6 sm:px-16 sm:pb-12 short-landscape:gap-4 short-landscape:pb-4!"
			>
				<StaggerItem>
					<h1 className="font-primary text-[clamp(1.375rem,6.5vw,3rem)] font-light text-primary sm:text-5xl lg:text-6xl">
						Turn Any Screen into{" "}
						<span className="relative mt-[0.2em] block whitespace-nowrap">
							<AnimatePresence mode="popLayout" initial={false}>
								<motion.span
									key={HERO_PHRASES[phraseIndex]}
									className="inline-block"
									initial={
										reducedMotion ? { opacity: 0 } : { opacity: 0, x: "4em" }
									}
									animate={{ opacity: 1, x: 0 }}
									exit={
										reducedMotion ? { opacity: 0 } : { opacity: 0, x: "-4em" }
									}
									transition={{ duration: 0.4, ease: "easeInOut" }}
								>
									{HERO_PHRASES[phraseIndex]}
								</motion.span>
							</AnimatePresence>
						</span>
					</h1>
				</StaggerItem>
				<StaggerItem className="flex flex-wrap gap-4 pl-8">
					<Button
						href={ROUTES.createAccount}
						variant="primary"
						onClick={() => trackSignUpClick("hero")}
					>
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
