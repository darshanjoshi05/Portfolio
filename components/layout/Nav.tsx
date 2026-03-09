'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { href: '/', label: 'Home', num: '00' },
  { href: '/#about', label: 'About', num: '01' },
  { href: '/#experience', label: 'Experience', num: '02' },
  { href: '/projects', label: 'Projects', num: '03' },
  { href: '/education', label: 'Education', num: '04' },
  { href: '/publications', label: 'Research', num: '05' },
  { href: '/contact', label: 'Contact', num: '06' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between border-b border-white/[0.05] backdrop-blur-xl bg-[rgba(5,8,16,0.8)] transition-all duration-300 ${scrolled ? 'px-6 md:px-16 py-3' : 'px-6 md:px-16 py-5'}`}>
        {/* Logo */}
        <Link href="/" className="font-sans font-black text-accent text-lg tracking-tight hover:opacity-80 transition-opacity">
          DJ
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-5 lg:gap-7 list-none">
          {links.slice(1).map(l => (
            <li key={l.href} className={l.label === 'Experience' || l.label === 'Research' ? 'hidden lg:block' : ''}>
              <Link
                href={l.href}
                className={`text-[0.68rem] tracking-[0.12em] uppercase transition-colors relative group whitespace-nowrap ${pathname === l.href ? 'text-accent' : 'text-muted hover:text-accent'}`}
              >
                {l.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${pathname === l.href ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            </li>
          ))}
          <li>
            <Link href="/contact" className="clip-btn bg-accent text-black font-sans font-bold text-[0.68rem] tracking-[0.1em] uppercase px-4 lg:px-5 py-2 hover:shadow-[0_6px_28px_rgba(0,212,255,0.4)] hover:-translate-y-px transition-all whitespace-nowrap">
              Hire Me
            </Link>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(v => !v)}
          className="md:hidden flex flex-col gap-[5px] p-1 z-[201]"
          aria-label="Menu"
        >
          <span className={`block w-[26px] h-[2px] bg-accent transition-all duration-300 origin-center ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`block w-[26px] h-[2px] bg-accent transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block w-[26px] h-[2px] bg-accent transition-all duration-300 origin-center ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[149] md:hidden"
            />
            <motion.div
              initial={{ x: '110%' }} animate={{ x: 0 }} exit={{ x: '110%' }}
              transition={{ type: 'tween', duration: 0.38 }}
              className="fixed top-0 right-0 bottom-0 w-[min(300px,82vw)] bg-[rgba(5,8,16,0.97)] backdrop-blur-3xl border-l border-white/[0.06] z-[150] flex flex-col justify-center px-10 py-20 md:hidden"
            >
              <ul className="list-none flex flex-col gap-8">
                {links.map(l => (
                  <li key={l.href}>
                    <Link href={l.href} onClick={() => setOpen(false)}
                      className="flex items-center gap-3 font-sans font-bold text-xl uppercase tracking-wide text-muted hover:text-accent transition-colors">
                      <span className="text-[0.62rem] text-accent font-mono font-normal">{l.num}</span>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
