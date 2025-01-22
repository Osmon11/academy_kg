export function formatThePrice(
  number: number | null | undefined,
) {
  return number
    ? `${new Intl.NumberFormat("ru-RU").format(number)}  сом`
    : "Бесплатно";
}
