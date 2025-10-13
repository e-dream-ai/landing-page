import { useEffect } from "react";

interface UseScrollLockOptions {
	isLocked: boolean;
}

export function useScrollLock({ isLocked }: UseScrollLockOptions): void {
	useEffect(() => {
		if (isLocked) {
			const scrollY = window.scrollY;
			const body = document.body;

			body.style.position = "fixed";
			body.style.top = `-${scrollY}px`;
			body.style.left = "0";
			body.style.right = "0";
			body.style.width = "100%";
			body.style.overflow = "hidden";

			return () => {
				body.style.position = "";
				body.style.top = "";
				body.style.left = "";
				body.style.right = "";
				body.style.width = "";
				body.style.overflow = "";
				window.scrollTo(0, scrollY);
			};
		}
	}, [isLocked]);
}
