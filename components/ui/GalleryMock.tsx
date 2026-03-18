'use client'
import { useState } from 'react'

type GalleryType = 'terminal' | 'metrics' | 'json' | 'structure' | 'scores'

interface GalleryItem {
  title: string
  description: string
  type: GalleryType
  projectId?: string
}

/* ── Project-specific terminal content ── */
const TERMINAL_CONTENT: Record<string, React.ReactNode> = {
  'resume-intelligence-engine': (<>
    <div className="text-accent">$ uvicorn main:app --reload --port 8000</div>
    <div className="text-[#34d399]">INFO: Uvicorn running on http://127.0.0.1:8000</div>
    <div className="text-muted mt-1">POST /api/generate-resume HTTP/1.1</div>
    <div className="text-[#34d399]">✓ JD parsed: 14 skills extracted</div>
    <div className="text-[#34d399]">✓ Suitability score: 87.3%</div>
    <div className="text-[#34d399]">✓ Skills prioritized: [FastAPI, NLP, Python...]</div>
    <div className="text-[#34d399]">✓ Summary generated: 68 words</div>
    <div className="text-[#34d399]">✓ PDF rendered → resume_darshan_joshi.pdf</div>
    <div className="text-[#34d399]">✓ DOCX rendered → resume_darshan_joshi.docx</div>
    <div className="text-muted/60">Response time: 1.43s  Status: 200 OK</div>
  </>),
  'classroom-behavior-detection': (<>
    <div className="text-accent">$ yolo detect train data=classroom.yaml model=yolov8n.pt epochs=100</div>
    <div className="text-muted">Epoch 1/100: box_loss=3.21 cls_loss=2.18 dfl_loss=1.03</div>
    <div className="text-muted">Epoch 25/100: box_loss=1.84 cls_loss=1.12 dfl_loss=0.87</div>
    <div className="text-[#a78bfa]">Epoch 50/100: mAP50=0.64 Precision=0.71 Recall=0.68</div>
    <div className="text-[#a78bfa]">Epoch 75/100: mAP50=0.81 Precision=0.84 Recall=0.79</div>
    <div className="text-[#34d399]">Epoch 100/100: mAP50=0.91 Precision=0.89 Recall=0.87</div>
    <div className="text-[#34d399]">✓ Training complete. Best weights → runs/detect/best.pt</div>
    <div className="text-[#34d399]">✓ Grad-CAM heatmaps saved → /gradcam/outputs/</div>
  </>),
  'buffer-overflow-attack-lab': (<>
    <div className="text-accent">$ gdb -q ./vulnerable_program</div>
    <div className="text-[#34d399]">Reading symbols from ./vulnerable_program...done.</div>
    <div className="text-muted">(gdb) run $(python3 -c "print('A'*76 + '\xef\xbe\xad\xde')")</div>
    <div className="text-[#a78bfa]">Program received signal SIGSEGV, Segmentation fault.</div>
    <div className="text-muted">0xdeadbeef in ?? ()</div>
    <div className="text-[#34d399]">(gdb) x/20x $esp</div>
    <div className="text-muted/70">0xffffd620: 0x41414141 0x41414141 0xdeadbeef 0x00000000</div>
    <div className="text-[#34d399]">✓ Return address overwrite confirmed at offset 76</div>
    <div className="text-[#34d399]">✓ Shell payload injected → root access obtained</div>
  </>),
  'formal-language-typing-game': (<>
    <div className="text-accent">$ python3 main.py</div>
    <div className="text-[#34d399]">Formal Language Typing Game v1.0</div>
    <div className="text-muted">Level 1: Regular Expressions</div>
    <div className="text-muted">Pattern: <span className="text-[#a78bfa]">^(a|b)*abb$</span></div>
    <div className="text-[#34d399]">Input "aabb" → ✓ VALID  +10 pts</div>
    <div className="text-[#34d399]">Input "ababb" → ✓ VALID  +10 pts</div>
    <div className="text-[#f87171]">Input "abba" → ✗ INVALID  -5 pts</div>
    <div className="text-muted mt-1">Level 2: Balanced Parentheses (PDA)</div>
    <div className="text-[#34d399]">Input "((()))" → ✓ Stack empty — VALID  +15 pts</div>
    <div className="text-accent3">Score: 135 / 200  Time: 00:45  Accuracy: 87%</div>
  </>),
  'global-harvest-imports': (<>
    <div className="text-accent">$ mysql -u root -p global_harvest</div>
    <div className="text-[#34d399]">mysql&gt; CREATE TABLE Orders (</div>
    <div className="text-muted/80">&nbsp;&nbsp;order_id INT PRIMARY KEY AUTO_INCREMENT,</div>
    <div className="text-muted/80">&nbsp;&nbsp;customer_id INT NOT NULL,</div>
    <div className="text-muted/80">&nbsp;&nbsp;product_id INT NOT NULL,</div>
    <div className="text-muted/80">&nbsp;&nbsp;FOREIGN KEY (customer_id) REFERENCES Customers(id),</div>
    <div className="text-muted/80">&nbsp;&nbsp;FOREIGN KEY (product_id) REFERENCES Products(id)</div>
    <div className="text-[#34d399]">);</div>
    <div className="text-[#34d399]">Query OK — Schema in 3NF ✓</div>
    <div className="text-muted/60">Tables: Orders, Products, Suppliers, Customers, Shipments</div>
  </>),
}

