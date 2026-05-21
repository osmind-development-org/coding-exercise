import { expect, test } from 'vitest';

import { parseTranscript, suggestCodes } from './phase3';

// --- Phase 3: uncertainty flag (Notion Part 2) ---

test('Vague 45-min transcript → 99214 with needsReview', async () => {
  const transcript = `Doctor: Let's talk about how things have been going.
Patient: Better I think. We talked about some stuff.
Doctor: And the medications?
Patient: Yeah those are fine.
[Visit duration: 45 minutes]`;

  const parsed = await parseTranscript(transcript);

  expect(suggestCodes(parsed)).toEqual({ codes: ['99214'], needsReview: true });
});
