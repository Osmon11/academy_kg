export function formatThePrice(number: number) {
  return new Intl.NumberFormat("ru-RU").format(
    number,
  );
}
