import type { ReactNode } from "react";
import CardWatermark from "@/components/common/CardWatermark/CardWatermark";
import { StaggerItem } from "@/components/common/Stagger/Stagger";
import { cn } from "@/lib/utils";

interface CardProps {
	children: ReactNode;
	watermark?: ReactNode;
	className?: string;
	contentClassName?: string;
}

export default function Card({
	children,
	watermark,
	className,
	contentClassName,
}: CardProps) {
	return (
		<StaggerItem
			className={cn(
				"group relative min-h-44 overflow-hidden rounded-lg border border-white/10 bg-white/2 transition-all duration-500 hover:z-10 hover:border-primary/30 hover:bg-white/4",
				className,
			)}
		>
			{watermark != null && <CardWatermark>{watermark}</CardWatermark>}
			<div className={cn("flex h-full flex-col gap-2 p-7", contentClassName)}>
				{children}
			</div>
		</StaggerItem>
	);
}
