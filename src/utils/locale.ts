import { getI18nConfig } from "emdash";

/**
 * The default locale from the site's Astro `i18n` config, if it names a
 * language this runtime can format. The archive defaults to Japanese.
 */
export function getSiteLocale(): string {
	const locale = getI18nConfig()?.defaultLocale;
	if (!locale) return "ja";
	try {
		return Intl.DateTimeFormat.supportedLocalesOf(locale)[0] ?? "ja";
	} catch {
		// Malformed tags such as "pt_BR" throw instead of matching nothing.
		return "ja";
	}
}

/** Formats a publication date in the archive's local time. */
export function formatDate(date: Date, month: "long" | "short"): string {
	return date.toLocaleDateString(getSiteLocale(), {
		timeZone: "Asia/Tokyo",
		year: "numeric",
		month,
		day: "numeric",
	});
}
