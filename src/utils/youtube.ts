/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Returns a direct YouTube video link or search query for the given exercise.
 */
export function getYoutubeUrl(exerciseName: string): string {
  const normalized = exerciseName.toLowerCase().trim();
  
  const videoMap: Record<string, string> = {
    "barbell bench press": "https://www.youtube.com/watch?v=gRVjAtPip0Y",
    "dumbbell incline press": "https://www.youtube.com/watch?v=0G2_XP0g2UY",
    "push-up": "https://www.youtube.com/watch?v=v9LABVJ38_g",
    "barbell back squat": "https://www.youtube.com/watch?v=Uv_KPlcr968",
    "deadlift": "https://www.youtube.com/watch?v=op9kVnCpxEE",
    "pull-up": "https://www.youtube.com/watch?v=eGo4IYlbE5g",
    "bicep curl": "https://www.youtube.com/watch?v=ykJmrZ5v0Oo",
    "dumbbell bicep curl": "https://www.youtube.com/watch?v=i1YgFZB6alI",
    "dips for triceps": "https://www.youtube.com/watch?v=dX_n3tzi_6s",
    "tricep pushdown": "https://www.youtube.com/watch?v=2-LAMcpzODU",
    "barbell squat": "https://www.youtube.com/watch?v=Uv_KPlcr968",
    "squat": "https://www.youtube.com/watch?v=Uv_KPlcr968",
    "plank": "https://www.youtube.com/watch?v=pSHjTRCQxIw",
    "overhead shoulder press": "https://www.youtube.com/watch?v=QAQ64hK30oM",
    "military press": "https://www.youtube.com/watch?v=QAQ64hK30oM",
    "dumbbell lateral raise": "https://www.youtube.com/watch?v=3VcKaXpzqRo",
    "lat pulldown": "https://www.youtube.com/watch?v=eGo4IYlbE5g",
    "cable row": "https://www.youtube.com/watch?v=GZbfZ033f74",
    "lunges": "https://www.youtube.com/watch?v=QOVaHwm-Q6U",
    "leg press": "https://www.youtube.com/watch?v=IZxyjWwJYlU",
    "leg curl": "https://www.youtube.com/watch?v=1Tq3K3Z-X_o",
    "calf raise": "https://www.youtube.com/watch?v=gwLzBJYoWlU"
  };

  for (const [key, url] of Object.entries(videoMap)) {
    if (normalized.includes(key)) {
      return url;
    }
  }

  // Fallback to high-quality search link
  return `https://www.youtube.com/results?search_query=how+to+do+${encodeURIComponent(exerciseName)}+exercise+form+tutorial`;
}