const SCORES_CONTENT: Record<string, { label: string; val: number; color: string }[]> = {
  'resume-intelligence-engine': [
    { label: 'Python',        val: 98, color: 'from-accent to-accent' },
    { label: 'FastAPI',       val: 94, color: 'from-accent to-accent' },
    { label: 'NLP Match',     val: 87, color: 'from-accent2 to-[#a78bfa]' },
    { label: 'PDF Rendering', val: 82, color: 'from-accent3 to-accent3' },
    { label: 'Regex Parser',  val: 90, color: 'from-[#34d399] to-[#34d399]' },
  ],
  'classroom-behavior-detection': [
    { label: 'mAP@50',        val: 91, color: 'from-accent to-accent' },
    { label: 'Precision',     val: 89, color: 'from-[#34d399] to-[#34d399]' },
    { label: 'Recall',        val: 87, color: 'from-[#34d399] to-[#34d399]' },
    { label: 'Writing',       val: 79, color: 'from-accent2 to-[#a78bfa]' },
    { label: 'Using Phone',   val: 85, color: 'from-accent3 to-accent3' },
  ],
  'buffer-overflow-attack-lab': [
    { label: 'Stack Smash',   val: 95, color: 'from-[#f87171] to-[#f87171]' },
    { label: 'Heap Overflow', val: 88, color: 'from-[#f87171] to-[#f87171]' },
    { label: 'Format String', val: 82, color: 'from-accent3 to-accent3' },
    { label: 'ASLR Bypass',   val: 74, color: 'from-accent2 to-[#a78bfa]' },
    { label: 'Canary Defeat', val: 70, color: 'from-accent2 to-[#a78bfa]' },
  ],
  'formal-language-typing-game': [
    { label: 'Regex (Level 1)',  val: 87, color: 'from-accent to-accent' },
    { label: 'Palindrome',       val: 82, color: 'from-[#34d399] to-[#34d399]' },
    { label: 'Balanced Parens',  val: 91, color: 'from-accent2 to-[#a78bfa]' },
    { label: 'User Accuracy',    val: 85, color: 'from-accent3 to-accent3' },
    { label: 'Realtime Val.',    val: 96, color: 'from-accent to-accent' },
  ],
  'global-harvest-imports': [
    { label: '1NF Compliance',   val: 100, color: 'from-[#34d399] to-[#34d399]' },
    { label: '2NF Compliance',   val: 100, color: 'from-[#34d399] to-[#34d399]' },
    { label: '3NF Compliance',   val: 100, color: 'from-accent to-accent' },
    { label: 'FK Integrity',     val: 100, color: 'from-accent to-accent' },
    { label: 'Query Perf.',      val: 88,  color: 'from-accent3 to-accent3' },
  ],
}

