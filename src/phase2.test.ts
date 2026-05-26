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
  expect(record.hadMedicationReview).toBe(true);
  expect(record.hadTherapy).toBe(false);
  expect(record.visitType).toBe('office');
  expect(record.therapyMinutes).toBeNull();
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
  expect(record.hadMedicationReview).toBe(false);
  expect(record.hadTherapy).toBe(true);
  expect(record.visitType).toBe('telemedicine');
  expect(record.therapyMinutes).toBe(60);
  expect(suggestCodes(record)).toEqual(['90837']);
});

test('Combined office visit + therapy transcript → 99214, +90833', async () => {
  const transcript = `Doctor: Good to see you again. Let's start with your medications —
  the Lamictal increase seems to be working, but I'm concerned about
  the side effects you mentioned. Let's adjust the dosage slightly.
  I also want to check in on the mood tracking we discussed.
Patient: The mood has been up and down. Work stress is a big trigger.
Doctor: Let's spend some time on that. I'd like to work through
  some strategies for managing the work stress — we'll use some
  of the CBT techniques we've talked about before.
[Visit duration: 60 minutes. 25 minutes on medication review
and clinical assessment, 35 minutes of therapy.]`;

  const record = await parseTranscript(transcript);
  expect(record.hadMedicationReview).toBe(true);
  expect(record.hadTherapy).toBe(true);
  expect(record.visitType).toBe('office');
  expect(record.therapyMinutes).toBe(35);
  expect(suggestCodes(record)).toEqual(['99214', '+90833']);
});
