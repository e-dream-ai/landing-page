import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn, isExternalHref } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center rounded font-secondary font-semibold transition-colors duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
	{
		variants: {
			variant: {
				primary: "bg-button text-black hover:bg-button/90",
				outline: "border border-button/60 text-white hover:bg-button/10",
				outlinePrimary:
					"border border-button text-button hover:bg-button/10",
			},
			size: {
				sm: "px-5 py-2 text-sm",
				md: "px-8 py-3 text-sm",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "md",
		},
	},
);

type ButtonProps = VariantProps<typeof buttonVariants> & {
	children: ReactNode;
	className?: string;
	href?: string;
	external?: boolean;
	type?: "button" | "submit" | "reset";
	onClick?: () => void;
};

export default function Button({
	children,
	className,
	variant,
	size,
	href,
	external,
	type = "button",
	onClick,
}: ButtonProps) {
	const classes = cn(buttonVariants({ variant, size }), className);

	if (href) {
		const openExternal = external ?? isExternalHref(href);
		return (
			<Link
				href={href}
				className={classes}
				{...(openExternal && {
					target: "_blank",
					rel: "noopener noreferrer",
				})}
			>
				{children}
			</Link>
		);
	}

	return (
		<button type={type} className={classes} onClick={onClick}>
			{children}
		</button>
	);
}
