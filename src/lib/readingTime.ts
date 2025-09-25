const WORDS_PER_MINUTE = 180;

export function readingTimeMinutes(content: string): string {
  const words = content.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}
