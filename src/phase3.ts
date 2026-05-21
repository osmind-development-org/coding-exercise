import type { ParsedVisit } from './types';

/**
 * Phase 3 — parse with ambiguity metadata; billing suggestions may require review.
 */
export async function parseTranscript(_transcript: string): Promise<ParsedVisit> {
  throw new Error('Not implemented');
}

export function suggestCodes(_parsed: ParsedVisit): { codes: string[]; needsReview: boolean } {
  throw new Error('Not implemented');
}
