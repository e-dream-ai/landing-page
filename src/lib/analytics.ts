export const GA_MEASUREMENT_ID = "G-CQYCM2T6X6";

declare global {
	interface Window {
		dataLayer?: unknown[];
		gtag?: (...args: unknown[]) => void;
	}
}

export function trackSignUpClick(location: string): void {
	if (typeof window === "undefined" || typeof window.gtag !== "function")
		return;
	window.gtag("event", "sign_up_click", { location });
}
