import { VISIT_RECORD_SCHEMA } from './phase2';
import type { ParsedVisit } from './types';

export const PARSED_VISIT_SCHEMA: Record<string, unknown> = {
  type: 'object',
  properties: {
    visit: VISIT_RECORD_SCHEMA,
    confidence: { type: 'string', enum: ['high', 'medium', 'low'] },
    warnings: { type: 'array', items: { type: 'string' } },
  },
  required: ['visit', 'confidence', 'warnings'],
  additionalProperties: false,
};

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
