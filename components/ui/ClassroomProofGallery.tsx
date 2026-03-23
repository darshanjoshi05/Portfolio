'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Tab = 'metrics' | 'predictions' | 'training' | 'confusion'

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'metrics',    label: 'Training Curves', icon: '📈' },
  { id: 'predictions', label: 'Live Predictions', icon: '🎯' },
  { id: 'training',   label: 'Train Batches',   icon: '🏋️' },
  { id: 'confusion',  label: 'Confusion Matrix', icon: '🔬' },
]

// Per-class stats from the PR curve
const CLASS_STATS = [
  { name: 'Sleeping',      ap: 94.8, color: '#34d399' },
  { name: 'Using Phone',   ap: 88.8, color: '#00d4ff' },
  { name: 'Reading',       ap: 68.8, color: '#a78bfa' },
  { name: 'Hand Raising',  ap: 66.3, color: '#f59e0b' },
  { name: 'Writing',       ap: 49.5, color: '#f87171' },
]

export default function ClassroomProofGallery() {
  const [activeTab, setActiveTab] = useState<Tab>('metrics')
  const [lightbox, setLightbox] = useState<string | null>(null)
  const [predPair, setPredPair] = useState(0) // 0,1,2

  return (
    <div className="border border-white/[0.08] overflow-hidden" style={{ background: 'var(--surface)' }}>

      {/* Header stat strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-white/[0.06]" style={{ background: 'var(--bg)' }}>
        {[
          { val: '74.85%', label: 'mAP@0.5',       sub: 'Best epoch 24',        col: '#00d4ff' },
          { val: '94.8%',  label: 'Sleeping AP',    sub: 'Highest class',        col: '#34d399' },
          { val: '88.8%',  label: 'Phone AP',       sub: 'Using phone class',    col: '#a78bfa' },
          { val: '150',    label: 'Epochs',          sub: 'A100 · Colab Pro',     col: '#f59e0b' },
        ].map((s, i) => (
          <div key={i} className={`px-4 py-4 text-center ${i > 0 ? 'border-l border-white/[0.06]' : ''}`}>
            <div className="font-serif text-xl sm:text-2xl font-bold" style={{ color: s.col }}>{s.val}</div>
            <div className="text-[0.62rem] tracking-[0.1em] uppercase text-muted mt-0.5">{s.label}</div>
            <div className="text-[0.55rem] text-muted/50 mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/[0.06] overflow-x-auto" style={{ background: 'var(--bg)' }}>
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 sm:px-6 py-3 text-[0.65rem] tracking-[0.1em] uppercase font-mono whitespace-nowrap transition-all border-b-2 ${
              activeTab === tab.id
                ? 'border-accent text-accent'
                : 'border-transparent text-muted hover:text-accent/70'
            }`}>
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}>

          {/* ── Training Curves ── */}
          {activeTab === 'metrics' && (
            <div className="p-4 sm:p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Main results chart */}
                <div className="lg:col-span-2 border border-white/[0.06] overflow-hidden group cursor-pointer"
                  onClick={() => setLightbox('/classroom-proofs/results.png')}>
                  <div className="relative">
                    <div className="absolute top-2 left-2 z-10 text-[0.58rem] tracking-[0.1em] uppercase px-2 py-1 border border-white/[0.1] text-muted/70 font-mono" style={{ background: 'var(--bg)' }}>
                      Training & Validation Curves · 150 epochs
                    </div>
                    <div className="absolute top-2 right-2 z-10 text-[0.58rem] text-muted/50 px-2 py-1" style={{ background: 'var(--bg)' }}>
                      Click to expand
                    </div>
                    {/* White bg needed for matplotlib chart */}
                    <div style={{ background: '#ffffff', padding: 4 }}>
                      <img src="/classroom-proofs/results.png" alt="Training curves"
                        className="w-full group-hover:scale-[1.01] transition-transform duration-300" />
                    </div>
                  </div>
                </div>

                {/* Per-class AP breakdown */}
                <div className="border border-white/[0.06] p-5" style={{ background: 'var(--bg)' }}>
                  <div className="text-[0.62rem] tracking-[0.15em] uppercase text-accent mb-4">Per-Class AP</div>
                  <div className="space-y-4">
                    {CLASS_STATS.map(cls => (
                      <div key={cls.name}>
                        <div className="flex justify-between text-[0.68rem] mb-1.5">
                          <span className="text-muted">{cls.name}</span>
                          <span className="font-mono" style={{ color: cls.color }}>{cls.ap}%</span>
                        </div>
                        <div className="h-[4px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${cls.ap}%` }}
                            transition={{ duration: 1.0, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            style={{ height: '100%', background: cls.color, borderRadius: 4 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 pt-4 border-t border-white/[0.05]">
                    <div className="text-[0.58rem] uppercase text-muted mb-1 tracking-[0.12em]">Overall mAP@0.5</div>
                    <div className="font-serif text-2xl font-bold text-accent">74.85%</div>
                    <div className="text-[0.58rem] text-muted/50 mt-0.5">Best at epoch 24 / 150</div>
                  </div>
                </div>
              </div>

              {/* PR curve */}
              <div className="border border-white/[0.06] overflow-hidden cursor-pointer group"
                onClick={() => setLightbox('/classroom-proofs/BoxPR_curve.png')}>
                <div className="text-[0.6rem] tracking-[0.12em] uppercase text-muted px-4 pt-3 pb-1">Precision-Recall Curve</div>
                <div style={{ background: '#ffffff', padding: 4 }}>
                  <img src="/classroom-proofs/BoxPR_curve.png" alt="PR Curve"
                    className="w-full max-h-[280px] object-contain group-hover:scale-[1.01] transition-transform duration-300" />
                </div>
              </div>
            </div>
          )}

          {/* ── Live Predictions ── */}
          {activeTab === 'predictions' && (
            <div className="p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-[0.65rem] tracking-[0.12em] uppercase text-muted">
                  Validation batch predictions — model output on unseen data
                </div>
                <div className="flex gap-2">
                  {[0,1,2].map(i => (
                    <button key={i} onClick={() => setPredPair(i)}
                      className={`text-[0.6rem] px-3 py-1.5 border font-mono transition-all ${
                        predPair === i ? 'border-accent text-accent bg-accent/10' : 'border-white/[0.08] text-muted hover:border-accent/40'
                      }`}>
                      Batch {i+1}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Ground truth */}
                <div className="border border-white/[0.06] overflow-hidden cursor-pointer group"
                  onClick={() => setLightbox(`/classroom-proofs/val_batch${predPair}_labels.jpg`)}>
                  <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.06]" style={{ background: 'var(--bg)' }}>
                    <span className="text-[0.62rem] tracking-[0.1em] uppercase text-muted">Ground Truth</span>
                    <span className="text-[0.55rem] px-2 py-0.5 border border-[#34d399]/30 text-[#34d399]">Labels</span>
                  </div>
                  <img src={`/classroom-proofs/val_batch${predPair}_labels.jpg`}
                    alt="Ground truth labels"
                    className="w-full group-hover:scale-[1.01] transition-transform duration-300" />
                </div>
                {/* Predictions */}
                <div className="border border-white/[0.06] overflow-hidden cursor-pointer group"
                  onClick={() => setLightbox(`/classroom-proofs/val_batch${predPair}_pred.jpg`)}>
                  <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.06]" style={{ background: 'var(--bg)' }}>
                    <span className="text-[0.62rem] tracking-[0.1em] uppercase text-muted">Model Predictions</span>
                    <span className="text-[0.55rem] px-2 py-0.5 border border-accent/30 text-accent">YOLOv8x</span>
                  </div>
                  <img src={`/classroom-proofs/val_batch${predPair}_pred.jpg`}
                    alt="Model predictions"
                    className="w-full group-hover:scale-[1.01] transition-transform duration-300" />
                </div>
              </div>
              <div className="text-[0.6rem] text-muted/50 text-center">Click any image to expand · Use batch selector to browse</div>
            </div>
          )}

          {/* ── Training Batches ── */}
          {activeTab === 'training' && (
            <div className="p-4 sm:p-6">
              <div className="text-[0.65rem] tracking-[0.12em] uppercase text-muted mb-4">
                Training data samples — SCB-05 dataset via Roboflow · YOLOv8x A100
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[0,1,2].map(i => (
                  <div key={i} className="border border-white/[0.06] overflow-hidden cursor-pointer group"
                    onClick={() => setLightbox(`/classroom-proofs/train_batch${i}.jpg`)}>
                    <div className="px-3 py-2 border-b border-white/[0.06] text-[0.6rem] tracking-[0.1em] uppercase text-muted/70" style={{ background: 'var(--bg)' }}>
                      Batch {i}
                    </div>
                    <img src={`/classroom-proofs/train_batch${i}.jpg`}
                      alt={`Training batch ${i}`}
                      className="w-full group-hover:scale-[1.01] transition-transform duration-300" />
                  </div>
                ))}
              </div>
              <div className="mt-4 border border-white/[0.06] overflow-hidden cursor-pointer group"
                onClick={() => setLightbox('/classroom-proofs/labels.jpg')}>
                <div className="px-3 py-2 border-b border-white/[0.06] text-[0.6rem] tracking-[0.1em] uppercase text-muted/70" style={{ background: 'var(--bg)' }}>
                  Dataset Label Distribution
                </div>
                <div style={{ background: '#ffffff', padding: 4 }}>
                  <img src="/classroom-proofs/labels.jpg" alt="Label distribution"
                    className="w-full max-h-[240px] object-contain group-hover:scale-[1.01] transition-transform duration-300" />
                </div>
              </div>
            </div>
          )}

          {/* ── Confusion Matrix ── */}
          {activeTab === 'confusion' && (
            <div className="p-4 sm:p-6 space-y-4">
              <div className="text-[0.65rem] tracking-[0.12em] uppercase text-muted mb-2">
                Normalized confusion matrix — how well each behavior class is distinguished
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-white/[0.06] overflow-hidden cursor-pointer group"
                  onClick={() => setLightbox('/classroom-proofs/confusion_matrix_normalized.png')}>
                  <div className="px-4 py-2 border-b border-white/[0.06] text-[0.6rem] tracking-[0.1em] uppercase text-muted/70" style={{ background: 'var(--bg)' }}>
                    Normalized · Click to expand
                  </div>
                  <div style={{ background: '#ffffff', padding: 4 }}>
                    <img src="/classroom-proofs/confusion_matrix_normalized.png"
                      alt="Confusion matrix normalized"
                      className="w-full group-hover:scale-[1.01] transition-transform duration-300" />
                  </div>
                </div>
                <div className="border border-white/[0.06] overflow-hidden cursor-pointer group"
                  onClick={() => setLightbox('/classroom-proofs/confusion_matrix.png')}>
                  <div className="px-4 py-2 border-b border-white/[0.06] text-[0.6rem] tracking-[0.1em] uppercase text-muted/70" style={{ background: 'var(--bg)' }}>
                    Raw counts · Click to expand
                  </div>
                  <div style={{ background: '#ffffff', padding: 4 }}>
                    <img src="/classroom-proofs/confusion_matrix.png"
                      alt="Confusion matrix"
                      className="w-full group-hover:scale-[1.01] transition-transform duration-300" />
                  </div>
                </div>
              </div>

              {/* Key insights from the confusion matrix */}
              <div className="border border-white/[0.06] p-5 space-y-3" style={{ background: 'var(--bg)' }}>
                <div className="text-[0.62rem] tracking-[0.15em] uppercase text-accent mb-3">Key Findings</div>
                {[
                  { icon: '✓', col: '#34d399', text: 'Sleeping: 93% accuracy — model perfectly distinguishes resting posture' },
                  { icon: '✓', col: '#00d4ff', text: 'Using phone: 90% accuracy — device occlusion doesn\'t fool the model' },
                  { icon: '→', col: '#f59e0b', text: 'Writing vs Reading: some confusion due to similar desk-facing posture' },
                  { icon: '→', col: '#a78bfa', text: 'Background FP: model occasionally flags empty chairs (known challenge)' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-[0.75rem] text-muted">
                    <span className="shrink-0 mt-0.5" style={{ color: item.col }}>{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.92)' }}
          onClick={() => setLightbox(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.2 }}
            className="relative max-w-5xl w-full"
            onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-10 right-0 text-white/60 hover:text-white text-[0.7rem] tracking-[0.15em] uppercase flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              Close
            </button>
            <div style={{ background: lightbox.endsWith('.png') ? '#ffffff' : undefined }}>
              <img src={lightbox} alt="Expanded view" className="w-full max-h-[85vh] object-contain" />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
