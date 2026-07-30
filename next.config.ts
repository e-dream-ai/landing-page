import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "export",
	images: {
		unoptimized: true, // Needed for Static Export
		qualities: [75, 100],
	},
};

export default nextConfig;
