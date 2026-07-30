"use client";

import Button from "@/components/common/Button/Button";
import Logo from "@/components/common/Logo/Logo";
import Container from "@/components/layout/Container/Container";
import { ROUTES } from "@/constants/routes";

export default function NavBar() {
	return (
		<header className="fixed top-0 right-0 left-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl backdrop-saturate-150">
			<Container className="flex items-center justify-between gap-2 sm:gap-4 py-3 md:py-3.5">
				<Logo />

				<nav className="flex items-center gap-2 sm:gap-3 shrink-0">
					<Button
						href={ROUTES.app}
						variant="outline"
						size="sm"
						className="hidden md:inline-flex"
					>
						Open the App
					</Button>
					<Button
						href={ROUTES.createAccount}
						variant="primary"
						size="sm"
						className="px-3.5 py-1.5 text-xs whitespace-nowrap sm:px-5 sm:py-2 sm:text-sm"
					>
						Start Free
					</Button>
				</nav>
			</Container>
		</header>
	);
}
