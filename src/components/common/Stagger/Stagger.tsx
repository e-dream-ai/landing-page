"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const itemVariants = {
	hidden: { opacity: 0, y: 16 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.4, ease: "easeOut" as const },
	},
};

const itemVariantsReduced = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { duration: 0.4 } },
};

interface StaggerContainerProps {
	children: ReactNode;
	className?: string;
	trigger?: "scroll" | "mount";
	staggerDelay?: number;
}

export function StaggerContainer({
	children,
	className,
	trigger = "scroll",
	staggerDelay = 0.07,
}: StaggerContainerProps) {
	const shouldReduce = useReducedMotion();
	const variants = {
		hidden: {},
		visible: { transition: { staggerChildren: staggerDelay } },
	};

	if (trigger === "mount") {
		return (
			<motion.div
				className={className}
				variants={variants}
				initial={shouldReduce ? "visible" : "hidden"}
				animate="visible"
			>
				{children}
			</motion.div>
		);
	}

	return (
		<motion.div
			className={className}
			variants={variants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: "-80px" }}
		>
			{children}
		</motion.div>
	);
}

interface StaggerItemProps {
	children: ReactNode;
	className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
	const shouldReduce = useReducedMotion();
	return (
		<motion.div
			className={className}
			variants={shouldReduce ? itemVariantsReduced : itemVariants}
		>
			{children}
		</motion.div>
	);
}
