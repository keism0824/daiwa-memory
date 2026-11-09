/** Resolved media reference from getSiteSettings() */
export interface MediaReference {
	mediaId: string;
	alt?: string;
	url?: string;
}

export interface BlogSiteIdentitySettings {
	title?: string;
	tagline?: string;
	logo?: MediaReference;
	favicon?: MediaReference;
}

const DEFAULT_SITE_TITLE = "大和に灯る物語";
const DEFAULT_SITE_TAGLINE = "この地域と歩む、ひとりひとりの物語";
const LEGACY_SITE_TAGLINE = "この街に生きた、ひとりひとりの物語。";

export function resolveBlogSiteIdentity(settings?: BlogSiteIdentitySettings) {
	const tagline = settings?.tagline ?? DEFAULT_SITE_TAGLINE;
	return {
		siteTitle: settings?.title ?? DEFAULT_SITE_TITLE,
		siteTagline: tagline === LEGACY_SITE_TAGLINE ? DEFAULT_SITE_TAGLINE : tagline,
		siteLogo: settings?.logo?.url ? settings.logo : null,
	};
}
