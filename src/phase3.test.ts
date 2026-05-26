import { expect, test } from 'vitest';

import { parseTranscript, suggestCodes } from './phase3';

// --- Phase 3: uncertainty flag (Notion Part 3) ---

test('Clear medication-review transcript → 99213 without needsReview', async () => {
  const transcript = `Doctor: Good to see you again. How have you been since last month?
Patient: Pretty good. The Lexapro has been helping with the anxiety.
Doctor: Great. Let's go over your medications — I'm going to keep
  the Lexapro at the current dosage, it sounds like it's working.
  Anything else on your mind today?
Patient: No, I think that's it.
Doctor: Alright, we'll plan to follow up in a month.
[Visit duration: 30 minutes. No therapy performed.]`;

  const parsed = await parseTranscript(transcript);

  expect(parsed.confidence).toBe('high');
  expect(suggestCodes(parsed)).toEqual({ codes: ['99213'], needsReview: false });
});

test('Vague 45-min transcript → 99214 with needsReview', async () => {
  const transcript = `Doctor: Let's talk about how things have been going.
Patient: Better I think. We talked about some stuff.
Doctor: And the medications?
Patient: Yeah those are fine.
[Visit duration: 45 minutes]`;

  const parsed = await parseTranscript(transcript);

  expect(parsed.confidence).toBe('low');
  expect(parsed.warnings.length).toBeGreaterThan(0);
  expect(suggestCodes(parsed)).toEqual({ codes: ['99214'], needsReview: true });
});
