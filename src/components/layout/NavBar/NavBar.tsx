"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Button from "@/components/common/Button/Button";
import Logo from "@/components/common/Logo/Logo";
import Container from "@/components/layout/Container/Container";
import { ROUTES } from "@/constants/routes";

const NAV_LINKS = [
	{ label: "Open the App", href: ROUTES.app },
	{ label: "Discord", href: ROUTES.discord },
];

export default function NavBar() {
	const [open, setOpen] = useState(false);

	return (
		<header className="fixed top-0 right-0 left-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl backdrop-saturate-150">
			<Container className="flex items-center justify-between">
				<Logo />

				<nav className="hidden items-center gap-6 md:flex">
					{NAV_LINKS.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm font-light text-white/75 transition-colors hover:text-white"
						>
							{link.label}
						</Link>
					))}

					<Button href={ROUTES.createAccount} variant="white" size="sm">
						Start Free
					</Button>
				</nav>

				<button
					type="button"
					aria-label="Toggle menu"
					aria-expanded={open}
					onClick={() => setOpen((value) => !value)}
					className="text-white/75 transition-colors hover:text-white md:hidden"
				>
					{open ? <X className="size-6" /> : <Menu className="size-6" />}
				</button>
			</Container>

			{open && (
				<Container className="flex animate-in flex-col gap-3 border-t border-white/10 pt-3 pb-5 duration-200 fade-in slide-in-from-top-1 md:hidden">
					{NAV_LINKS.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							target="_blank"
							rel="noopener noreferrer"
							onClick={() => setOpen(false)}
							className="py-1 text-sm font-light text-white/75 transition-colors hover:text-white"
						>
							{link.label}
						</Link>
					))}

					<Button
						href={ROUTES.createAccount}
						variant="white"
						className="mt-1 w-full"
					>
						Start Free
					</Button>
				</Container>
			)}
		</header>
	);
}