const JSON_CONTENT: Record<string, React.ReactNode> = {
  'resume-intelligence-engine': (<>
    <span className="text-[#a78bfa]">"suitability_score"</span>: <span className="text-[#34d399]">0.873</span>,<br/>
    <span className="text-[#a78bfa]">"matched_skills"</span>: [<span className="text-accent3">"FastAPI"</span>, <span className="text-accent3">"NLP"</span>, <span className="text-accent3">"Python"</span>],<br/>
    <span className="text-[#a78bfa]">"missing_skills"</span>: [<span className="text-accent3">"Docker"</span>],<br/>
    <span className="text-[#a78bfa]">"outputs"</span>: {'{'}<br/>
    &nbsp;&nbsp;<span className="text-[#a78bfa]">"pdf"</span>: <span className="text-accent3">"/out/resume.pdf"</span>,<br/>
    &nbsp;&nbsp;<span className="text-[#a78bfa]">"docx"</span>: <span className="text-accent3">"/out/resume.docx"</span><br/>
    {'}'}
  </>),
  'classroom-behavior-detection': (<>
    <span className="text-muted/60"># classroom.yaml</span><br/>
    <span className="text-[#a78bfa]">path</span>: <span className="text-accent3">./dataset</span><br/>
    <span className="text-[#a78bfa]">train</span>: <span className="text-accent3">images/train</span><br/>
    <span className="text-[#a78bfa]">val</span>: <span className="text-accent3">images/val</span><br/>
    <span className="text-[#a78bfa]">nc</span>: <span className="text-[#34d399]">11</span><br/>
    <span className="text-[#a78bfa]">names</span>: [<span className="text-accent3">'writing'</span>, <span className="text-accent3">'phone'</span>, <span className="text-accent3">'sleeping'</span>,<br/>
    &nbsp;<span className="text-accent3">'reading'</span>, <span className="text-accent3">'raising_hand'</span>, <span className="text-accent3">'talking'</span>...]<br/>
    <span className="text-muted/60"># epochs=100  imgsz=640  batch=8</span>
  </>),
  'buffer-overflow-attack-lab': (<>
    <span className="text-[#a78bfa]">"attack_type"</span>: <span className="text-accent3">"stack_smashing"</span>,<br/>
    <span className="text-[#a78bfa]">"offset"</span>: <span className="text-[#34d399]">76</span>,<br/>
    <span className="text-[#a78bfa]">"payload"</span>: <span className="text-accent3">"'A'*76 + ret_addr"</span>,<br/>
    <span className="text-[#a78bfa]">"target"</span>: <span className="text-accent3">"32-bit Linux ELF"</span>,<br/>
    <span className="text-[#a78bfa]">"mitigations_tested"</span>: [<span className="text-accent3">"ASLR"</span>, <span className="text-accent3">"canary"</span>],<br/>
    <span className="text-[#a78bfa]">"result"</span>: <span className="text-[#34d399]">"root_shell_obtained"</span>
  </>),
  'formal-language-typing-game': (<>
    <span className="text-[#a78bfa]">"language_type"</span>: <span className="text-accent3">"regular"</span>,<br/>
    <span className="text-[#a78bfa]">"pattern"</span>: <span className="text-accent3">"^(a|b)*abb$"</span>,<br/>
    <span className="text-[#a78bfa]">"automaton"</span>: <span className="text-accent3">"DFA"</span>,<br/>
    <span className="text-[#a78bfa]">"states"</span>: <span className="text-[#34d399]">4</span>,<br/>
    <span className="text-[#a78bfa]">"input"</span>: <span className="text-accent3">"aabb"</span>,<br/>
    <span className="text-[#a78bfa]">"accepted"</span>: <span className="text-[#34d399]">true</span>,<br/>
    <span className="text-[#a78bfa]">"stack_trace"</span>: [<span className="text-accent3">"q0→q1→q2→q3"</span>]
  </>),
  'global-harvest-imports': (<>
    <span className="text-[#a78bfa]">"tables"</span>: [<span className="text-accent3">"Customers"</span>, <span className="text-accent3">"Products"</span>, <span className="text-accent3">"Suppliers"</span>],<br/>
    <span className="text-[#a78bfa]">"normalization"</span>: <span className="text-accent3">"3NF"</span>,<br/>
    <span className="text-[#a78bfa]">"relationships"</span>: [<br/>
    &nbsp;&nbsp;{'{'}<span className="text-[#a78bfa]">"from"</span>: <span className="text-accent3">"Orders"</span>, <span className="text-[#a78bfa]">"to"</span>: <span className="text-accent3">"Customers"</span>{'}'}<br/>
    ],<br/>
    <span className="text-[#a78bfa]">"constraints"</span>: <span className="text-accent3">"FK + UNIQUE + NOT NULL"</span>
  </>),
}

