export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export function generateReference(prefix = "S8"): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}
