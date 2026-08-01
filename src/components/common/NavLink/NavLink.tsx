import Link from "next/link";
import { Button } from "@/components/ui/button";

interface NavLinkProps {
	href: string;
	children: React.ReactNode;
	external?: boolean;
	onClick?: () => void;
}

export default function NavLink({
	href,
	children,
	external = false,
	onClick,
}: NavLinkProps) {
	return (
		<Link
			href={href}
			onClick={onClick}
			{...(external && { target: "_blank", rel: "noopener noreferrer" })}
		>
			<Button variant="marketing" size="xl">
				{children}
			</Button>
		</Link>
	);
}
