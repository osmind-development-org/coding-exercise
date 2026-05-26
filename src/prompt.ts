// Set OPENAI_API_KEY in your .env file (see .env.example).

import OpenAI from 'openai';

const client = new OpenAI();

const SYSTEM_PROMPT =
  'You are assessing clinical note text to decide what CPT codes are relevant.';

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
 * Call the Responses API with structured JSON output (OpenAI Structured Outputs).
 *
 * Defaults to `VISIT_RECORD_SCHEMA` for Phase 2 transcript parsing. For Phase 3,
 * pass `PARSED_VISIT_SCHEMA` to include confidence and warnings. A custom schema
 * may still be passed to override the default.
 */
export async function prompt(
  text: string,
  schema: Record<string, unknown> = VISIT_RECORD_SCHEMA,
): Promise<string> {
  const response = await client.responses.create({
    model: 'gpt-5-nano',
    input: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: text },
    ],
    text: {
      format: {
        type: 'json_schema',
        name: 'visit_record',
        schema,
      },
    },
  });

  return response.output_text;
}
