import type { ReactNode } from "react";
import CardWatermark from "@/components/common/CardWatermark/CardWatermark";
import { StaggerItem } from "@/components/common/Stagger/Stagger";
import { cn } from "@/lib/utils";

interface CardProps {
	children: ReactNode;
	watermark?: ReactNode;
	className?: string;
	contentClassName?: string;
	watermarkClassName?: string;
}

export default function Card({
	children,
	watermark,
	className,
	contentClassName,
	watermarkClassName,
}: CardProps) {
	return (
		<StaggerItem
			className={cn(
				"group relative min-h-44 overflow-hidden rounded-lg border border-white/10 bg-neutral-800 transition-all duration-500 hover:z-10 hover:border-primary/30 hover:bg-neutral-700",
				className,
			)}
		>
			{watermark != null && (
				<CardWatermark className={watermarkClassName}>
					{watermark}
				</CardWatermark>
			)}
			<div className={cn("flex h-full flex-col gap-2 p-5", contentClassName)}>
				{children}
			</div>
		</StaggerItem>
	);
}
