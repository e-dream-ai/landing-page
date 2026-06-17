"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import Button from "@/components/common/Button/Button";
import Logo from "@/components/common/Logo/Logo";
import Container from "@/components/layout/Container/Container";
import { ROUTES } from "@/constants/routes";

export default function NavBar() {
	const [open, setOpen] = useState(false);

	return (
		<header className="fixed top-0 right-0 left-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl backdrop-saturate-150">
			<Container className="flex items-center justify-between">
				<Logo />

				<nav className="hidden items-center gap-3 md:flex">
					<Button href={ROUTES.app} variant="outline" size="sm">
						Open the App
					</Button>
					<Button href={ROUTES.createAccount} variant="primary" size="sm">
						Start Free
					</Button>
				</nav>

				<button
					type="button"
					aria-label="Toggle menu"
					aria-expanded={open}
					onClick={() => setOpen((value) => !value)}
					className="text-primary-light transition-colors hover:text-primary md:hidden"
				>
					{open ? <X className="size-8" /> : <Menu className="size-8" />}
				</button>
			</Container>

			{open && (
				<Container className="flex animate-in flex-col gap-3 border-t border-white/10 pt-3 pb-5 duration-200 fade-in slide-in-from-top-1 md:hidden">
					<Button href={ROUTES.app} variant="outline" className="w-full">
						Open the App
					</Button>
					<Button
						href={ROUTES.createAccount}
						variant="primary"
						className="w-full"
					>
						Start Free
					</Button>
				</Container>
			)}
		</header>
	);
}
