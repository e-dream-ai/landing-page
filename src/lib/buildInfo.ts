import { execSync } from "node:child_process";

function git(command: string): string | null {
	try {
		return execSync(command, { stdio: ["ignore", "pipe", "ignore"] })
			.toString()
			.trim();
	} catch {
		return null;
	}
}

/**
 * Commit hash and branch the site was built from. Resolved at build time
 * (the footer is a server component): Cloudflare Pages exposes these as
 * env vars; local dev and builds fall back to git.
 */
export function getBuildInfo() {
	const hash =
		process.env.CF_PAGES_COMMIT_SHA?.slice(0, 7) ??
		git("git rev-parse --short HEAD");
	const branch =
		process.env.CF_PAGES_BRANCH ?? git("git rev-parse --abbrev-ref HEAD");
	return { hash, branch };
}
