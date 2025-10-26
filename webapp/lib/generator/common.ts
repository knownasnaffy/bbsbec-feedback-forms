export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateResponses(
  avgTarget = 4.5,
  questions = 10,
): { [key: string]: number } {
  const responses: { [key: string]: number } = {};
  for (let q = 1; q <= questions; q++) {
    // Bias around avgTarget with some randomness:
    let rating = Math.round(avgTarget + (Math.random() - 0.5) * 1.2);
    // Ensure the rating is in [1,5]
    rating = Math.max(1, Math.min(5, rating));
    responses[q.toString()] = rating;
  }
  return responses;
}
