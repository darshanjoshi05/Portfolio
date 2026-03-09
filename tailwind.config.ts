import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#050810',
        surface: '#0c1120',
        surface2: '#111827',
        accent: '#00d4ff',
        accent2: '#7c3aed',
        accent3: '#f59e0b',
        muted: '#6b7fa3',
        'border-dim': 'rgba(100,180,255,0.08)',
        'border-bright': 'rgba(100,180,255,0.18)',
      },
      fontFamily: {
        mono: ['"DM Mono"', 'monospace'],
        serif: ['Fraunces', 'serif'],
        sans: ['Syne', 'sans-serif'],
      },
      animation: {
        'blink': 'blink 1.5s infinite',
        'float': 'float 6s ease-in-out infinite',
        'fadeUp': 'fadeUp 0.8s ease both',
        'scanline': 'scanline 3s linear infinite',
      },
      keyframes: {
        blink: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        fadeUp: { 'from': { opacity: '0', transform: 'translateY(30px)' }, 'to': { opacity: '1', transform: 'translateY(0)' } },
        scanline: { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(100vh)' } },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
export default config
