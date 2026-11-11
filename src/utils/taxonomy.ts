/** Preserve tree order while including terms at every depth. */
export function flattenTerms<T extends { children?: T[] }>(terms: readonly T[]): T[] {
	return terms.flatMap((term) => [term, ...flattenTerms(term.children ?? [])]);
}
