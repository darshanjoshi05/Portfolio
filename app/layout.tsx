import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const BASE_URL = 'https://darshanjoshi.tech'
const FULL_NAME = 'Darshan Joshi'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Darshan Joshi — AI Engineer | Computer Vision & NLP',
    template: '%s | Darshan Joshi',
  },
  description:
    'Darshan Joshi is an AI Engineer and MS Computer Science graduate (GPA 3.75/4.0) at Lawrence Technological University. Specializes in Computer Vision (YOLOv8), NLP, FastAPI, PyTorch, and Cybersecurity. 4 peer-reviewed publications. EC-Council certified. Research Assistant at Lawrence Tech.',
  keywords: [
    'Darshan Joshi',
    'Darshan Joshi AI Engineer',
    'Darshan Joshi Lawrence Technological University',
    'Darshan Joshi Computer Vision',
    'Darshan Joshi NLP',
    'Darshan Joshi YOLOv8',
    'Darshan Joshi research',
    'Darshan Joshi portfolio',
    'Darshan Joshi Southfield Michigan',
    'AI Engineer',
    'Computer Vision Engineer',
    'Machine Learning Engineer',
    'YOLOv8',
    'PyTorch',
    'FastAPI',
    'NLP Engineer',
    'Cybersecurity',
    'Grad-CAM',
    'Deep Learning',
    'Lawrence Technological University',
    'MS Computer Science',
    'Research Publications',
    'AI Researcher Michigan',
  ],
  authors: [
    { name: 'Darshan Joshi', url: BASE_URL },
    { name: 'Darshan Joshi', url: 'https://www.linkedin.com/in/darshanjoshi05' },
  ],
  creator: 'Darshan Joshi',
  publisher: 'Darshan Joshi',
  category: 'technology',
  classification: 'AI Engineer Portfolio',
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: 'profile',
    firstName: 'Darshan',
    lastName: 'Joshi',
    username: 'darshanjoshi05',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Darshan Joshi',
    title: 'Darshan Joshi — AI Engineer | Computer Vision & NLP',
    description:
      'Darshan Joshi — AI Engineer specializing in Computer Vision (YOLOv8), NLP, and Cybersecurity. MS CS at Lawrence Technological University. 4 peer-reviewed publications.',
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Darshan Joshi — AI Engineer',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Darshan Joshi — AI Engineer | Computer Vision & NLP',
    description:
      'Darshan Joshi · AI Engineer · Computer Vision · NLP · Cybersecurity · 4 Publications · MS CS @ Lawrence Tech · Southfield, MI',
    images: [`${BASE_URL}/og-image.jpg`],
    creator: '@darshanjoshi05',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  // After Google Search Console verification, uncomment + add your token:
  // verification: { google: 'PASTE_TOKEN_HERE' },
}

