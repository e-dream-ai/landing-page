import Link from "next/link";

export default function ExternalLink({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) {
	return (
		<Link
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className={
				"underline hover:text-cyan-500 transition-all duration-300 ease-in-out"
			}
		>
			{children}
		</Link>
	);
}