const STRUCTURE_CONTENT: Record<string, React.ReactNode> = {
  'resume-intelligence-engine': (<>
    <div><span className="text-accent">📁</span> <span className="text-muted">resume-intelligence-engine/</span></div>
    <div className="text-muted">├─ <span className="text-accent3">main.py</span>          <span className="text-muted/40">FastAPI entry</span></div>
    <div className="text-muted">├─ <span className="text-[#a78bfa]">jd_parser.py</span>     <span className="text-muted/40">NLP pipeline</span></div>
    <div className="text-muted">├─ <span className="text-[#a78bfa]">suitability.py</span>  <span className="text-muted/40">Scoring engine</span></div>
    <div className="text-muted">├─ <span className="text-[#a78bfa]">skill_bridge.py</span> <span className="text-muted/40">Prioritization</span></div>
    <div className="text-muted">├─ <span className="text-[#a78bfa]">generator.py</span>    <span className="text-muted/40">Content builder</span></div>
    <div className="text-muted">├─ <span className="text-[#34d399]">exporters/</span></div>
    <div className="text-muted">│  ├─ <span className="text-accent3">pdf_export.py</span>  <span className="text-muted/40">ReportLab</span></div>
    <div className="text-muted">│  └─ <span className="text-accent3">docx_export.py</span> <span className="text-muted/40">python-docx</span></div>
    <div className="text-muted">└─ <span className="text-accent3">requirements.txt</span></div>
  </>),
  'classroom-behavior-detection': (<>
    <div><span className="text-accent">📁</span> <span className="text-muted">classroom-behavior-detection/</span></div>
    <div className="text-muted">├─ <span className="text-accent3">train.py</span>         <span className="text-muted/40">YOLOv8 training</span></div>
    <div className="text-muted">├─ <span className="text-accent3">evaluate.py</span>      <span className="text-muted/40">mAP evaluation</span></div>
    <div className="text-muted">├─ <span className="text-accent3">gradcam.py</span>       <span className="text-muted/40">Explainability</span></div>
    <div className="text-muted">├─ <span className="text-[#34d399]">dataset/</span></div>
    <div className="text-muted">│  ├─ <span className="text-[#34d399]">images/train/</span>  <span className="text-muted/40">Training set</span></div>
    <div className="text-muted">│  └─ <span className="text-[#34d399]">labels/</span>       <span className="text-muted/40">Annotations</span></div>
    <div className="text-muted">├─ <span className="text-[#a78bfa]">classroom.yaml</span>  <span className="text-muted/40">Training config</span></div>
    <div className="text-muted">└─ <span className="text-[#34d399]">runs/detect/</span>    <span className="text-muted/40">Results</span></div>
  </>),
  'buffer-overflow-attack-lab': (<>
    <div><span className="text-accent">📁</span> <span className="text-muted">buffer-overflow-lab/</span></div>
    <div className="text-muted">├─ <span className="text-accent3">vulnerable.c</span>     <span className="text-muted/40">Target program</span></div>
    <div className="text-muted">├─ <span className="text-[#f87171]">exploit.py</span>       <span className="text-muted/40">Stack smash</span></div>
    <div className="text-muted">├─ <span className="text-[#f87171]">heap_exploit.py</span> <span className="text-muted/40">Heap overflow</span></div>
    <div className="text-muted">├─ <span className="text-[#f87171]">format_str.py</span>   <span className="text-muted/40">Format string</span></div>
    <div className="text-muted">├─ <span className="text-[#a78bfa]">gdb_notes.txt</span>   <span className="text-muted/40">Debug log</span></div>
    <div className="text-muted">└─ <span className="text-accent3">report.pdf</span>       <span className="text-muted/40">Lab writeup</span></div>
  </>),
  'formal-language-typing-game': (<>
    <div><span className="text-accent">📁</span> <span className="text-muted">formal-language-game/</span></div>
    <div className="text-muted">├─ <span className="text-accent3">main.py</span>          <span className="text-muted/40">Game loop</span></div>
    <div className="text-muted">├─ <span className="text-[#a78bfa]">regex_engine.py</span> <span className="text-muted/40">RE validator</span></div>
    <div className="text-muted">├─ <span className="text-[#a78bfa]">automata.py</span>     <span className="text-muted/40">DFA / PDA logic</span></div>
    <div className="text-muted">├─ <span className="text-[#a78bfa]">scoring.py</span>      <span className="text-muted/40">Points + timer</span></div>
    <div className="text-muted">├─ <span className="text-[#34d399]">levels/</span></div>
    <div className="text-muted">│  ├─ <span className="text-accent3">level1_regex.py</span></div>
    <div className="text-muted">│  └─ <span className="text-accent3">level2_pda.py</span></div>
    <div className="text-muted">└─ <span className="text-accent3">tkinter_ui.py</span>    <span className="text-muted/40">GUI</span></div>
  </>),
  'global-harvest-imports': (<>
    <div><span className="text-accent">📁</span> <span className="text-muted">global-harvest-db/</span></div>
    <div className="text-muted">├─ <span className="text-[#34d399]">schema/</span></div>
    <div className="text-muted">│  ├─ <span className="text-accent3">customers.sql</span></div>
    <div className="text-muted">│  ├─ <span className="text-accent3">products.sql</span></div>
    <div className="text-muted">│  ├─ <span className="text-accent3">orders.sql</span></div>
    <div className="text-muted">│  └─ <span className="text-accent3">suppliers.sql</span></div>
    <div className="text-muted">├─ <span className="text-[#a78bfa]">erd.drawio</span>      <span className="text-muted/40">ER Diagram</span></div>
    <div className="text-muted">├─ <span className="text-[#a78bfa]">dfd.drawio</span>      <span className="text-muted/40">Data Flow</span></div>
    <div className="text-muted">└─ <span className="text-accent3">seed_data.sql</span>    <span className="text-muted/40">Sample data</span></div>
  </>),
}

