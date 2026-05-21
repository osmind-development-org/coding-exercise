import { expect, test } from 'vitest';

import type { VisitRecord } from './types';

import { suggestCodes } from './phase1';

// --- Phase 1: matches Senior Engineer Coding Exercise Part 1 (Notion examples) ---

test('Established office visit, 30 min, medication review, low complexity, no therapy → 99213', () => {
  const visit: VisitRecord = {
    patientType: 'established',
    visitType: 'office',
    totalDurationMinutes: 30,
    officeVisitMinutes: 30,
    therapyMinutes: null,
    complexity: 'low',
    hadMedicationReview: true,
    hadTherapy: false,
  };

  expect(suggestCodes(visit)).toEqual(['99213']);
});

test('Established telemedicine, 60 min therapy-only, no medication review → 90837', () => {
  const visit: VisitRecord = {
    patientType: 'established',
    visitType: 'telemedicine',
    totalDurationMinutes: 60,
    officeVisitMinutes: null,
    therapyMinutes: 60,
    complexity: 'low',
    hadMedicationReview: false,
    hadTherapy: true,
  };

  expect(suggestCodes(visit)).toEqual(['90837']);
});
