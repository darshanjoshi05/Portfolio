import type { Metadata } from 'next'

const BASE_URL = 'https://darshanjoshi.tech'

export const metadata: Metadata = {
  title: 'Contact Darshan Joshi — AI Engineer',
  description:
    'Contact Darshan Joshi — AI Engineer open to full-time, contract, and research roles in AI engineering, computer vision, NLP, and cybersecurity. Based in Southfield, Michigan. Responds within 24 hours.',
  keywords: [
    'contact Darshan Joshi',
    'hire Darshan Joshi',
    'Darshan Joshi email',
    'Darshan Joshi LinkedIn',
    'Darshan Joshi AI engineer jobs',
    'AI engineer Michigan',
    'ML engineer Southfield',
  ],
  alternates: { canonical: `${BASE_URL}/contact` },
  openGraph: {
    title: 'Contact Darshan Joshi',
    description: 'Get in touch with Darshan Joshi — AI Engineer available for new opportunities.',
    url: `${BASE_URL}/contact`,
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Darshan Joshi', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: `${BASE_URL}/contact` },
  ],
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  )
}
