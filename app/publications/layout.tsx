import type { Metadata } from 'next'

const BASE_URL = 'https://darshanjoshi.tech'

export const metadata: Metadata = {
  title: 'Research & Publications — Darshan Joshi',
  description:
    'Darshan Joshi has 5 peer-reviewed publications spanning enterprise cybersecurity infrastructure (IJARESM 2023), AI classroom behavior detection with YOLOv8 (IJSRST), CNN-LSTM earthquake prediction (American Journal of Civil Engineering, 2025), NLP-driven resume generation, and new research.',
  keywords: [
    'Darshan Joshi publications',
    'Darshan Joshi research papers',
    'Darshan Joshi IJARESM',
    'Darshan Joshi cybersecurity paper',
    'Darshan Joshi YOLOv8 paper',
    'Darshan Joshi earthquake prediction CNN LSTM',
    'Darshan Joshi American Journal Civil Engineering',
    'Darshan Joshi NLP research',
    'Darshan Joshi new publication',
    'YOLOv8 classroom behavior detection',
    'CNN-LSTM earthquake prediction',
  ],
  alternates: { canonical: `${BASE_URL}/publications` },
  openGraph: {
    title: 'Research & Publications — Darshan Joshi',
    description: '5 peer-reviewed papers by Darshan Joshi in cybersecurity, computer vision, seismic deep learning, NLP, and new research.',
    url: `${BASE_URL}/publications`,
    type: 'article',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Darshan Joshi', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Research & Publications', item: `${BASE_URL}/publications` },
  ],
}

export default function PublicationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  )
}
