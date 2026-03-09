import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Projects',
  description: 'AI, computer vision, NLP, backend, and cybersecurity projects — YOLOv8 behavior detection, FastAPI resume generation, buffer overflow security research, and more.',
}
export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
