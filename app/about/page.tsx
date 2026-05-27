import type { Metadata } from 'next'
import Link from 'next/link'

const BASE_URL = 'https://darshanjoshi.tech'

export const metadata: Metadata = {
  title: 'About Darshan Joshi — Software Engineer',
  description:
    'About Darshan Joshi — Software Engineer and MS Computer Science graduate at Lawrence Technological University. Builds AI systems, full stack applications, and backend services. Specializes in Computer Vision (YOLOv8), FastAPI, React, PyTorch, and SQL. 2 published research papers.',
  keywords: [
    'about Darshan Joshi',
    'who is Darshan Joshi',
    'Darshan Joshi Software Engineer',
    'Darshan Joshi biography',
    'Darshan Joshi background',
    'Darshan Joshi Lawrence Tech',
    'Darshan Joshi computer science',
  ],
  alternates: { canonical: `${BASE_URL}/about` },
  openGraph: {
    title: 'About Darshan Joshi',
    description: 'Software Engineer and researcher. MS CS at Lawrence Tech. 2 publications.',
    url: `${BASE_URL}/about`,
  },
}

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${BASE_URL}/about`,
  name: 'About Darshan Joshi',
  url: `${BASE_URL}/about`,
  description: 'About page for Darshan Joshi, Software Engineer and researcher at Lawrence Technological University.',
  mainEntity: {
    '@type': 'Person',
    '@id': `${BASE_URL}/#person`,
    name: 'Darshan Joshi',
  },
  isPartOf: { '@type': 'WebSite', '@id': `${BASE_URL}/#website` },
}

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
      <main style={{ maxWidth: 800, margin: '0 auto', padding: '120px 24px 80px', fontFamily: 'monospace' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--text)' }}>Darshan Joshi</h1>
        <p style={{ color: 'var(--accent)', marginBottom: '2rem', fontSize: '0.9rem' }}>
          Software Engineer · AI Systems · Full Stack · Backend
        </p>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            About
          </h2>
          <p style={{ lineHeight: 1.8, color: 'var(--muted)', marginBottom: '1rem' }}>
            Darshan Joshi is a Software Engineer and Research Assistant at Lawrence Technological University in Southfield, Michigan.
            He holds a Master of Science in Computer Science Engineering with a GPA of 3.35/4.0 and a Bachelor of Engineering in
            Computer Science from Sree Dattha Institute of Engineering and Science, Hyderabad, India.
          </p>
          <p style={{ lineHeight: 1.8, color: 'var(--muted)' }}>
            Darshan specializes in building AI systems, full stack applications, and backend services. His technical work spans
            computer vision (YOLOv8, PyTorch, Grad-CAM), FastAPI backend engineering, React frontends, database design (MySQL, 3NF),
            Docker deployment, and NLP pipelines.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Research Publications
          </h2>
          <ul style={{ lineHeight: 2.0, color: 'var(--muted)', paddingLeft: '1.2rem' }}>
            <li>Design and Analysis of Cyber Security Infrastructure in Large Enterprises and Organisations — IJARESM, 2023</li>
            <li>Earthquake Prediction and Synthetic Seismogram Generation Using Hybrid CNN-LSTM Model — American Journal of Civil Engineering, 2025</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Links
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <a href={BASE_URL} style={{ color: 'var(--accent)' }}>Portfolio — darshanjoshi.tech</a>
            <a href="https://www.linkedin.com/in/darshanjoshi05" style={{ color: 'var(--accent)' }}>LinkedIn — linkedin.com/in/darshanjoshi05</a>
            <a href="https://github.com/darshanjoshi05" style={{ color: 'var(--accent)' }}>GitHub — github.com/darshanjoshi05</a>
            <a href="https://www.ijaresm.com/uploaded_files/document_file/Darshan_Joshi9Suj.pdf" style={{ color: 'var(--accent)' }}>IJARESM Publication (2023)</a>
            <a href="https://www.sciencepublishinggroup.com/article/10.11648/j.ajce.20251305.14" style={{ color: 'var(--accent)' }}>American Journal of Civil Engineering (2025)</a>
          </div>
        </section>

        <Link href="/" style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>← Back to portfolio</Link>
      </main>
    </>
  )
}
