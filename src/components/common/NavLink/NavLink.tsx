import Link from "next/link";
import { Button } from "@/components/ui/button";

interface NavLinkProps {
	href: string;
	children: React.ReactNode;
	external?: boolean;
}

export default function NavLink({
	href,
	children,
	external = false,
}: NavLinkProps) {
	return (
		<Link
			href={href}
			{...(external && { target: "_blank", rel: "noopener noreferrer" })}
		>
			<Button variant="marketing" size="xl">
				{children}
			</Button>
		</Link>
	);
}
