'use client'
import { useEffect, useState } from 'react'

export default function ProgressBar() {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100
      setWidth(Math.min(pct, 100))
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className="fixed top-0 left-0 z-[200] h-[2px] bg-gradient-to-r from-accent via-accent2 to-accent3 transition-[width] duration-75"
      style={{ width: `${width}%` }} />
  )
}
