"use client";

import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useState,
} from "react";
import type { Thumbnail } from "@/lib/types";

interface VideoModalContextType {
	isOpen: boolean;
	currentIndex: number;
	videos: Thumbnail[];
	openModal: (index: number, allVideos: Thumbnail[]) => void;
	closeModal: () => void;
	goToNext: () => void;
	goToPrevious: () => void;
}

const VideoModalContext = createContext<VideoModalContextType | null>(null);

export function useVideoModal() {
	const context = useContext(VideoModalContext);
	if (!context) {
		throw new Error("useVideoModal must be used within VideoModalProvider");
	}
	return context;
}

interface VideoModalProviderProps {
	children: ReactNode;
}

export function VideoModalProvider({ children }: VideoModalProviderProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [videos, setVideos] = useState<Thumbnail[]>([]);

	const openModal = useCallback((index: number, allVideos: Thumbnail[]) => {
		setCurrentIndex(index);
		setVideos(allVideos);
		setIsOpen(true);
	}, []);

	const closeModal = useCallback(() => {
		setIsOpen(false);
	}, []);

	const goToNext = useCallback(() => {
		setCurrentIndex((prev) => (prev + 1) % videos.length);
	}, [videos.length]);

	const goToPrevious = useCallback(() => {
		setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
	}, [videos.length]);

	return (
		<VideoModalContext.Provider
			value={{
				isOpen,
				currentIndex,
				videos,
				openModal,
				closeModal,
				goToNext,
				goToPrevious,
			}}
		>
			{children}
		</VideoModalContext.Provider>
	);
}
