import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
	const result = await next();
	// Run after layouts/widgets register hints so they cannot re-enable caching.
	if (context.url.pathname.replace(/\/$/, "") === "/search" || result.status >= 300) {
		context.cache?.set(false);
		result.headers.set("Cache-Control", "no-store");
	} else if (result.headers.get("Content-Type")?.includes("text/html") && !result.headers.has("Cache-Control")) {
		result.headers.set("Cache-Control", "no-cache");
	}
	// Production follows EmDash's per-entry SEO settings. Preview builds can opt out.
	if (!import.meta.env.DEV && import.meta.env.SITE_NOINDEX !== "true") return result;
	const response = new Response(result.body, result);
	response.headers.append("X-Robots-Tag", "noindex");
	return response;
});
