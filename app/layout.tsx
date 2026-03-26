import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { COPY } from '@/constants/copy';
import { BRAND } from '@/constants/brand';
import { CartProvider } from '@/context/CartContext';
import { LanguageProvider } from '@/context/LanguageContext';
import CartButton from '@/components/CartButton';
import CartDrawer from '@/components/CartDrawer';

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--next-font-display",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--next-font-body",
  display: "swap",
})

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
}

export const metadata: Metadata = {
  title: {
    default: "Dragonfly | Fusion Asian Restaurant — Chinandega",
    template: `%s | ${BRAND.BUSINESS_NAME} Chinandega`
  },
  description: COPY.META_DESCRIPTION,
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🐉</text></svg>",
    apple: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=180&h=180&fit=crop&q=80',
  },
  openGraph: {
    title: COPY.META_TITLE,
    description: COPY.META_DESCRIPTION,
    url: 'https://dragonfly-chinandega.com', // Placeholder URL, update to actual domain when deployed
    siteName: BRAND.BUSINESS_NAME,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1200&h=630&fit=crop&q=80', // High quality moody restaurant interior
        width: 1200,
        height: 630,
        alt: `${BRAND.BUSINESS_NAME} Fusion Asian Restaurant`,
      },
    ],
    locale: 'es_NI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: COPY.META_TITLE,
    description: COPY.META_DESCRIPTION,
    images: ['https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1200&h=630&fit=crop&q=80'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-body antialiased pb-[calc(68px+env(safe-area-inset-bottom,0px))]" suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-surface focus:text-primary focus:px-4 focus:py-2 focus:rounded-lg focus:border focus:border-primary"
        >
          Skip to content
        </a>
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
