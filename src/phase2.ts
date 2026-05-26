import type { VisitRecord } from './types';

export const VISIT_RECORD_SCHEMA: Record<string, unknown> = {
  type: 'object',
  properties: {
    patientType: { type: 'string', enum: ['new', 'established'] },
    visitType: { type: 'string', enum: ['office', 'telemedicine', 'group_therapy'] },
    totalDurationMinutes: { type: 'number' },
    officeVisitMinutes: { type: ['number', 'null'] },
    therapyMinutes: { type: ['number', 'null'] },
    complexity: { type: 'string', enum: ['low', 'moderate', 'high'] },
    hadMedicationReview: { type: 'boolean' },
    hadTherapy: { type: 'boolean' },
  },
  required: [
    'patientType',
    'visitType',
    'totalDurationMinutes',
    'officeVisitMinutes',
    'therapyMinutes',
    'complexity',
    'hadMedicationReview',
    'hadTherapy',
  ],
  additionalProperties: false,
};

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
