"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FadeUpProps {
	children: ReactNode;
	className?: string;
	delay?: number;
}

export default function FadeUp({
	children,
	className,
	delay = 0,
}: FadeUpProps) {
	const shouldReduce = useReducedMotion();

	return (
		<motion.div
			className={cn("backface-hidden", className)}
			initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-80px" }}
			transition={{ duration: 0.5, ease: "easeOut", delay }}
		>
			{children}
		</motion.div>
	);
}
