export const GA_MEASUREMENT_ID = "G-CQYCM2T6X6";

const VARIANT_COOKIE = "variant";

declare global {
	interface Window {
		dataLayer?: unknown[];
		gtag?: (...args: unknown[]) => void;
	}
}

export function getVariant(): string {
	if (typeof document === "undefined") return "unknown";
	return (
		document.cookie.match(
			new RegExp(`(?:^|;\\s*)${VARIANT_COOKIE}=([^;]+)`),
		)?.[1] ?? "unknown"
	);
}

export function trackSignUpClick(location: string): void {
	if (typeof window === "undefined" || typeof window.gtag !== "function")
		return;
	window.gtag("event", "sign_up_click", { variant: getVariant(), location });
}
