'use client'
import Link from 'next/link'
import PrintButton from './PrintButton'

export default function ResumePage() {
  return (
    <>
      {/* Top bar — hidden on print */}
      <div className="print:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 bg-[rgba(5,8,16,0.95)] backdrop-blur-xl border-b border-white/[0.06]">
        <Link href="/" className="text-[0.68rem] tracking-[0.12em] uppercase text-muted hover:text-accent transition-colors flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          Back
        </Link>
        <span className="font-sans font-black text-accent text-sm">DJ · Résumé</span>
        <PrintButton />
      </div>

      {/* Resume body */}
      <div className="bg-white text-[#1a1a2e] min-h-screen pt-[52px] print:pt-0" style={{ fontFamily: "'DM Mono', monospace" }}>
        <div className="max-w-[860px] mx-auto px-8 sm:px-12 py-10 print:py-6 print:px-8">

          {/* ── Header ── */}
          <div className="border-b-2 border-[#00d4ff] pb-5 mb-5">
            <h1 className="text-[1.9rem] font-black tracking-[-0.02em] text-[#050810] mb-1"
              style={{ fontFamily: "'Fraunces', serif" }}>
              Darshan Joshi
            </h1>
            <p className="text-[0.88rem] text-[#3a4a6b] mb-3 font-semibold"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              AI Engineer · Computer Vision · NLP · Cybersecurity
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-1 text-[0.72rem] text-[#5a6a8a]">
              <span>joshidarshan193@gmail.com</span>
              <span>+1 947 240 5099</span>
              <span>Southfield, MI, USA</span>
              <span>linkedin.com/in/darshanjoshi05</span>
              <span>github.com/darshanjoshi05</span>
            </div>
          </div>

          {/* ── Summary ── */}
          <Section title="Summary">
            <p className="text-[0.81rem] leading-[1.75] text-[#3a4a6b]">
              AI Engineer with hands-on research experience in computer vision, NLP, and cybersecurity. Research Assistant at Lawrence Technological University developing YOLOv8-based classroom behavior detection with Grad-CAM explainability. 4 research publications spanning cybersecurity infrastructure, AI behavior detection, seismic deep learning (CNN-LSTM), and NLP document intelligence. EC-Council certified across 5 cybersecurity domains. Seeking AI/ML, backend, or software engineering roles.
            </p>
          </Section>

          {/* ── Education ── */}
          <Section title="Education">
            <div className="space-y-3">
              <EduItem
                degree="Master of Science, Computer Science Engineering"
                school="Lawrence Technological University"
                location="Southfield, MI, USA"
                period="2024 – 2025"
                gpa="GPA: 3.75 / 4.0 (US Scale)"
              />
              <EduItem
                degree="Bachelor of Engineering, Computer Science Engineering"
                school="Sree Dattha Institute of Engineering & Science"
                location="Hyderabad, India"
                period="2019 – 2023"
                gpa="GPA: 6.5 / 10 (Indian Scale)"
              />
            </div>
          </Section>

          {/* ── Experience ── */}
          <Section title="Experience">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h3 className="text-[0.86rem] font-bold text-[#050810]" style={{ fontFamily: "'Syne', sans-serif" }}>
                  Research Assistant
                </h3>
                <p className="text-[0.76rem] font-medium" style={{ color: '#00a8cc' }}>
                  Lawrence Technological University · Southfield, MI
                </p>
              </div>
              <span className="text-[0.7rem] text-[#7a8aaa] shrink-0">Dec 2024 – Present</span>
            </div>
            <ul className="space-y-1.5">
              {[
                'Led end-to-end development of AI-based classroom behavior detection system using YOLOv8 with measurable Precision, Recall, and mAP@50 performance metrics.',
                'Designed and curated structured multi-class datasets (11+ behavioral classes), enforcing annotation quality under limited hardware resources.',
                'Integrated Grad-CAM explainability techniques to enhance model interpretability and support responsible AI practices.',
                'Conducted iterative hyperparameter optimization and documented reproducible YAML-based training workflows.',
                'Collaborated with faculty advisors and presented findings in structured research updates.',
              ].map((pt, i) => (
                <li key={i} className="flex gap-2 text-[0.76rem] leading-[1.65] text-[#3a4a6b]">
                  <span className="shrink-0 font-bold" style={{ color: '#00d4ff' }}>·</span>{pt}
                </li>
              ))}
            </ul>
          </Section>

          {/* ── Projects ── */}
          <Section title="Projects">
            <div className="space-y-4">
              {[
                {
                  name: 'Resume Intelligence Engine',
                  stack: 'FastAPI · Python · NLP · ReportLab · python-docx',
                  period: '2026 – Present',
                  points: [
                    'Architected a modular FastAPI backend for dynamic resume and cover letter generation from job descriptions.',
                    'Built NLP-driven JD parsing pipeline using regex and heuristic classification (87%+ suitability score).',
                    'Developed scalable PDF/DOCX generation with ReportLab and python-docx.',
                  ],
                },
                {
                  name: 'Classroom Behavior Detection',
                  stack: 'YOLOv8 · PyTorch · Grad-CAM · OpenCV · YAML',
                  period: 'Dec 2024 – Present',
                  points: [
                    'Designed and trained YOLOv8 multi-class detection model (11+ behavioral classes) achieving mAP@50 = 0.91.',
                    'Integrated Grad-CAM heatmap visualization for model explainability and responsible AI validation.',
                  ],
                },
                {
                  name: 'Buffer Overflow Attack Lab',
                  stack: 'C · GDB · x86 Assembly · ASLR · Linux',
                  period: 'Jan – Jun 2024',
                  points: [
                    'Analyzed stack smashing, heap overflow, and format string attacks in 32-bit Linux environments.',
                    'Evaluated ASLR and stack canary mitigations using GDB; achieved root access via exploit injection.',
                  ],
                },
                {
                  name: 'Global Harvest Imports Database',
                  stack: 'SQL · MySQL · ERD · DFD · Schema Design',
                  period: 'Jan – Jun 2024',
                  points: [
                    'Designed a normalized relational database (3NF) from stakeholder requirements using ERDs and DFDs.',
                    'Defined referential integrity constraints across 5+ department tables.',
                  ],
                },
              ].map(p => (
                <div key={p.name}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-[0.84rem] font-bold text-[#050810]" style={{ fontFamily: "'Syne', sans-serif" }}>{p.name}</h3>
                      <p className="text-[0.68rem] text-[#7a8aaa]">{p.stack}</p>
                    </div>
                    <span className="text-[0.68rem] text-[#7a8aaa] shrink-0">{p.period}</span>
                  </div>
                  <ul className="mt-1 space-y-1">
                    {p.points.map((pt, i) => (
                      <li key={i} className="flex gap-2 text-[0.74rem] leading-[1.6] text-[#3a4a6b]">
                        <span className="shrink-0 font-bold" style={{ color: '#00d4ff' }}>·</span>{pt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          {/* ── Publications ── */}
          <Section title="Publications">
            <div className="space-y-2">
              {[
                { authors: 'Joshi, D.', title: 'Design and Analysis of Cyber Security Infrastructure in Large Enterprises and Organisations', journal: 'IJARESM', year: '2023', status: 'Published' },
                { authors: 'Joshi, D.', title: 'Classroom Behavior Detection Using YOLOv8 and Explainable AI', journal: 'IJSRST', year: '2025', status: 'Published' },
                { authors: 'Joshi, D. et al.', title: 'Earthquake Prediction and Synthetic Seismogram Generation Using Hybrid CNN-LSTM Model', journal: 'American Journal of Civil Engineering', year: '2025', status: 'Published' },
                { authors: 'Joshi, D.', title: 'NLP-Driven Resume Tailoring: A Modular Approach to JD-Aware Career Document Generation', journal: 'IJCST', year: '2026', status: 'In Preparation' },
              ].map((pub, i) => (
                <div key={i} className="flex gap-2 text-[0.74rem] leading-[1.65] text-[#3a4a6b]">
                  <span className="shrink-0 font-bold mt-[2px]" style={{ color: '#00d4ff' }}>·</span>
                  <span>
                    <span className="font-semibold text-[#050810]">{pub.authors}</span> ({pub.year}). {pub.title}. <em>{pub.journal}</em>.{' '}
                    <span className={`text-[0.65rem] px-1.5 py-0.5 rounded font-medium ${pub.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {pub.status}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </Section>

          {/* ── Skills ── */}
          <Section title="Technical Skills">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5">
              {[
                { category: 'AI / ML', skills: 'Python, YOLOv8, PyTorch, OpenCV, Grad-CAM, Scikit-Learn' },
                { category: 'NLP / Backend', skills: 'FastAPI, NLP, Regex, ReportLab, python-docx, Jinja2, REST APIs' },
                { category: 'Cybersecurity', skills: 'Buffer Overflow, GDB, ASLR, Network Defense, Digital Forensics' },
                { category: 'Languages', skills: 'Python, C/C++, Java, SQL, HTML/CSS' },
                { category: 'Tools', skills: 'Git, YAML, Matplotlib, MySQL, Linux, VS Code' },
                { category: 'Concepts', skills: 'Object Detection, Explainable AI, Schema Design, API Design' },
              ].map(s => (
                <div key={s.category} className="text-[0.74rem] leading-[1.6]">
                  <span className="font-bold text-[#050810]" style={{ fontFamily: "'Syne', sans-serif" }}>{s.category}: </span>
                  <span className="text-[#3a4a6b]">{s.skills}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* ── Certifications ── */}
          <Section title="Certifications">
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-[0.74rem] text-[#3a4a6b]">
              {[
                'Network Defense Essentials (EC-Council)',
                'Ethical Hacking Essentials (EC-Council)',
                'Digital Forensics Essentials (EC-Council)',
                'Cisco Labs Crash Course (EC-Council)',
                'Website Hacking Techniques (EC-Council)',
              ].map(c => (
                <span key={c} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full inline-block shrink-0" style={{ background: '#00d4ff' }} />
                  {c}
                </span>
              ))}
            </div>
          </Section>

        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          .print\\:hidden { display: none !important; }
          .print\\:pt-0 { padding-top: 0 !important; }
          .print\\:py-6 { padding-top: 1.5rem !important; padding-bottom: 1.5rem !important; }
          .print\\:px-8 { padding-left: 2rem !important; padding-right: 2rem !important; }
          body { background: white !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
        @page { margin: 0.5in; size: letter; }
      `}</style>
    </>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <div className="text-[0.6rem] tracking-[0.2em] uppercase font-bold border-b border-[#e2e8f0] pb-1 mb-2.5"
        style={{ color: '#00a8cc', fontFamily: "'Syne', sans-serif" }}>
        {title}
      </div>
      {children}
    </div>
  )
}

function EduItem({ degree, school, location, period, gpa }: {
  degree: string; school: string; location: string; period: string; gpa: string
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h3 className="text-[0.84rem] font-bold text-[#050810]" style={{ fontFamily: "'Syne', sans-serif" }}>{degree}</h3>
        <p className="text-[0.76rem] font-medium" style={{ color: '#00a8cc' }}>{school} · {location}</p>
        <p className="text-[0.7rem] text-[#7a8aaa]">{gpa}</p>
      </div>
      <span className="text-[0.7rem] text-[#7a8aaa] shrink-0">{period}</span>
    </div>
  )
}
