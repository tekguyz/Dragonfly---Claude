import type { CartItem } from "@/context/CartContext"

const CATEGORY_EMOJI: Record<string, string> = {
  "Sushi":           "\uD83C\uDF63",
  "Appetizers":      "\uD83E\uDD57",
  "Mains":           "\uD83E\uDD69",
  "Pizza & Burgers": "\uD83C\uDF55",
  "Drinks":          "\uD83C\uDF79",
}

export const getCategoryEmoji = (category: string): string => {
  const cat = category.toLowerCase();
  if (cat.includes('sushi')) return "\uD83C\uDF63";
  if (cat.includes('starter') || cat.includes('appetizer')) return "\uD83E\uDD57";
  if (cat.includes('main')) return "\uD83E\uDD69";
  if (cat.includes('pizza') || cat.includes('burger')) return "\uD83C\uDF55";
  if (cat.includes('drink')) return "\uD83C\uDF79";
  return "\uD83C\uDF7D";
}

export function buildWhatsAppMessage(
  items: CartItem[],
  customerName?: string,
  language: 'en' | 'es' = 'es'
): string {
  const divider = "---------------------"
  
  const itemLines = items
    .map(item => 
      `${getCategoryEmoji(item.category)} ${item.name} x ${item.quantity}`
    )
    .join("\n")

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity, 0
  )

  const nameLine = customerName?.trim()
    ? `\n${language === 'es' ? 'Nombre' : 'Name'}: *${customerName.trim()}*`
    : ""

  const message = language === 'es' ? [
    "*¡Hola Dragonfly!* \uD83D\uDC09",
    "Me gustaría hacer un pedido:",
    "",
    "*DETALLES DEL PEDIDO*",
    divider,
    itemLines,
    divider,
    `*Total de artículos: ${totalItems}*`,
    nameLine,
    "",
    "Por favor confirmen disponibilidad y precios.",
    "¡Gracias! \uD83D\uDE4F"
  ] : [
    "*Hello Dragonfly!* \uD83D\uDC09",
    "I'd like to place an order:",
    "",
    "*ORDER DETAILS*",
    divider,
    itemLines,
    divider,
    `*Total items: ${totalItems}*`,
    nameLine,
    "",
    "Please confirm availability and pricing.",
    "Thank you! \uD83D\uDE4F"
  ]

  return message.filter(line => line !== null).join("\n")
}

export function openWhatsAppOrder(
  items: CartItem[],
  customerName?: string,
  language: 'en' | 'es' = 'es'
): void {
  const message = buildWhatsAppMessage(items, customerName, language)
  const encoded = encodeURIComponent(message)
  const url = `https://wa.me/50585639999?text=${encoded}`
  window.open(url, "_blank", "noopener,noreferrer")
}
