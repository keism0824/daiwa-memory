import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (_context, next) => {
	const result = await next();
	const response = new Response(result.body, result);
	response.headers.append("X-Robots-Tag", "noindex");
	return response;
});
