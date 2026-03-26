import type { CartItem } from "@/context/CartContext"

const CATEGORY_EMOJI: Record<string, string> = {
  "Sushi":           "🍣",
  "Appetizers":      "🥗",
  "Mains":           "🥩",
  "Pizza & Burgers": "🍕",
  "Drinks":          "🍹",
}

export const getCategoryEmoji = (category: string): string => {
  const cat = category.toLowerCase();
  if (cat.includes('sushi')) return "🍣";
  if (cat.includes('starter') || cat.includes('appetizer')) return "🥗";
  if (cat.includes('main')) return "🥩";
  if (cat.includes('pizza') || cat.includes('burger')) return "🍕";
  if (cat.includes('drink')) return "🍹";
  return "🍽️";
}

export function buildWhatsAppMessage(
  items: CartItem[],
  customerName?: string,
  language: 'en' | 'es' = 'es'
): string {
  const divider = "────────────────────"
  
  const itemLines = items
    .map(item => 
      `${getCategoryEmoji(item.category)} *${item.name}* x ${item.quantity}`
    )
    .join("\n")

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity, 0
  )

  const nameLine = customerName?.trim()
    ? `\n👤 *${language === 'es' ? 'Cliente' : 'Customer'}:* ${customerName.trim()}`
    : ""

  const message = language === 'es' ? [
    "*¡Hola Dragonfly!* 🐉",
    "Me gustaría hacer un pedido:",
    "",
    "📋 *DETALLES DEL PEDIDO*",
    divider,
    itemLines,
    divider,
    `*Total de artículos: ${totalItems}*`,
    nameLine,
    "",
    "Por favor confirmen disponibilidad y precios.",
    "¡Gracias! 🙏"
  ] : [
    "*Hello Dragonfly!* 🐉",
    "I'd like to place an order:",
    "",
    "📋 *ORDER DETAILS*",
    divider,
    itemLines,
    divider,
    `*Total items: ${totalItems}*`,
    nameLine,
    "",
    "Please confirm availability and pricing.",
    "Thank you! 🙏"
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
