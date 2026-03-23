import type { Metadata } from 'next'

const BASE_URL = 'https://darshanjoshi.tech'

export const metadata: Metadata = {
  title: 'Projects — Darshan Joshi',
  description:
    'Engineering projects by Darshan Joshi — Resume Intelligence Engine (FastAPI + NLP), Classroom Behavior Detection (YOLOv8 + Grad-CAM), Buffer Overflow Security Research, Formal Language Typing Game, and Enterprise Database Architecture.',
  keywords: [
    'Darshan Joshi projects',
    'Darshan Joshi GitHub',
    'Darshan Joshi FastAPI',
    'Darshan Joshi YOLOv8 project',
    'Darshan Joshi computer vision project',
    'Darshan Joshi cybersecurity project',
    'Resume Intelligence Engine Darshan Joshi',
    'Classroom behavior detection YOLOv8',
  ],
  alternates: { canonical: `${BASE_URL}/projects` },
  openGraph: {
    title: 'Projects — Darshan Joshi',
    description: 'AI, CV, NLP, backend, and security projects by Darshan Joshi.',
    url: `${BASE_URL}/projects`,
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Darshan Joshi', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Projects', item: `${BASE_URL}/projects` },
  ],
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  )
}
