import { notFound } from 'next/navigation'
import { PROJECTS } from '@/lib/data'
import ProjectDetail from './ProjectDetail'

export async function generateStaticParams() {
  return PROJECTS.map(p => ({ id: p.id }))
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const project = PROJECTS.find(p => p.id === params.id)
  if (!project) return {}
  return {
    title: `${project.name} — Darshan Joshi`,
    description: project.description,
  }
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = PROJECTS.find(p => p.id === params.id)
  if (!project) notFound()
  return <ProjectDetail project={project} />
}
