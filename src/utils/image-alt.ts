/** Use the editor's description first; never invent a location or date. */
export function featuredImageAlt(
	image: { alt?: string | null; caption?: string | null },
	title: string,
): string {
	return image.alt?.trim() || image.caption?.trim() || `「${title}」の記録写真`;
}
