import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardWatermarkProps {
	children: ReactNode;
	className?: string;
}

export default function CardWatermark({
	children,
	className,
}: CardWatermarkProps) {
	return (
		<span
			aria-hidden
			className={cn(
				"pointer-events-none absolute -bottom-6 -right-2 origin-bottom-right select-none font-primary text-[7rem] font-bold uppercase leading-none text-primary opacity-[0.03] transition-all duration-500 group-hover:scale-105 group-hover:opacity-[0.07]",
				className,
			)}
		>
			{children}
		</span>
	);
}
