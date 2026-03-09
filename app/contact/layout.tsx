import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Darshan Joshi — open to AI Engineer, ML Engineer, and backend engineering roles. Responds within 24 hours.',
}
export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
