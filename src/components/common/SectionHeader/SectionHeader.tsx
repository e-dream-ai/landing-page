import { cn } from "@/lib/utils";

interface SectionHeaderProps {
	label: string;
	title?: string;
	description?: string;
	align?: "left" | "center";
	className?: string;
}

export default function SectionHeader({
	label,
	title,
	description,
	align = "left",
	className,
}: SectionHeaderProps) {
	return (
		<div
			className={cn(
				"flex flex-col gap-3",
				align === "center" && "items-center text-center",
				className,
			)}
		>
			<p className="font-primary text-xs uppercase tracking-widest text-primary-muted">
				{label}
			</p>
			{title && (
				<h2 className="font-primary text-4xl font-light leading-tight text-primary">
					{title}
				</h2>
			)}
			{description && (
				<p className="max-w-xl font-secondary text-base text-primary-light">
					{description}
				</p>
			)}
		</div>
	);
}
