"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { ClipLoader } from "react-spinners";
import { useVideoModal } from "@/contexts/VideoModalContext";
import { useVideoElement } from "@/hooks/useVideoElement";
import { useVideoInteraction } from "@/hooks/useVideoInteraction";
import { getSmallVideoPathFromThumbnail } from "@/lib/helpers";
import type { Thumbnail } from "@/lib/types";
import { cn } from "@/lib/utils";

interface VideoImageProps {
	thumbnailSrc: string;
	alt?: string;
	priority?: boolean;
	allVideos?: Thumbnail[];
	videoIndex?: number;
	aspectClassName?: string;
}

export default function VideoImage({
	thumbnailSrc,
	alt = "Video thumbnail",
	priority = false,
	allVideos = [],
	videoIndex = 0,
	aspectClassName = "aspect-video",
}: VideoImageProps) {
	const containerRef = useRef<HTMLButtonElement>(null);
	const video = useVideoElement({ priority });
	const interaction = useVideoInteraction({
		enabled: video.shouldLoad && !video.hasError,
		containerRef,
	});
	const { openModal } = useVideoModal();

	const videoSrc = getSmallVideoPathFromThumbnail(thumbnailSrc);
	const showVideo = video.shouldLoad && !video.hasError;
	const showSpinner = video.isLoading && interaction.shouldPlay;
	const hasModalVideos = allVideos.length > 0;

	const setContainerRef = useCallback(
		(node: HTMLButtonElement | null) => {
			containerRef.current = node;

			if (!priority) {
				video.inViewRef(node);
			}
		},
		[priority, video.inViewRef],
	);

	useEffect(() => {
		if (interaction.shouldPlay) {
			video.play();
		} else {
			video.pause();
		}
	}, [interaction.shouldPlay, video.play, video.pause]);

	const handleClick = () => {
		if (hasModalVideos) {
			openModal(videoIndex, allVideos);
		} else {
			interaction.handleClick();
		}
	};

	return (
		<button
			ref={setContainerRef}
			data-video-container
			type="button"
			aria-label={alt}
			className="relative w-full h-full rounded-lg overflow-hidden cursor-pointer focus-visible:outline-none"
			onMouseEnter={interaction.handleMouseEnter}
			onMouseLeave={interaction.handleMouseLeave}
			onClick={handleClick}
		>
			<Image
				src={thumbnailSrc}
				alt={alt}
				width={1000}
				height={1000}
				priority={priority}
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				className={cn(
					"w-full h-full object-cover transition-opacity duration-300",
					aspectClassName,
					video.isPlaying ? "opacity-0" : "opacity-100",
				)}
			/>

			{showVideo && (
				<video
					ref={video.videoRef}
					src={videoSrc}
					className={cn(
						"absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
						aspectClassName,
						video.isPlaying ? "opacity-100" : "opacity-0",
					)}
					muted
					loop
					playsInline
					disablePictureInPicture
					preload={priority ? "metadata" : "none"}
					onCanPlayThrough={video.handleCanPlayThrough}
					onError={video.handleError}
					onLoadStart={video.handleLoadStart}
				/>
			)}

			{showSpinner && (
				<div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-10">
					<ClipLoader
						color="#ffffff"
						size={56}
						speedMultiplier={0.8}
						aria-label="Loading video"
					/>
				</div>
			)}
		</button>
	);
}
