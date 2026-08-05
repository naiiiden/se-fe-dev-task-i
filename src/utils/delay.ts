const DEFAULT_MIN_LOADING_MS = 400;

export async function ensureMinDelay(
  startTime: number,
  minMs: number = DEFAULT_MIN_LOADING_MS,
): Promise<void> {
  const elapsed = Date.now() - startTime;
  if (elapsed < minMs) {
    await new Promise((resolve) => setTimeout(resolve, minMs - elapsed));
  }
}
