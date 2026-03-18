import { Project } from '@/lib/data'

const COLOR_MAP: Record<string, string> = {
  blue:   'arch-blue',
  purple: 'arch-purple',
  amber:  'arch-amber',
  green:  'arch-green',
}

export default function ArchDiagram({ arch }: { arch: Project['architecture'] }) {
  // Group nodes by row
  const rows: Record<number, typeof arch.nodes> = {}
  arch.nodes.forEach(n => {
    if (!rows[n.row]) rows[n.row] = []
    rows[n.row].push(n)
  })

  return (
    <div className="border border-white/[0.08] p-8 relative overflow-hidden bg-surface-theme">
      <div className="absolute inset-0 bg-gradient-radial from-accent/[0.03] to-transparent pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center gap-2">
        {Object.entries(rows).map(([rowIdx, nodes]) => (
          <div key={rowIdx} className="flex flex-col items-center w-full gap-2">
            {/* Arrow from previous row */}
            {Number(rowIdx) > 0 && (
              <div className="text-muted/40 text-xl leading-none">↓</div>
            )}
            {/* Nodes in this row */}
            <div className="flex flex-wrap justify-center gap-3">
              {nodes.map(node => (
                <div key={node.id} className="flex flex-col items-center gap-1">
                  <div className={`border text-[0.68rem] tracking-[0.05em] px-4 py-2 text-center font-mono transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] cursor-default ${COLOR_MAP[node.color] || 'arch-blue'}`}>
                    {node.label}
                  </div>
                  <div className="text-[0.55rem] tracking-[0.08em] uppercase text-muted text-center">{node.sublabel}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
