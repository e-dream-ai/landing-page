import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { useViewport } from "@/contexts/ViewportContext";

const ACTIVE_ROW_TOLERANCE = 2;
const EMPTY_ACTIVE_CONTAINERS = new Set<HTMLElement>();

interface UseVideoInteractionOptions {
	enabled: boolean;
	containerRef: React.RefObject<HTMLElement | null>;
}

const registeredContainers = new Set<HTMLElement>();
const activeSubscribers = new Set<() => void>();
let activeContainers = EMPTY_ACTIVE_CONTAINERS;
let isLandscapeMode = false;
let rafId: number | null = null;
let isListening = false;

function areContainerSetsEqual(
	first: Set<HTMLElement>,
	second: Set<HTMLElement>,
): boolean {
	if (first.size !== second.size) return false;

	for (const container of first) {
		if (!second.has(container)) return false;
	}

	return true;
}

function notifyActiveSubscribers() {
	for (const subscriber of activeSubscribers) {
		subscriber();
	}
}

function setActiveContainers(nextActiveContainers: Set<HTMLElement>) {
	if (areContainerSetsEqual(activeContainers, nextActiveContainers)) return;

	activeContainers = nextActiveContainers;
	notifyActiveSubscribers();
}

function getRegisteredContainers(): HTMLElement[] {
	const containers: HTMLElement[] = [];

	for (const container of registeredContainers) {
		if (container.isConnected) {
			containers.push(container);
		} else {
			registeredContainers.delete(container);
		}
	}

	return containers;
}

function findActiveMobileContainers(): Set<HTMLElement> {
	const containers = getRegisteredContainers();
	if (containers.length === 0) return EMPTY_ACTIVE_CONTAINERS;

	if (isLandscapeMode) {
		// In landscape, find the row closest to the vertical center of the viewport.
		const viewportCenter = window.innerHeight / 2;
		let minDistance = Number.POSITIVE_INFINITY;
		let activeTop = 0;

		for (const container of containers) {
			const rect = container.getBoundingClientRect();
			const containerCenter = rect.top + rect.height / 2;
			const distance = Math.abs(containerCenter - viewportCenter);

			if (distance < minDistance) {
				minDistance = distance;
				activeTop = rect.top;
			}
		}

		const nextActiveContainers = new Set<HTMLElement>();

		for (const container of containers) {
			const rect = container.getBoundingClientRect();

			if (Math.abs(rect.top - activeTop) < ACTIVE_ROW_TOLERANCE) {
				nextActiveContainers.add(container);
			}
		}

		return nextActiveContainers;
	}

	let topMostTop = Number.POSITIVE_INFINITY;
	let topMostContainer: HTMLElement | null = null;

	for (const container of containers) {
		const rect = container.getBoundingClientRect();
		const isFullyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

		if (isFullyVisible && rect.top < topMostTop) {
			topMostTop = rect.top;
			topMostContainer = container;
		}
	}

	if (!topMostContainer) return EMPTY_ACTIVE_CONTAINERS;

	// Activate every fully visible container in the same row as the topmost
	// one, not just the topmost itself (which is the leftmost tile in
	// multi-column rows).
	const nextActiveContainers = new Set<HTMLElement>();

	for (const container of containers) {
		const rect = container.getBoundingClientRect();
		const isFullyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

		if (
			isFullyVisible &&
			Math.abs(rect.top - topMostTop) < ACTIVE_ROW_TOLERANCE
		) {
			nextActiveContainers.add(container);
		}
	}

	return nextActiveContainers;
}

function updateActiveContainers() {
	rafId = null;
	setActiveContainers(findActiveMobileContainers());
}

function scheduleActiveContainerUpdate() {
	if (typeof window === "undefined") return;

	if (rafId !== null) {
		cancelAnimationFrame(rafId);
	}

	rafId = requestAnimationFrame(updateActiveContainers);
}

function addGlobalListeners() {
	if (isListening || typeof window === "undefined") return;

	window.addEventListener("scroll", scheduleActiveContainerUpdate, {
		passive: true,
	});
	window.addEventListener("resize", scheduleActiveContainerUpdate);
	isListening = true;
}

function removeGlobalListenersIfIdle() {
	if (!isListening || registeredContainers.size > 0) return;

	window.removeEventListener("scroll", scheduleActiveContainerUpdate);
	window.removeEventListener("resize", scheduleActiveContainerUpdate);

	if (rafId !== null) {
		cancelAnimationFrame(rafId);
		rafId = null;
	}

	isListening = false;
	setActiveContainers(EMPTY_ACTIVE_CONTAINERS);
}

function registerMobileVideoContainer(
	container: HTMLElement,
	isLandscape: boolean,
) {
	registeredContainers.add(container);
	isLandscapeMode = isLandscape;
	addGlobalListeners();
	scheduleActiveContainerUpdate();

	return () => {
		registeredContainers.delete(container);
		scheduleActiveContainerUpdate();
		removeGlobalListenersIfIdle();
	};
}

function subscribeToActiveContainers(callback: () => void) {
	activeSubscribers.add(callback);
	return () => {
		activeSubscribers.delete(callback);
	};
}

function getActiveContainersSnapshot() {
	return activeContainers;
}

function getActiveContainersServerSnapshot() {
	return EMPTY_ACTIVE_CONTAINERS;
}

export function useVideoInteraction({
	enabled,
	containerRef,
}: UseVideoInteractionOptions) {
	const { isMobile, isLandscape, isPointerCoarse } = useViewport();
	const isMobileMode =
		isMobile ||
		isPointerCoarse ||
		(typeof window !== "undefined" && "ontouchstart" in window);

	const [isHovered, setIsHovered] = useState(false);
	const [isPaused, setIsPaused] = useState(false);

	const activeMobileContainers = useSyncExternalStore(
		subscribeToActiveContainers,
		getActiveContainersSnapshot,
		getActiveContainersServerSnapshot,
	);

	useEffect(() => {
		if (!isMobileMode || !enabled) {
			return;
		}

		const container = containerRef.current;
		if (!container) return;

		return registerMobileVideoContainer(container, isLandscape);
	}, [isMobileMode, isLandscape, enabled, containerRef]);

	const handleMouseEnter = useCallback(() => {
		if (!isMobileMode && enabled) {
			setIsHovered(true);
		}
	}, [isMobileMode, enabled]);

	const handleMouseLeave = useCallback(() => {
		if (!isMobileMode) {
			setIsHovered(false);
		}
	}, [isMobileMode]);

	const handleClick = useCallback(() => {
		if (isMobileMode && enabled) {
			setIsPaused((value) => !value);
		}
	}, [isMobileMode, enabled]);

	const shouldPlay =
		enabled &&
		(isMobileMode
			? activeMobileContainers.has(containerRef.current as HTMLElement) &&
				!isPaused
			: isHovered);

	return {
		shouldPlay,
		handleMouseEnter,
		handleMouseLeave,
		handleClick,
	};
}
