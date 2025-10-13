import { useCallback, useReducer, useRef } from "react";
import { useInView } from "react-intersection-observer";

const INTERSECTION_THRESHOLD = 0.1;
const INTERSECTION_ROOT_MARGIN = "200px";

interface UseVideoElementOptions {
	priority?: boolean;
}

interface VideoState {
	isPlaying: boolean;
	isLoading: boolean;
	hasError: boolean;
}

type VideoAction =
	| { type: "START_LOADING" }
	| { type: "PLAY_SUCCESS" }
	| { type: "PLAY_ERROR" }
	| { type: "PAUSE" }
	| { type: "STOP_LOADING" };

function videoReducer(state: VideoState, action: VideoAction): VideoState {
	switch (action.type) {
		case "START_LOADING":
			return { ...state, isLoading: true };
		case "PLAY_SUCCESS":
			return { ...state, isPlaying: true, isLoading: false };
		case "PLAY_ERROR":
			return { isPlaying: false, isLoading: false, hasError: true };
		case "PAUSE":
			return { ...state, isPlaying: false, isLoading: false };
		case "STOP_LOADING":
			return { ...state, isLoading: false };
		default:
			return state;
	}
}

export function useVideoElement({
	priority = false,
}: UseVideoElementOptions = {}) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const playPromiseRef = useRef<Promise<void> | null>(null);

	const [state, dispatch] = useReducer(videoReducer, {
		isPlaying: false,
		isLoading: false,
		hasError: false,
	});

	const { ref: inViewRef, inView } = useInView({
		threshold: INTERSECTION_THRESHOLD,
		rootMargin: INTERSECTION_ROOT_MARGIN,
		triggerOnce: true,
		skip: priority,
	});

	const play = useCallback(async () => {
		const video = videoRef.current;
		if (!video) return;

		if (video.readyState < 3) {
			dispatch({ type: "START_LOADING" });
		}

		try {
			playPromiseRef.current = video.play();
			await playPromiseRef.current;
			dispatch({ type: "PLAY_SUCCESS" });
		} catch (error) {
			if (error instanceof Error && error.name !== "AbortError") {
				console.warn("Video playback failed:", error.message);
				dispatch({ type: "PLAY_ERROR" });
			}
		} finally {
			playPromiseRef.current = null;
		}
	}, []);

	const pause = useCallback(async () => {
		const video = videoRef.current;
		if (!video) return;

		if (playPromiseRef.current) {
			try {
				await playPromiseRef.current;
			} catch {
				// Ignore - play was already interrupted
			}
		}

		video.pause();
		dispatch({ type: "PAUSE" });
	}, []);

	const handleCanPlayThrough = useCallback(() => {
		dispatch({ type: "STOP_LOADING" });
	}, []);

	const handleError = useCallback(() => {
		dispatch({ type: "PLAY_ERROR" });
	}, []);

	const handleLoadStart = useCallback(() => {
		dispatch({ type: "START_LOADING" });
	}, []);

	const shouldLoad = priority || inView;

	return {
		videoRef,
		inViewRef,
		shouldLoad,
		...state,
		play,
		pause,
		handleCanPlayThrough,
		handleError,
		handleLoadStart,
	};
}
