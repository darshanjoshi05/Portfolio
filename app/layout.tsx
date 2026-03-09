import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Darshan Joshi — AI Engineer',
    template: '%s | Darshan Joshi',
  },
  description: 'AI Engineer specializing in Computer Vision (YOLOv8), NLP, FastAPI, and Cybersecurity. MS Computer Science at Lawrence Technological University. 4 research publications.',
  keywords: ['AI Engineer', 'Computer Vision', 'YOLOv8', 'PyTorch', 'FastAPI', 'NLP', 'Cybersecurity', 'Machine Learning', 'Research', 'Portfolio'],
  authors: [{ name: 'Darshan Joshi', url: 'https://linkedin.com/in/darshanjoshi05' }],
  creator: 'Darshan Joshi',
  metadataBase: new URL('https://darshanjoshi.dev'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://darshanjoshi.dev',
    siteName: 'Darshan Joshi Portfolio',
    title: 'Darshan Joshi — AI Engineer',
    description: 'AI Engineer · Computer Vision · NLP · Cybersecurity · 4 Research Publications · MS Computer Science',
    images: [{ url: '/photo.jpg', width: 900, height: 1200, alt: 'Darshan Joshi' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Darshan Joshi — AI Engineer',
    description: 'AI Engineer · Computer Vision · NLP · Cybersecurity · 4 Research Publications',
    images: ['/photo.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,900;1,700&family=Syne:wght@600;700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-bg text-[#e8f0fe] font-mono antialiased">
        {children}
      </body>
    </html>
  )
}
