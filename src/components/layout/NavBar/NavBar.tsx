"use client";

import Button from "@/components/common/Button/Button";
import Logo from "@/components/common/Logo/Logo";
import Container from "@/components/layout/Container/Container";
import { ROUTES } from "@/constants/routes";
import { trackSignUpClick } from "@/lib/analytics";

export default function NavBar() {
	return (
		<header className="fixed top-0 right-0 left-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl backdrop-saturate-150">
			<Container className="flex items-center justify-between gap-2 sm:gap-4 py-2 md:py-2.5 short-landscape:py-1!">
				<Logo />

				<nav className="flex items-center gap-2 sm:gap-3 shrink-0">
					<Button
						href={ROUTES.app}
						variant="outline"
						size="sm"
						className="hidden md:inline-flex short-landscape:px-3! short-landscape:py-1! short-landscape:text-xs!"
					>
						Open the App
					</Button>
					<Button
						href={ROUTES.createAccount}
						variant="primary"
						size="sm"
						className="px-3.5 py-1.5 text-xs whitespace-nowrap sm:px-5 sm:py-2 sm:text-sm short-landscape:px-3! short-landscape:py-1! short-landscape:text-xs!"
						onClick={() => trackSignUpClick("nav")}
					>
						Start Free
					</Button>
				</nav>
			</Container>
		</header>
	);
}
