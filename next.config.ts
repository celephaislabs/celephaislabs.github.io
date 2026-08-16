import type { NextConfig } from "next";

const isGitHubPagesBuild = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = isGitHubPagesBuild
	? {
			output: "export",
			trailingSlash: true,
			typescript: {
				ignoreBuildErrors: true,
			},
		}
	: {};

export default nextConfig;
