import TextLink from "@/components/common/TextLink/TextLink";
import { ROUTES } from "@/constants/routes";
import { getBuildInfo } from "@/lib/buildInfo";

const mutedLink =
	"text-white/40 decoration-white/20 hover:text-white/70 hover:decoration-white/40";

export default function Footer() {
	const { hash, branch } = getBuildInfo();

	return (
		<footer className="flex flex-wrap items-center justify-center gap-x-20 gap-y-2 px-8 py-5 border-t border-white/10 font-secondary text-xs uppercase tracking-widest text-white/40">
			<TextLink href={ROUTES.tos} className={mutedLink}>
				Terms of Service
			</TextLink>
			{hash && (
				<TextLink
					href={`https://github.com/e-dream-ai/landing-page/commits/${branch ?? "main"}`}
					className={`${mutedLink} font-mono normal-case tracking-normal`}
				>
					{hash}
				</TextLink>
			)}
			<p>© {new Date().getFullYear()} e-dream, inc.</p>
		</footer>
	);
}
