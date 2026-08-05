const TIME_TO_LIVE_MS = 5 * 60 * 1000; // min * sec * ms;

export function getCachedData(key: string, ttlMs: number = TIME_TO_LIVE_MS) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    const payload = JSON.parse(raw);
    const isExpired = Date.now() - payload.timestamp > ttlMs;

    if (isExpired) {
      localStorage.removeItem(key);
      return null;
    }

    return payload.data;
  } catch (err) {
    console.warn("Error reading from localStorage cache:", err);
    return null;
  }
}

export function setCachedData<T>(key: string, data: T) {
  try {
    const payload = {
      timestamp: Date.now(),
      data,
    };
    localStorage.setItem(key, JSON.stringify(payload));
  } catch (err) {
    console.warn("Error writing to localStorage cache:", err);
  }
}
