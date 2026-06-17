"use client";

import { useEffect, useState } from "react";
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

export default function HeroSection() {
	const [active, setActive] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setActive((prev) => (prev + 1) % HERO_VIDEOS.length);
		}, 8000);
		return () => clearInterval(interval);
	}, []);

	return (
		<section className="relative flex min-h-125 h-[85vh] items-end overflow-hidden">
			{HERO_VIDEOS.map((src, index) => (
				<video
					key={src}
					src={src}
					autoPlay
					muted
					loop
					playsInline
					className={cn(
						"absolute inset-0 h-full w-full object-cover transition-opacity duration-1000",
						index === active ? "opacity-100" : "opacity-0",
					)}
				/>
			))}

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
					<p className="text-base font-secondary text-primary-light sm:text-lg">
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
