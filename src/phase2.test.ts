import { expect, test } from 'vitest';

import { suggestCodes } from './phase1';
import { parseTranscript } from './phase2';

// --- Phase 2: integration tests (Notion Part 2 transcripts, expected via suggestCodes) ---

test('Medication-review office visit transcript → 99213', async () => {
  const transcript = `Doctor: Good to see you again. How have you been since last month?
Patient: Pretty good. The Lexapro has been helping with the anxiety.
Doctor: Great. Let's go over your medications — I'm going to keep
  the Lexapro at the current dosage, it sounds like it's working.
  Anything else on your mind today?
Patient: No, I think that's it.
Doctor: Alright, we'll plan to follow up in a month.
[Visit duration: 30 minutes. No therapy performed.]`;

  const record = await parseTranscript(transcript);
  expect(suggestCodes(record)).toEqual(['99213']);
});

test('Therapy-only telemedicine transcript → 90837', async () => {
  const transcript = `Therapist: How are you feeling today?
Patient: Still struggling with the anxiety, but I've been trying
  the breathing exercises you showed me.
Therapist: Good. Let's work through some more CBT techniques today.
  I want to talk about the thought patterns we identified last week...
[Visit duration: 60 minutes. No medication review performed.]`;

  const record = await parseTranscript(transcript);
  expect(suggestCodes(record)).toEqual(['90837']);
});
