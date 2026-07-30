"use client";

import { createContext, useContext } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface ViewportContextValue {
	isMobile: boolean;
	isLandscape: boolean;
	isPointerCoarse: boolean;
}

const ViewportContext = createContext<ViewportContextValue>({
	isMobile: false,
	isLandscape: false,
	isPointerCoarse: false,
});

export function ViewportProvider({ children }: { children: React.ReactNode }) {
	const isMobile = useMediaQuery("(max-width: 767px)");
	const isLandscape = useMediaQuery("(orientation: landscape)");
	const isPointerCoarse = useMediaQuery("(pointer: coarse)");

	return (
		<ViewportContext.Provider
			value={{ isMobile, isLandscape, isPointerCoarse }}
		>
			{children}
		</ViewportContext.Provider>
	);
}

export function useViewport() {
	return useContext(ViewportContext);
}
