import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://darshanjoshi.tech/sitemap.xml',
    host: 'https://darshanjoshi.tech',
  }
}
