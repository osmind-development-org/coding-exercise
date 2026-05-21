// Set OPENAI_API_KEY in your .env file (see .env.example).

import OpenAI from 'openai';

const client = new OpenAI();

const SYSTEM_PROMPT =
  'You are assessing clinical note text to decide what CPT codes are relevant.';

/**
 * Call the Responses API. When `schema` is provided, use structured JSON outputs
 * (JSON Schema format) aligned with OpenAI Structured Outputs.
 */
export async function prompt(text: string, schema?: Record<string, unknown>): Promise<string> {
  const response = await client.responses.create({
    model: 'gpt-5-nano',
    input: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: text },
    ],
    text:
      schema === undefined
        ? undefined
        : {
            format: {
              type: 'json_schema',
              name: 'visit_record',
              schema,
            },
          },
  });

  return response.output_text;
}
