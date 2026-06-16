import Image from "next/image";

export default function Logo() {
	return (
		<div className="flex items-center gap-2.5">
			<Image
				src="/logo.png"
				alt="infinidream"
				width={80}
				height={80}
				quality={100}
				priority
				className="size-12"
			/>
			<span className="text-4xl font-primary text-primary">infinidream</span>
		</div>
	);
}
