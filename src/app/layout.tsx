import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SKV Global - Cryptocurrency Platform',
  description: 'Professional cryptocurrency trading and portfolio management platform by SKV Global. Trade, track, and manage your crypto investments with advanced tools and real-time market data.',
  keywords: 'cryptocurrency, bitcoin, ethereum, trading, portfolio, blockchain, crypto wallet, SKV Global',
  authors: [{ name: 'SKV Global' }],
  metadataBase: new URL('https://skvglobalcrypto.com'),
  openGraph: {
    title: 'SKV Global - Cryptocurrency Platform',
    description: 'Professional cryptocurrency trading and portfolio management platform',
    type: 'website',
    locale: 'en_US',
    siteName: 'SKV Global Crypto',
    url: 'https://skvglobalcrypto.com',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SKV Global Cryptocurrency Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SKV Global - Cryptocurrency Platform',
    description: 'Professional cryptocurrency trading and portfolio management platform',
    site: '@skvglobal',
    creator: '@skvglobal',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://skvglobalcrypto.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full antialiased`}>
        <div className="min-h-full bg-gray-50">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}