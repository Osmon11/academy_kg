export function getPercentage(
  value: number | string | undefined | null,
  fromValue: number | string | undefined | null,
) {
  if (
    typeof value !== "number" ||
    typeof fromValue !== "number"
  ) {
    return 0;
  }
  const result = Math.round(
    (value * 100) / fromValue,
  );
  return result > 100 ? 100 : result;
}
