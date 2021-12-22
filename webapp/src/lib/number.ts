export function toDecimal(value: string): string {
  return value.replace(/[^\d.]/g, '')
}
