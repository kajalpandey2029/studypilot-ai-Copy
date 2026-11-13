// ============================================================================
// STUDYPILOT AI — SUPERMEMO-2 (SM-2) SPACED REPETITION ENGINE
// Scientific recall optimization based on cognitive decay curves
// ============================================================================

export interface SM2Input {
  repetitions: number;
  intervalDays: number;
  easeFactor: number;
  rating: 1 | 2 | 3 | 4; // 1: Again (fail), 2: Hard, 3: Good, 4: Easy
}

export interface SM2Output {
  repetitions: number;
  intervalDays: number;
  easeFactor: number;
  nextReviewDate: Date;
}

export function calculateSM2({
  repetitions,
  intervalDays,
  easeFactor,
  rating,
}: SM2Input): SM2Output {
  // Convert 1-4 scale to SM-2 standard 0-5 scale
  // 1 (Again) -> 1
  // 2 (Hard)  -> 3
  // 3 (Good)  -> 4
  // 4 (Easy)  -> 5
  const grade = rating === 1 ? 1 : rating === 2 ? 3 : rating === 3 ? 4 : 5;

  let newRepetitions = repetitions;
  let newInterval = intervalDays;
  let newEaseFactor = easeFactor;

  if (grade < 3) {
    // Failed recall: reset repetitions back to 0, review tomorrow
    newRepetitions = 0;
    newInterval = 1;
  } else {
    // Successful recall
    if (newRepetitions === 0) {
      newInterval = 1;
    } else if (newRepetitions === 1) {
      newInterval = 6;
    } else {
      newInterval = Math.round(intervalDays * easeFactor);
    }
    newRepetitions += 1;
  }

  // Update ease factor: EF' = EF + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02))
  newEaseFactor = easeFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
  
  // SM-2 bounds: Ease factor cannot drop below 1.3
  if (newEaseFactor < 1.3) {
    newEaseFactor = 1.3;
  }

  // Calculate next review timestamp
  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + newInterval);

  return {
    repetitions: newRepetitions,
    intervalDays: newInterval,
    easeFactor: Number(newEaseFactor.toFixed(2)),
    nextReviewDate,
  };
}