// ─── JSON-LD Structured Data ──────────────────────────────────────────────────
// These schemas tell Google exactly who Darshan Joshi is across Knowledge Graph

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${BASE_URL}/#person`,
  name: FULL_NAME,
  givenName: 'Darshan',
  familyName: 'Joshi',
  url: BASE_URL,
  image: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/photo.jpg`,
    width: 400,
    height: 400,
  },
  jobTitle: 'AI Engineer',
  description:
    'Darshan Joshi is an AI Engineer and researcher specializing in Computer Vision (YOLOv8), NLP, FastAPI, and Cybersecurity. MS Computer Science at Lawrence Technological University with a 3.75 GPA. Research Assistant building real-time behavior detection systems. 4 peer-reviewed publications.',
  email: 'joshidarshan193@gmail.com',
  telephone: '+1-947-240-5099',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Southfield',
    addressRegion: 'MI',
    postalCode: '48075',
    addressCountry: 'US',
  },
  nationality: {
    '@type': 'Country',
    name: 'India',
  },
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'Lawrence Technological University',
      url: 'https://www.ltu.edu',
      address: { '@type': 'PostalAddress', addressLocality: 'Southfield', addressRegion: 'MI', addressCountry: 'US' },
    },
    {
      '@type': 'CollegeOrUniversity',
      name: 'Sree Dattha Institute of Engineering & Science',
      address: { '@type': 'PostalAddress', addressLocality: 'Hyderabad', addressCountry: 'IN' },
    },
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Lawrence Technological University',
    url: 'https://www.ltu.edu',
  },
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Master of Science, Computer Science Engineering',
      credentialCategory: 'degree',
      recognizedBy: { '@type': 'Organization', name: 'Lawrence Technological University' },
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Network Defense Essentials',
      credentialCategory: 'certification',
      recognizedBy: { '@type': 'Organization', name: 'EC-Council' },
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Ethical Hacking Essentials',
      credentialCategory: 'certification',
      recognizedBy: { '@type': 'Organization', name: 'EC-Council' },
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Digital Forensics Essentials',
      credentialCategory: 'certification',
      recognizedBy: { '@type': 'Organization', name: 'EC-Council' },
    },
  ],
  knowsAbout: [
    'Computer Vision',
    'YOLOv8',
    'PyTorch',
    'Natural Language Processing',
    'FastAPI',
    'Cybersecurity',
    'Deep Learning',
    'Machine Learning',
    'Grad-CAM Explainability',
    'Object Detection',
    'Seismic Prediction',
    'CNN-LSTM Neural Networks',
    'Buffer Overflow Analysis',
    'REST API Development',
  ],
  knowsLanguage: [
    { '@type': 'Language', name: 'English' },
    { '@type': 'Language', name: 'Hindi' },
    { '@type': 'Language', name: 'Telugu' },
  ],
  sameAs: [
    'https://www.linkedin.com/in/darshanjoshi05',
    'https://github.com/darshanjoshi05',
    'https://scholar.google.com/scholar?q=Darshan+Joshi+AI+Engineer',
    'https://www.ijaresm.com/uploaded_files/document_file/Darshan_Joshi9Suj.pdf',
    'https://www.sciencepublishinggroup.com/article/10.11648/j.ajce.20251305.14',
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  name: 'Darshan Joshi',
  alternateName: 'Darshan Joshi Portfolio',
  url: BASE_URL,
  description:
    'Official portfolio of Darshan Joshi — AI Engineer specializing in Computer Vision, NLP, and Cybersecurity. Lawrence Technological University MS CS.',
  author: { '@id': `${BASE_URL}/#person` },
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${BASE_URL}/projects?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
  inLanguage: 'en-US',
}

// ScholarlyArticle schemas for published papers — massive SEO signal
const scholarlyArticles = [
  {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: 'Design and Analysis of Cyber Security Infrastructure in Large Enterprises and Organisations',
    author: { '@id': `${BASE_URL}/#person` },
    name: 'Darshan Joshi — Cybersecurity Infrastructure Research',
    publisher: { '@type': 'Organization', name: 'IJARESM', url: 'https://www.ijaresm.com' },
    datePublished: '2023',
    url: 'https://www.ijaresm.com/uploaded_files/document_file/Darshan_Joshi9Suj.pdf',
    about: 'Enterprise Cybersecurity Architecture',
    keywords: ['Cybersecurity', 'Enterprise Architecture', 'IDS/IPS', 'SIEM', 'Risk Mitigation'],
    inLanguage: 'en',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: 'Earthquake Prediction and Synthetic Seismogram Generation Using Hybrid CNN-LSTM Model',
    author: { '@id': `${BASE_URL}/#person` },
    name: 'Darshan Joshi — CNN-LSTM Earthquake Prediction',
    publisher: { '@type': 'Organization', name: 'American Journal of Civil Engineering', url: 'https://www.sciencepublishinggroup.com' },
    datePublished: '2025',
    url: 'https://www.sciencepublishinggroup.com/article/10.11648/j.ajce.20251305.14',
    sameAs: 'https://doi.org/10.11648/j.ajce.20251305.14',
    about: 'Deep Learning for Seismic Prediction',
    keywords: ['CNN', 'LSTM', 'Earthquake Prediction', 'Deep Learning', 'Seismogram'],
    inLanguage: 'en',
  },
]

const profilePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${BASE_URL}/#profilepage`,
  name: 'Darshan Joshi — AI Engineer Portfolio',
  url: BASE_URL,
  mainEntity: { '@id': `${BASE_URL}/#person` },
  dateCreated: '2024-01-01',
  dateModified: new Date().toISOString().split('T')[0],
  description: 'Portfolio and professional profile of Darshan Joshi, AI Engineer at Lawrence Technological University.',
  inLanguage: 'en-US',
  isPartOf: { '@id': `${BASE_URL}/#website` },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,900;1,700&family=Syne:wght@600;700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

        {/* Core identity schemas */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }} />

        {/* Published paper schemas — signal authorship to Google */}
        {scholarlyArticles.map((article, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
        ))}
      </head>
      <body className="bg-bg font-mono antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
