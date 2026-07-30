import type { ReactNode } from "react";
import Container from "@/components/layout/Container/Container";
import { cn } from "@/lib/utils";

interface SectionProps {
	children: ReactNode;
	className?: string;
	alt?: boolean;
}

export default function Section({
	children,
	className,
	alt = false,
}: SectionProps) {
	return (
		<section className={cn(alt && "border-y border-white/10 bg-white/6")}>
			<Container className={cn("mx-auto max-w-7xl", alt && "py-12", className)}>
				{children}
			</Container>
		</section>
	);
}