function TerminalMock({ projectId }: { projectId?: string }) {
  const content = projectId && TERMINAL_CONTENT[projectId]
  return (
    <div className="p-4 font-mono text-[0.62rem] leading-[1.75] h-full overflow-hidden" style={{ background: 'var(--surface)' }}>
      <div className="flex gap-2 mb-3 pb-2 border-b border-white/[0.05]">
        <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
        <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
        <div className="w-2 h-2 rounded-full bg-[#28c840]" />
        <span className="ml-auto text-[0.55rem] text-muted/50">terminal</span>
      </div>
      {content || (<>
        <div className="text-accent">$ running...</div>
        <div className="text-[#34d399]">Process complete</div>
      </>)}
      <div className="mt-1"><span className="text-accent">$</span><span className="inline-block w-[6px] h-[11px] bg-accent ml-1 animate-blink align-middle" /></div>
    </div>
  )
}

function ScoresMock({ projectId, label }: { projectId?: string; label?: string }) {
  const scores = (projectId && SCORES_CONTENT[projectId]) || SCORES_CONTENT['resume-intelligence-engine']
  return (
    <div className="p-5 h-full flex flex-col justify-center gap-3 bg-surface">
      <div className="text-[0.6rem] tracking-[0.15em] uppercase text-accent mb-1">{label || 'Performance Metrics'}</div>
      {scores.map(s => (
        <div key={s.label}>
          <div className="flex justify-between text-[0.6rem] text-muted mb-1">
            <span>{s.label}</span>
            <span className="text-accent">{s.val}%</span>
          </div>
          <div className="h-[3px] bg-white/[0.05] rounded-full overflow-hidden">
            <div className={`h-full bg-gradient-to-r ${s.color} rounded-full`} style={{ width: `${s.val}%`, transition: 'width 1.2s cubic-bezier(0.22,1,0.36,1)' }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function JsonMock({ projectId }: { projectId?: string }) {
  const content = projectId && JSON_CONTENT[projectId]
  return (
    <div className="p-5 h-full font-mono text-[0.62rem] leading-[1.75] overflow-hidden bg-surface">
      <div className="text-[0.58rem] tracking-[0.12em] uppercase text-accent3 mb-3">
        {projectId === 'classroom-behavior-detection' ? 'YAML Config' : 'Data Output'}
      </div>
      {'{'}<br/>
      {content || <span className="text-muted/60">No data</span>}
      <br/>{'}'}
    </div>
  )
}

function StructureMock({ projectId }: { projectId?: string }) {
  const content = projectId && STRUCTURE_CONTENT[projectId]
  return (
    <div className="p-5 h-full font-mono text-[0.62rem] leading-[1.85] overflow-hidden bg-surface">
      <div className="text-[0.6rem] tracking-[0.15em] uppercase text-muted mb-3">Project Structure</div>
      {content || <div className="text-muted/50">Structure unavailable</div>}
    </div>
  )
}

export default function GalleryMock({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<number | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item, i) => {
          const pid = item.projectId
          const renderMock = () => {
            if (item.type === 'terminal') return <TerminalMock projectId={pid} />
            if (item.type === 'scores' || item.type === 'metrics') return <ScoresMock projectId={pid} label={item.title} />
            if (item.type === 'json') return <JsonMock projectId={pid} />
            if (item.type === 'structure') return <StructureMock projectId={pid} />
            return <TerminalMock projectId={pid} />
          }
          return (
            <div key={i} onClick={() => setActive(i)}
              className="relative border border-white/[0.08] overflow-hidden cursor-pointer group hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
              style={{ minHeight: 200 }}>
              <div className="h-full">{renderMock()}</div>
              <div className="absolute inset-x-0 bottom-0 px-3 py-2 bg-gradient-to-t from-bg via-bg/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="text-[0.62rem] font-sans font-semibold text-muted">{item.title}</div>
                <div className="text-[0.58rem] text-muted/70">{item.description}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setActive(null)}>
          <div className="bg-[color:var(--surface)] border border-white/[0.12] w-full max-w-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
              <div>
                <span className="text-[0.72rem] tracking-[0.1em] uppercase text-accent">{items[active].title}</span>
                <span className="text-[0.62rem] text-muted/60 ml-3">{items[active].description}</span>
              </div>
              <button onClick={() => setActive(null)} className="text-muted hover:text-white text-lg leading-none w-8 h-8 flex items-center justify-center">✕</button>
            </div>
            <div className="p-6 min-h-[340px]">
              {(() => {
                const pid = items[active].projectId
                const t = items[active].type
                if (t === 'terminal') return <TerminalMock projectId={pid} />
                if (t === 'scores' || t === 'metrics') return <ScoresMock projectId={pid} label={items[active].title} />
                if (t === 'json') return <JsonMock projectId={pid} />
                if (t === 'structure') return <StructureMock projectId={pid} />
                return <TerminalMock projectId={pid} />
              })()}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
