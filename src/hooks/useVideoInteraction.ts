import { useCallback, useEffect, useReducer } from "react";
import { useIsMobile } from "./useIsMobile";

interface UseVideoInteractionOptions {
	enabled: boolean;
	containerRef: React.RefObject<HTMLElement | null>;
	forceAutoPlay?: boolean;
}

interface InteractionState {
	isHovered: boolean;
	isPaused: boolean;
	isActiveOnMobile: boolean;
}

type InteractionAction =
	| { type: "MOUSE_ENTER" }
	| { type: "MOUSE_LEAVE" }
	| { type: "TOGGLE_PAUSE" }
	| { type: "SET_ACTIVE_ON_MOBILE"; payload: boolean };

function interactionReducer(
	state: InteractionState,
	action: InteractionAction,
): InteractionState {
	switch (action.type) {
		case "MOUSE_ENTER":
			return { ...state, isHovered: true };
		case "MOUSE_LEAVE":
			return { ...state, isHovered: false };
		case "TOGGLE_PAUSE":
			return { ...state, isPaused: !state.isPaused };
		case "SET_ACTIVE_ON_MOBILE":
			return { ...state, isActiveOnMobile: action.payload };
		default:
			return state;
	}
}

function findTopMostVisibleContainer(
	currentContainer: HTMLElement | null,
): boolean {
	if (!currentContainer) return false;

	const containers = document.querySelectorAll<HTMLElement>(
		"[data-video-container]",
	);
	let topMostContainer: Element | null = null;
	let topMostTop = Number.POSITIVE_INFINITY;

	for (const container of containers) {
		const rect = container.getBoundingClientRect();
		const isFullyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

		if (isFullyVisible && rect.top < topMostTop) {
			topMostTop = rect.top;
			topMostContainer = container;
		}
	}

	return topMostContainer === currentContainer;
}

export function useVideoInteraction({
	enabled,
	containerRef,
	forceAutoPlay = false,
}: UseVideoInteractionOptions) {
	const isMobile = useIsMobile();

	const [state, dispatch] = useReducer(interactionReducer, {
		isHovered: false,
		isPaused: false,
		isActiveOnMobile: false,
	});

	useEffect(() => {
		if (forceAutoPlay) {
			dispatch({ type: "SET_ACTIVE_ON_MOBILE", payload: true });
			return;
		}

		if (!isMobile || !enabled) {
			dispatch({ type: "SET_ACTIVE_ON_MOBILE", payload: false });
			return;
		}

		let rafId: number;

		const updateActiveVideo = () => {
			const isActive = findTopMostVisibleContainer(containerRef.current);
			dispatch({ type: "SET_ACTIVE_ON_MOBILE", payload: isActive });
		};

		const handleScroll = () => {
			cancelAnimationFrame(rafId);
			rafId = requestAnimationFrame(updateActiveVideo);
		};

		updateActiveVideo();
		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", handleScroll);
			cancelAnimationFrame(rafId);
		};
	}, [isMobile, enabled, containerRef, forceAutoPlay]);

	const handleMouseEnter = useCallback(() => {
		if (!isMobile && enabled) {
			dispatch({ type: "MOUSE_ENTER" });
		}
	}, [isMobile, enabled]);

	const handleMouseLeave = useCallback(() => {
		if (!isMobile) {
			dispatch({ type: "MOUSE_LEAVE" });
		}
	}, [isMobile]);

	const handleClick = useCallback(() => {
		if (isMobile && enabled) {
			dispatch({ type: "TOGGLE_PAUSE" });
		}
	}, [isMobile, enabled]);

	const shouldPlay =
		enabled &&
		(forceAutoPlay
			? true
			: isMobile
				? state.isActiveOnMobile && !state.isPaused
				: state.isHovered);

	return {
		shouldPlay,
		handleMouseEnter,
		handleMouseLeave,
		handleClick,
	};
}
