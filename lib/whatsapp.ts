// Argentina mobile international format: 54 + 9 + area_code + number
// User number: 221-353-0494 → 549 2213530494
export const WHATSAPP_NUMBER = "5492213530494";
export const WHATSAPP_DISPLAY = "+54 9 221 353-0494";

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
