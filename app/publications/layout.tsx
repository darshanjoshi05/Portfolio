import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Research & Publications',
  description: '4 research publications spanning enterprise cybersecurity, AI classroom behavior detection (YOLOv8), earthquake prediction (CNN-LSTM), and NLP resume generation.',
}
export default function PublicationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
