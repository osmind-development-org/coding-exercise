// Set OPENAI_API_KEY in your .env file (see .env.example).

import OpenAI from 'openai';

const client = new OpenAI();

const SYSTEM_PROMPT =
  'You are assessing clinical note text to decide what CPT codes are relevant.';

/**
 * Call the Responses API with structured JSON output (OpenAI Structured Outputs).
 * Pass the schema from the phase module you are implementing.
 */
export async function prompt(text: string, schema: Record<string, unknown>): Promise<string> {
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
