import Image from "next/image";

export default function Logo() {
	return (
		<div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
			<Image
				src="/logo.png"
				alt="infinidream"
				width={80}
				height={80}
				quality={100}
				priority
				className="size-[38px] sm:size-12 md:size-[58px]"
			/>
			<span className="text-[28px] font-primary text-primary sm:text-4xl md:text-[43px]">
				infinidream
			</span>
		</div>
	);
}
