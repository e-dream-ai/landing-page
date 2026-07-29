import { cn } from "@/lib/utils";

export default function Container({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div className={cn("w-full px-4 py-4 sm:px-6 md:px-8 md:py-5", className)}>
			{children}
		</div>
	);
}
