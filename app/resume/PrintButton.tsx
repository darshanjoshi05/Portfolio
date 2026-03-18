'use client'

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="flex items-center gap-2 text-[0.68rem] tracking-[0.12em] uppercase text-accent border border-accent/30 px-4 py-1.5 hover:bg-accent/10 transition-all font-sans font-bold"
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
      </svg>
      Download PDF
    </button>
  )
}
