import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		if (typeof window === "undefined") return;

		const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);

		const onChange = (event: MediaQueryListEvent) => {
			setIsMobile(event.matches);
		};

		setIsMobile(mql.matches);

		mql.addEventListener("change", onChange);

		return () => mql.removeEventListener("change", onChange);
	}, []);

	return isMobile;
}
