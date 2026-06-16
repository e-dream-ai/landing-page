import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn, isExternalHref } from "@/lib/utils";

const textLinkVariants = cva("underline underline-offset-2 transition-colors", {
	variants: {
		tone: {
			white:
				"text-white decoration-white/30 hover:text-primary hover:decoration-primary/60",
			primary:
				"text-primary decoration-primary/30 hover:text-primary/80 hover:decoration-primary/60",
		},
	},
	defaultVariants: {
		tone: "white",
	},
});

type TextLinkProps = VariantProps<typeof textLinkVariants> & {
	href: string;
	children: ReactNode;
	className?: string;
	external?: boolean;
};

export default function TextLink({
	href,
	children,
	className,
	tone,
	external,
}: TextLinkProps) {
	const openExternal = external ?? isExternalHref(href);
	return (
		<Link
			href={href}
			className={cn(textLinkVariants({ tone }), className)}
			{...(openExternal && { target: "_blank", rel: "noopener noreferrer" })}
		>
			{children}
		</Link>
	);
}
