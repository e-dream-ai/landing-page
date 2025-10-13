import Logo from "@/components/common/Logo/Logo";
import NavLink from "@/components/common/NavLink/NavLink";
import { ROUTES } from "@/constants/routes";

export default function NavBar() {
	return (
		<header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-primary/20">
			<div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 py-3 sm:py-4 lg:py-5 px-4 sm:px-6 lg:px-8">
				<Logo />

				<nav className="flex flex-col sm:flex-row gap-2 sm:gap-2.5 w-full sm:w-auto">
					<NavLink href={ROUTES.invite} external>
						Request an invite
					</NavLink>
					<NavLink href={ROUTES.app}>Open the app</NavLink>
				</nav>
			</div>
		</header>
	);
}
