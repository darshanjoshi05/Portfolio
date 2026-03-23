import { notFound } from 'next/navigation'
import { PROJECTS } from '@/lib/data'
import ProjectDetail from './ProjectDetail'

export async function generateStaticParams(): Promise<{ id: string }[]> {
  return PROJECTS.map(p => ({ id: p.id }))
}

const BASE_URL = 'https://darshanjoshi.tech'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = PROJECTS.find(p => p.id === id)
  if (!project) return {}
  return {
    title: `${project.name} — ${project.tagline}`,
    description: project.description,
    keywords: [...project.stack, 'Darshan Joshi', project.name, ...project.category],
    alternates: { canonical: `${BASE_URL}/projects/${project.id}` },
    openGraph: {
      title: `${project.name} | Darshan Joshi`,
      description: project.description,
      url: `${BASE_URL}/projects/${project.id}`,
      type: 'article',
    },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = PROJECTS.find(p => p.id === id)
  if (!project) notFound()
  return <ProjectDetail project={project} />
}
