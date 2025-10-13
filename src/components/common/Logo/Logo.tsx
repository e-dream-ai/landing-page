import Image from "next/image";

export default function Logo() {
	return (
		<div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
			<Image
				src="/logo.png"
				alt="infinidream"
				width={80}
				height={80}
				quality={100}
				priority
				className="size-12 sm:size-16 lg:size-20"
			/>
			<span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-primary text-primary">
				infinidream
			</span>
		</div>
	);
}
