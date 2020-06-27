export function formatCurrency(num: number) {
  return new Intl.NumberFormat("ru-RU").format(num)
}
