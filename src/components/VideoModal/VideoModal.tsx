"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ClipLoader } from "react-spinners";
import { useVideoModal } from "@/contexts/VideoModalContext";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useVideoElement } from "@/hooks/useVideoElement";
import { getVideoPathFromThumbnail } from "@/lib/helpers";
import { cn } from "@/lib/utils";

export default function VideoModal() {
	const { isOpen, currentIndex, videos, closeModal, goToNext, goToPrevious } =
		useVideoModal();
	const modalRef = useRef<HTMLDivElement>(null);
	const video = useVideoElement({ priority: true });

	const currentVideo = videos[currentIndex];
	const videoSrc = currentVideo
		? getVideoPathFromThumbnail(currentVideo.src)
		: "";

	const hasMultipleVideos = videos.length > 1;

	useScrollLock({ isLocked: isOpen });

	useEffect(() => {
		if (!isOpen) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") closeModal();
			if (e.key === "ArrowLeft") goToPrevious();
			if (e.key === "ArrowRight") goToNext();
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, closeModal, goToNext, goToPrevious]);

	useEffect(() => {
		if (!isOpen) return;

		const videoElement = video.videoRef.current;
		if (!videoElement) return;

		videoElement.currentTime = 0;
		video.play();
	}, [isOpen, video.play, video.videoRef]);

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === modalRef.current) {
			closeModal();
		}
	};

	if (!currentVideo) return null;

	return createPortal(
		<AnimatePresence>
			{isOpen && (
				<motion.div
					ref={modalRef}
					onClick={handleBackdropClick}
					className="fixed inset-0 size-full z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
					role="dialog"
					aria-modal="true"
					aria-label="Video modal"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2, ease: "easeOut" }}
				>
					<motion.div
						className="relative w-full h-fit max-w-7xl max-h-screen m-4 md:m-8 flex items-center justify-center"
						initial={{ opacity: 0, scale: 0.95, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 20 }}
						transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
					>
						{hasMultipleVideos && (
							<button
								type="button"
								onClick={goToPrevious}
								className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/50 hover:bg-black/70 border-2 border-primary/80 text-white transition-colors duration-200 focus:outline-none cursor-pointer"
								aria-label="Previous video"
							>
								<ChevronLeft className="size-8" />
							</button>
						)}

						<div className="w-full h-full flex items-center justify-center">
							<video
								ref={video.videoRef}
								src={videoSrc}
								className={cn(
									"max-w-full max-h-full rounded-lg shadow-2xl object-contain transition-opacity duration-300",
									video.isLoading ? "opacity-0" : "opacity-100",
								)}
								autoPlay
								loop
								muted
								playsInline
								disablePictureInPicture
								onCanPlayThrough={video.handleCanPlayThrough}
								onError={video.handleError}
								onLoadStart={video.handleLoadStart}
							/>

							{video.isLoading && (
								<div className="absolute inset-0 flex items-center justify-center">
									<ClipLoader
										color="#ffffff"
										size={64}
										speedMultiplier={0.8}
										aria-label="Loading video"
									/>
								</div>
							)}
						</div>

						{hasMultipleVideos && (
							<button
								type="button"
								onClick={goToNext}
								className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/50 hover:bg-black/70 border-2 border-primary/80 text-white transition-colors duration-200 focus:outline-none cursor-pointer"
								aria-label="Next video"
							>
								<ChevronRight className="size-8" />
							</button>
						)}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>,
		document.body,
	);
}
