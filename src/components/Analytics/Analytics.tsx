"use client";

import Script from "next/script";
import { useId } from "react";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";

export default function Analytics() {
	const initId = useId();

	return (
		<>
			<Script
				src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
				strategy="afterInteractive"
			/>
			<Script id={initId} strategy="afterInteractive">
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					function getVariant(){return document.cookie.match(/(?:^|;\\s*)variant=([^;]+)/)?.[1] ?? 'unknown';}
					gtag('config', '${GA_MEASUREMENT_ID}', { variant: getVariant() });
				`}
			</Script>
		</>
	);
}
