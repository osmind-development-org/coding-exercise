/**
 * Structured visit data (structured input or parsed from transcript).
 * Matches Senior Engineer Coding Exercise prompts.
 */

export interface VisitRecord {
  patientType: 'new' | 'established';
  visitType: 'office' | 'telemedicine' | 'group_therapy';
  totalDurationMinutes: number;
  officeVisitMinutes: number | null;
  therapyMinutes: number | null;
  complexity: 'low' | 'moderate' | 'high';
  hadMedicationReview: boolean;
  hadTherapy: boolean;
}

export interface ParsedVisit {
  visit: VisitRecord;
  confidence: 'high' | 'medium' | 'low';
  warnings: string[];
}
