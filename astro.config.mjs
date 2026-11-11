import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { d1, r2 } from "@emdash-cms/cloudflare";
import { defineConfig, fontProviders } from "astro/config";
import emdash from "emdash/astro";

export default defineConfig({
	output: "server",
	adapter: cloudflare(),
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	vite: {
		environments: {
			ssr: {
				optimizeDeps: {
					// Prebundle the image route before the first local thumbnail request.
					include: ["@astrojs/cloudflare/image-transform-endpoint"],
				},
			},
		},
	},
	integrations: [
		react(),
		emdash({
			database: d1({ binding: "DB", session: "auto", coalesce: true }),
			storage: r2({ binding: "MEDIA" }),
		}),
	],
	fonts: [
		{
			provider: fontProviders.google(),
			name: "Inter",
			cssVariable: "--font-body",
			weights: [400, 500, 600, 700],
			fallbacks: ["Hiragino Sans", "Yu Gothic", "Meiryo", "sans-serif"],
		},
		{
			provider: fontProviders.google(),
			name: "Noto Serif JP",
			cssVariable: "--font-japanese-serif",
			weights: [400, 600],
			fallbacks: ["Yu Mincho", "Hiragino Mincho ProN", "serif"],
		},
		{
			provider: fontProviders.google(),
			name: "JetBrains Mono",
			cssVariable: "--font-mono",
			weights: [400, 500],
			fallbacks: ["monospace"],
		},
	],
	devToolbar: { enabled: false },
});
