import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (_context, next) => {
	const result = await next();
	// Production follows EmDash's per-entry SEO settings. Preview builds can opt out.
	if (!import.meta.env.DEV && import.meta.env.SITE_NOINDEX !== "true") return result;
	const response = new Response(result.body, result);
	response.headers.append("X-Robots-Tag", "noindex");
	return response;
});
