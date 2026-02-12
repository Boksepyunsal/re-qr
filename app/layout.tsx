import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL('https://reqr.app'),
  title: {
    default: 'Re:QR | Dynamic QR Code Generator & Manager',
    template: '%s | Re:QR',
  },
  description: 'Create, edit, and manage dynamic QR codes instantly without reprinting. Free dynamic QR code generator for marketers and businesses. Powered by 복세편살.',
  keywords: [
    'QR Code Generator', 'Dynamic QR Code', 'Free QR Code', 'QR Code Tracking', 
    'QR코드 생성', '동적 QR', '무료 QR코드', 'QR코드 수정', '복세편살'
  ],
  authors: [{ name: 'Jaeho Lee' }, { name: '복세편살' }],
  creator: '복세편살',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://reqr.app',
    title: 'Re:QR | Smart Dynamic QR Codes',
    description: 'Create and manage dynamic QR codes that you can edit anytime. Track scans and optimize your marketing.',
    siteName: 'Re:QR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Re:QR | Dynamic QR Code Generator',
    description: 'Stop reprinting QR codes. Use Re:QR to create editable, dynamic QR codes for free.',
  },
}

export const viewport: Viewport = {
  themeColor: '#3B82F6',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Re:QR',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'A dynamic QR code generator that allows users to create, edit, and track QR codes without changing the printed image.',
    author: {
      '@type': 'Organization',
      name: '복세편살',
    },
  }

  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
