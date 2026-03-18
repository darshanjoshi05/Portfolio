import type { Metadata } from 'next'

const BASE_URL = 'https://darshanjoshi.tech'

export const metadata: Metadata = {
  title: 'Education & Skills — Darshan Joshi',
  description:
    'Darshan Joshi — MS Computer Science Engineering, Lawrence Technological University (GPA 3.75/4.0). BE Computer Science, Sree Dattha Institute. 5 EC-Council cybersecurity certifications. Skills: Python, YOLOv8, PyTorch, FastAPI, NLP, OpenCV, GDB, SQL.',
  keywords: [
    'Darshan Joshi education',
    'Darshan Joshi Lawrence Tech',
    'Darshan Joshi GPA 3.75',
    'Darshan Joshi EC-Council',
    'Darshan Joshi certifications',
    'Darshan Joshi skills',
    'Darshan Joshi Python',
    'Darshan Joshi PyTorch',
  ],
  alternates: { canonical: `${BASE_URL}/education` },
  openGraph: {
    title: 'Education & Skills — Darshan Joshi',
    description: 'MS CS at Lawrence Technological University (GPA 3.75). 5 EC-Council certs. Full skills breakdown.',
    url: `${BASE_URL}/education`,
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Darshan Joshi', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Education & Skills', item: `${BASE_URL}/education` },
  ],
}

export default function EducationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  )
}
