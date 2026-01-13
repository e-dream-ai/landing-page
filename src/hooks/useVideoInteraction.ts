import { useCallback, useEffect, useReducer } from "react";
import { useIsMobile } from "./useIsMobile";
import { useIsLandscape } from "./useIsLandscape";

interface UseVideoInteractionOptions {
  enabled: boolean;
  containerRef: React.RefObject<HTMLElement | null>;
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
  action: InteractionAction
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

function findActiveMobileContainer(
  currentContainer: HTMLElement | null,
  isLandscape: boolean
): boolean {
  if (!currentContainer) return false;

  const containers = document.querySelectorAll<HTMLElement>(
    "[data-video-container]"
  );

  if (isLandscape) {
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

    const currentRect = currentContainer.getBoundingClientRect();
    // Tolerance for sub-pixel rendering differences
    return Math.abs(currentRect.top - activeTop) < 2;
  }

  let topMostTop = Number.POSITIVE_INFINITY;
  let topMostContainer: Element | null = null;

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
}: UseVideoInteractionOptions) {
  const isMobile = useIsMobile();
  const isLandscape = useIsLandscape();

  const isMobileMode =
    isMobile ||
    (typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window));

  const [state, dispatch] = useReducer(interactionReducer, {
    isHovered: false,
    isPaused: false,
    isActiveOnMobile: false,
  });

  useEffect(() => {
    if (!isMobileMode || !enabled) {
      dispatch({ type: "SET_ACTIVE_ON_MOBILE", payload: false });
      return;
    }

    let rafId: number;

    const updateActiveVideo = () => {
      const isActive = findActiveMobileContainer(
        containerRef.current,
        isLandscape
      );
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
  }, [isMobileMode, isLandscape, enabled, containerRef]);

  const handleMouseEnter = useCallback(() => {
    if (!isMobileMode && enabled) {
      dispatch({ type: "MOUSE_ENTER" });
    }
  }, [isMobileMode, enabled]);

  const handleMouseLeave = useCallback(() => {
    if (!isMobileMode) {
      dispatch({ type: "MOUSE_LEAVE" });
    }
  }, [isMobileMode]);

  const handleClick = useCallback(() => {
    if (isMobileMode && enabled) {
      dispatch({ type: "TOGGLE_PAUSE" });
    }
  }, [isMobileMode, enabled]);

  const shouldPlay =
    enabled &&
    (isMobileMode
      ? state.isActiveOnMobile && !state.isPaused
      : state.isHovered);

  return {
    shouldPlay,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
  };
}
