export function sessionExpiration() {
  const d = new Date();
  d.setTime(
    d.getTime() + 30 * 24 * 60 * 60 * 1000,
  );
  return d;
}
