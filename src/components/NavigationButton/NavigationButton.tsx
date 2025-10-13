import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationButtonProps {
	direction: "left" | "right";
	onClick: () => void;
	ariaLabel: string;
}

export default function NavigationButton({
	direction,
	onClick,
	ariaLabel,
}: NavigationButtonProps) {
	const Icon = direction === "left" ? ChevronLeft : ChevronRight;
	const positionClass = direction === "left" ? "left-4" : "right-4";

	return (
		<button
			type="button"
			onClick={onClick}
			className={`absolute ${positionClass} top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/50 hover:bg-black/70 border-2 border-primary/80 text-white transition-colors duration-200 focus:outline-none cursor-pointer`}
			aria-label={ariaLabel}
		>
			<Icon className="size-8" />
		</button>
	);
}
