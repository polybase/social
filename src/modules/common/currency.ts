export function toUSD (value: string|number) {
  const number = value ? parseFloat(`${value}`) : 0
  if (!Intl) return `$${number}`
  return number % 1 === 0
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(number)
    : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(number)
}
