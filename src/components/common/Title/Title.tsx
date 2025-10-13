import { cn } from "@/lib/utils";

interface TitleProps {
	children: React.ReactNode;
	className?: string;
}

export default function Title({ children, className }: TitleProps) {
	return (
		<h1
			className={cn("text-3xl font-primary text-primary font-bold", className)}
		>
			{children}
		</h1>
	);
}
