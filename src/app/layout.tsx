import './globals.css'
import { Metadata } from 'next'
import Script from 'next/script'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'

import { Navbar } from '@/components/navbar'
import { Container } from '@/components/container'
import { ResponsiveIndicator } from '@/components/responsive-indicator'

import { ENV } from '@/lib/constants'
import { Particles } from '@/components/particles'

export const metadata: Metadata = {
  metadataBase: new URL(ENV.NEXT_PUBLIC_WEBSITE_URL),
  title: {
    default: '',
    template: ''
  },
  description:
    "Get tThis is a black window of cyberspace that displays all the logic built by AI agents using the LLM version of Claude Sonet & Opus as well as Haiku.",
  openGraph: {
    title: 'Black Windows',
    description:
      "This is a black window of cyberspace that displays all the logic built by AI agents using the LLM version of Claude Sonet & Opus as well as Haiku.",
    url: ENV.NEXT_PUBLIC_WEBSITE_URL,
    siteName: 'Black Windows',
    locale: 'en_US',
    type: 'website'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  twitter: {
    title: 'the miracle of black windows',
    card: 'summary_large_image'
  },
  verification: {
    google: ENV.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  }
}

interface Props {
  children: React.ReactNode
}

export default async function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang='en'>
      <body className={`${GeistSans.variable} ${GeistMono.variable} grid h-dvh place-items-center bg-[#3D3D3D] font-mono overflow-hidden`}>
        <Container>
          <section className='relative flex-1 overflow-y-auto px-2 md:px-3 lg:px-4'>{children}</section>
          <Navbar />
        </Container>
        <Particles />
        <ResponsiveIndicator />
        <div className='fixed h-[300%] w-[300%] bg-grain-noise opacity-5 animate-grain pointer-events-none top-0' aria-hidden='true' />
        <div className='bg-grid-pattern absolute left-0 top-0 h-full w-full' />
        {process.env.NODE_ENV === 'production' && <Script defer src='https://umami.wiscaksono.com/script.js' data-website-id='1f3b0505-7366-47bd-8757-95ad25395088' />}
      </body>
    </html>
  )
}
