export default function Footer() {
	return (
		<footer className="flex flex-col items-center gap-10 px-8 py-5 border-t border-white/10">
			<p className="font-secondary text-xs uppercase tracking-widest text-white/40">
				© {new Date().getFullYear()} e-dream, inc.
			</p>
		</footer>
	);
}
