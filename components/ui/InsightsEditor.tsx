'use client'
import { useState, useEffect, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'

interface Props { projectId: string; defaultValue: string }

export default function InsightsEditor({ projectId, defaultValue }: Props) {
  const storageKey = `insights_${projectId}`
  const [value, setValue] = useState(defaultValue)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) setValue(saved)
    } catch { /* localStorage unavailable — use default */ }
  }, [storageKey])

  const save = useCallback(() => {
    try {
      localStorage.setItem(storageKey, value)
    } catch { /* localStorage unavailable */ }
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2500)
  }, [storageKey, value])

  return (
    <div className="border border-white/[0.08] overflow-hidden insights-editor-wrap" style={{ background: 'var(--surface)', borderColor: 'rgba(var(--border-color, 255,255,255), 0.08)' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
        <div className="text-[0.7rem] tracking-[0.15em] uppercase text-accent flex items-center gap-2">
          <span>✎</span> Personal Notes &amp; Learnings
        </div>
        <div className="flex gap-2">
          <button onClick={() => setValue('')}
            className="text-[0.62rem] tracking-[0.08em] uppercase px-3 py-1 border border-white/[0.08] text-muted hover:border-accent/50 hover:text-accent font-mono transition-all">
            Clear
          </button>
          <button onClick={() => setValue(defaultValue)}
            className="text-[0.62rem] tracking-[0.08em] uppercase px-3 py-1 border border-white/[0.08] text-muted hover:border-accent/50 hover:text-accent font-mono transition-all">
            Reset
          </button>
          <button onClick={save}
            className="text-[0.62rem] tracking-[0.08em] uppercase px-4 py-1 bg-accent text-black font-sans font-bold hover:shadow-[0_4px_20px_rgba(0,212,255,0.35)] transition-all">
            Save ✓
          </button>
        </div>
      </div>

      {/* Split pane */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[340px]">
        {/* Editor */}
        <div className="border-b md:border-b-0 md:border-r border-white/[0.06]">
          <div className="text-[0.58rem] tracking-[0.15em] uppercase text-muted px-4 py-2 border-b border-white/[0.04]">
            Markdown Editor
          </div>
          <textarea
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="### What I Learned&#10;&#10;Write your insights here...&#10;&#10;Use **bold**, *italic*, `code`&#10;&#10;- Insight 1&#10;- Insight 2"
            className="w-full h-[290px] bg-transparent border-none outline-none resize-none font-mono text-[0.76rem] leading-[1.85]p-4 placeholder:text-muted/50"
          />
        </div>

        {/* Preview */}
        <div>
          <div className="text-[0.58rem] tracking-[0.15em] uppercase text-muted px-4 py-2 border-b border-white/[0.04]">
            Live Preview
          </div>
          <div className="p-4 h-[290px] overflow-y-auto md-preview">
            {value ? (
              <ReactMarkdown>{value}</ReactMarkdown>
            ) : (
              <p className="text-muted/50 italic text-[0.75rem]">Start typing to preview...</p>
            )}
          </div>
        </div>
      </div>

      {/* Toast */}
      <div className={`fixed bottom-8 right-8 bg-accent/10 border border-accent/40 text-accent px-5 py-3 text-[0.7rem] tracking-[0.1em] uppercase z-50 transition-all duration-300 ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
        ✓ Insights saved locally
      </div>
    </div>
  )
}
