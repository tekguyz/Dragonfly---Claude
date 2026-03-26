import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { COPY } from '@/constants/copy';
import { CartProvider } from '@/context/CartContext';
import { LanguageProvider } from '@/context/LanguageContext';
import CartButton from '@/components/CartButton';
import CartDrawer from '@/components/CartDrawer';

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: COPY.META_TITLE,
  description: COPY.META_DESCRIPTION,
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🐉</text></svg>",
    apple: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=180&h=180&fit=crop&q=80',
  },
  openGraph: {
    title: COPY.META_TITLE,
    description: COPY.META_DESCRIPTION,
    url: 'https://dragonfly-chinandega.com', // Placeholder URL, update to actual domain when deployed
    siteName: 'Dragonfly',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=1200&h=630&fit=crop&q=80', // High quality sushi image for OG
        width: 1200,
        height: 630,
        alt: 'Dragonfly Fusion Asian Restaurant',
      },
    ],
    locale: 'es_NI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: COPY.META_TITLE,
    description: COPY.META_DESCRIPTION,
    images: ['https://images.unsplash.com/photo-1553621042-f6e147245754?w=1200&h=630&fit=crop&q=80'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-body antialiased" suppressHydrationWarning>
        <LanguageProvider>
          <CartProvider>
            {children}
            <CartButton />
            <CartDrawer />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
