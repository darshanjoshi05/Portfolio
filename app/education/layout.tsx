import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Education & Skills',
  description: 'MS Computer Science at Lawrence Technological University (GPA 3.75). 5 EC-Council cybersecurity certifications. Full technical skills breakdown.',
}
export default function EducationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
