import { MetadataRoute } from 'next'
import { PROJECTS } from '@/lib/data'

const BASE_URL = 'https://darshanjoshi.tech'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,   // homepage = maximum priority
    },
    {
      url: `${BASE_URL}/publications`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.95,  // publications = very high (academic credibility)
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/education`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/resume`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
  ]

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: `${BASE_URL}/projects/${project.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...projectRoutes]
}
