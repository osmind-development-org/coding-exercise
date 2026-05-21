import type { ParsedVisit } from './types';

/**
 * Phase 3 — parse with ambiguity metadata; billing suggestions may require review.
 */
export async function parseTranscript(_transcript: string): Promise<ParsedVisit> {
  return {
    visit: {
      patientType: 'established',
      visitType: 'office',
      totalDurationMinutes: 0,
      officeVisitMinutes: null,
      therapyMinutes: null,
      complexity: 'low',
      hadMedicationReview: false,
      hadTherapy: false,
    },
    confidence: 'low',
    warnings: [],
  };
}

export function suggestCodes(_parsed: ParsedVisit): { codes: string[]; needsReview: boolean } {
  return { codes: [], needsReview: false };
}
