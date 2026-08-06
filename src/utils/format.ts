const MISSING_VALUES = new Set(["unknown", "n/a", "none", ""]);

export function formatFieldValue(value: string | null | undefined): string {
  if (value == null) return "-";
  const normalized = value.trim().toLowerCase();
  return MISSING_VALUES.has(normalized) ? "-" : value;
}
