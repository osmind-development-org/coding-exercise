import type { VisitRecord } from './types';

/**
 * Phase 2 — parse a raw transcript into a `VisitRecord`.
 */
export async function parseTranscript(_transcript: string): Promise<VisitRecord> {
  return {
    patientType: 'established',
    visitType: 'office',
    totalDurationMinutes: 0,
    officeVisitMinutes: null,
    therapyMinutes: null,
    complexity: 'low',
    hadMedicationReview: false,
    hadTherapy: false,
  };
}
