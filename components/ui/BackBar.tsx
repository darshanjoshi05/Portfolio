'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface BackBarProps {
  label?: string
  href?: string
  section?: string
}

export default function BackBar({ label = 'Back', href = '/', section }: BackBarProps) {
  const router = useRouter()

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push(href)
    }
  }

  return (
    <>
      {/* Fixed bar — sits below Nav */}
      <div
        className="fixed left-0 right-0 z-[90] border-b border-white/[0.05] backdrop-blur-md"
        style={{
          top: '56px',
          background: 'color-mix(in srgb, var(--bg) 88%, transparent)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16 h-9 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-[0.62rem] tracking-[0.12em] uppercase text-muted hover:text-accent transition-colors group"
          >
            <svg
              width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
              className="transition-transform group-hover:-translate-x-0.5"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            {label}
          </button>

          {section && (
            <span className="text-[0.58rem] tracking-[0.15em] uppercase text-muted/40 hidden sm:block">
              {section}
            </span>
          )}
        </div>
      </div>

      {/* Spacer — pushes ALL page content below both Nav (56px) + BackBar (36px) = 92px */}
      <div style={{ height: '92px' }} aria-hidden="true" />
    </>
  )
}
