export function formatThePrice(number: number) {
  return number
    ? `${new Intl.NumberFormat("ru-RU").format(number)}  сом`
    : "Бесплатно";
}
