'use client'
import { useState } from 'react'

type GalleryType = 'terminal' | 'metrics' | 'json' | 'structure' | 'scores'
interface GalleryItem { title: string; description: string; type: GalleryType; projectId?: string }

const TERMINAL_CONTENT: Record<string, React.ReactNode> = {
  'resume-intelligence-engine': (<>
    <div className="text-accent">$ uvicorn app:app --reload --port 8000</div>
    <div className="text-[#34d399]">INFO: Uvicorn running on http://127.0.0.1:8000</div>
    <div className="text-muted">POST /api/generate HTTP/1.1 → role_detect.py</div>
    <div className="text-[#a78bfa]">→ jd_extract.py: 17 skills · 3 responsibilities</div>
    <div className="text-[#a78bfa]">→ llm_extract.py: role=AI Engineer · seniority=Mid</div>
    <div className="text-[#34d399]">→ ats_check.py: ATS score 91/100 ✓</div>
    <div className="text-[#34d399]">→ suitability.py: match 87.3%</div>
    <div className="text-[#34d399]">→ learner.py: term_memory updated</div>
    <div className="text-[#34d399]">→ generator.py: resume + cover letter built</div>
    <div className="text-[#34d399]">✓ PDF · DOCX · JSON saved → outputs/</div>
    <div className="text-muted/60">200 OK · 1.43s · jobs.db updated</div>
  </>),
  'classroom-behavior-detection': (<>
    <div className="text-accent">$ yolo detect train data=scb05.yaml model=yolov8x.pt epochs=50</div>
    <div className="text-muted">Device: A100 SXM4 80GB · Google Colab Pro</div>
    <div className="text-muted">Epoch 1/50: box_loss=4.12 cls_loss=3.87</div>
    <div className="text-[#a78bfa]">Epoch 25/50: mAP50=0.61 Precision=0.68</div>
    <div className="text-[#a78bfa]">Epoch 40/50: mAP50=0.72 Precision=0.78</div>
    <div className="text-[#34d399]">Epoch 50/50: mAP50=0.7485 Precision=0.812</div>
    <div className="text-[#34d399]">✓ Best model saved → runs/detect/train/weights/best.pt</div>
    <div className="text-[#34d399]">✓ Sleeping class AP: 0.935 — highest per-class score</div>
    <div className="text-accent">$ python tiled_inference.py --source classroom.mp4</div>
    <div className="text-[#34d399]">✓ Tiled inference complete → output_tiled.mp4</div>
  </>),
  'buffer-overflow-attack-lab': (<>
    <div className="text-accent">$ gdb -q ./vulnerable_program</div>
    <div className="text-[#34d399]">Reading symbols from ./vulnerable_program...done.</div>
    <div className="text-[#a78bfa]">Program received signal SIGSEGV, Segmentation fault.</div>
    <div className="text-muted">0xdeadbeef in ?? ()</div>
    <div className="text-[#34d399]">(gdb) x/20x $esp</div>
    <div className="text-muted/70">0xffffd620: 0x41414141 0xdeadbeef 0x00000000</div>
    <div className="text-[#34d399]">✓ Return address overwrite confirmed at offset 76</div>
    <div className="text-[#34d399]">✓ Shell payload injected → root access obtained</div>
  </>),
  'formal-language-typing-game': (<>
    <div className="text-accent">$ python3 Toc_final.py</div>
    <div className="text-[#34d399]">Formal Language Typing Game — Theory of Computation</div>
    <div className="text-muted">Pattern: a*b* Timer: 45s</div>
    <div className="text-[#34d399]">Input aaaabbbb → re.match a*b* → VALID +10</div>
    <div className="text-muted">Pattern: balanced_parentheses</div>
    <div className="text-[#34d399]">Input (()) → Stack PDA → push push pop pop → empty +10</div>
    <div className="text-[#f87171]">Input (()( → Stack not empty → INVALID -5</div>
    <div className="text-muted">Pattern: palindrome</div>
    <div className="text-[#34d399]">Input racecar → reversed == original → VALID +10</div>
    <div className="text-accent3">Final Score: 35 · Time expired · 3/4 correct</div>
  </>),
  'indoor-scene-recognition': (<>
    <div className="text-accent">$ docker build -t indoor-rec . && docker run -p 5000:5000 indoor-rec</div>
    <div className="text-[#34d399]">✓ Image built successfully</div>
    <div className="text-[#34d399]">✓ YOLOv5s model loaded → yolov5s.pt (14.4MB)</div>
    <div className="text-muted">POST /predict HTTP/1.1</div>
    <div className="text-[#a78bfa]">→ Preprocessing image: 640x640</div>
    <div className="text-[#34d399]">→ Detected: bedroom 0.91, furniture 0.87, window 0.74</div>
    <div className="text-[#34d399]">→ Response: 200 OK · 0.23s</div>
    <div className="text-muted/60">Web UI available at http://localhost:5000</div>
  </>),
  'global-harvest-imports': (<>
    <div className="text-accent">$ mysql -u root -p global_harvest &lt; schema.sql</div>
    <div className="text-[#34d399]">Query OK — Suppliers · Categories · Products ✓</div>
    <div className="text-[#34d399]">Query OK — Customers · Orders · Order_Items · Shipments ✓</div>
    <div className="text-muted/60">Indexes created: idx_products_supplier, idx_orders_date...</div>
    <div className="text-accent">$ mysql -u root -p global_harvest &lt; seed_data.sql</div>
    <div className="text-[#34d399]">5 suppliers · 7 products · 5 customers · 5 orders ✓</div>
    <div className="text-accent">$ mysql &gt; SOURCE queries.sql</div>
    <div className="text-[#34d399]">Top revenue: Basmati Rice $60,000 · Cardamom $54,000 ✓</div>
  </>),
  'twitter-analytics-engagement': (<>
    <div className="text-accent">$ python twitter_analytics.py</div>
    <div className="text-[#34d399]">✓ Dataset loaded: tweets_clean.csv</div>
    <div className="text-[#a78bfa]">→ Feature eng: sin_hour, cos_hour, likes_mean, retweet_mean</div>
    <div className="text-[#34d399]">→ OLS Regression: R2=0.852 (best predictor: likes_mean)</div>
    <div className="text-[#34d399]">→ XGBoost: R2=0.7766 MSE=472.48</div>
    <div className="text-[#34d399]">→ Prophet: Peak engagement 17:00-19:00 ✓</div>
    <div className="text-[#34d399]">→ Visualizations saved: 10 charts</div>
    <div className="text-muted/60">Top posting hour: 17-19 · Highest engagement: ~22 avg</div>
  </>),
  'ai-srs-generator': (<>
    <div className="text-accent">$ uvicorn main:app --reload --port 8000</div>
    <div className="text-[#34d399]">INFO: Uvicorn running on http://127.0.0.1:8000</div>
    <div className="text-muted">POST /generate-requirements HTTP/1.1</div>
    <div className="text-[#34d399]">→ RequirementInput validated ✓</div>
    <div className="text-[#34d399]">→ The system shall allow users to sign up.</div>
    <div className="text-[#34d399]">→ The system shall allow users to log in.</div>
    <div className="text-[#34d399]">→ The system shall generate requirements using AI.</div>
    <div className="text-muted/60">200 OK · RequirementOutput: List[str] returned</div>
  </>),
  'sorting-algorithms-benchmark': (<>
    <div className="text-accent">$ python3 sorting_benchmark.py</div>
    <div className="text-[#a78bfa]">Dataset: Random Size: 100,000</div>
    <div className="text-[#34d399]">  Radix Sort:  0.041s fastest</div>
    <div className="text-muted">  TimSort:     0.089s</div>
    <div className="text-muted">  Bucket Sort: 0.134s</div>
    <div className="text-[#a78bfa]">Dataset: Nearly Sorted Size: 100,000</div>
    <div className="text-[#34d399]">  TimSort:     0.012s fastest (run detection)</div>
    <div className="text-[#f87171]">  Bucket Sort: 0.490s worst case</div>
    <div className="text-accent3">Plots saved → results/</div>
  </>),
}

const SCORES_CONTENT: Record<string, { label: string; val: number; color: string }[]> = {
  'resume-intelligence-engine': [
    { label: 'ATS Score',      val: 91, color: 'from-accent to-accent' },
    { label: 'JD Suitability', val: 87, color: 'from-[#34d399] to-[#34d399]' },
    { label: 'Skill Bridge',   val: 93, color: 'from-accent to-accent' },
    { label: 'LLM Extraction', val: 89, color: 'from-accent2 to-[#a78bfa]' },
    { label: 'Test Coverage',  val: 78, color: 'from-accent3 to-accent3' },
  ],
  'classroom-behavior-detection': [
    { label: 'Overall mAP@0.5', val: 75, color: 'from-accent to-accent' },
    { label: 'Sleeping',        val: 94, color: 'from-[#34d399] to-[#34d399]' },
    { label: 'Precision',       val: 81, color: 'from-[#34d399] to-[#34d399]' },
    { label: 'Recall',          val: 74, color: 'from-accent2 to-[#a78bfa]' },
    { label: 'Using Phone',     val: 68, color: 'from-accent3 to-accent3' },
  ],
  'buffer-overflow-attack-lab': [
    { label: 'Stack Smash',   val: 95, color: 'from-[#f87171] to-[#f87171]' },
    { label: 'Heap Overflow', val: 88, color: 'from-[#f87171] to-[#f87171]' },
    { label: 'Format String', val: 82, color: 'from-accent3 to-accent3' },
    { label: 'ASLR Bypass',   val: 74, color: 'from-accent2 to-[#a78bfa]' },
    { label: 'Canary Defeat', val: 70, color: 'from-accent2 to-[#a78bfa]' },
  ],
  'formal-language-typing-game': [
    { label: 'a*b* / a+b+c+',  val: 92, color: 'from-accent to-accent' },
    { label: 'Balanced Parens', val: 88, color: 'from-[#34d399] to-[#34d399]' },
    { label: 'Palindrome',      val: 95, color: 'from-[#34d399] to-[#34d399]' },
    { label: 'Alternating 01',  val: 79, color: 'from-accent2 to-[#a78bfa]' },
    { label: 'Contains 101',    val: 84, color: 'from-accent3 to-accent3' },
  ],
  'indoor-scene-recognition': [
    { label: 'Bedroom',     val: 91, color: 'from-accent to-accent' },
    { label: 'Kitchen',     val: 87, color: 'from-[#34d399] to-[#34d399]' },
    { label: 'Bathroom',    val: 83, color: 'from-accent2 to-[#a78bfa]' },
    { label: 'Living Room', val: 78, color: 'from-accent3 to-accent3' },
    { label: 'Office',      val: 74, color: 'from-accent to-accent' },
  ],
  'global-harvest-imports': [
    { label: '3NF Compliance', val: 100, color: 'from-[#34d399] to-[#34d399]' },
    { label: 'FK Integrity',   val: 100, color: 'from-accent to-accent' },
    { label: 'Index Coverage', val: 90,  color: 'from-accent2 to-[#a78bfa]' },
    { label: 'Query Perf.',    val: 85,  color: 'from-accent3 to-accent3' },
    { label: 'Normalization',  val: 100, color: 'from-[#34d399] to-[#34d399]' },
  ],
  'twitter-analytics-engagement': [
    { label: 'OLS R2',       val: 85, color: 'from-accent to-accent' },
    { label: 'XGBoost R2',   val: 78, color: 'from-[#34d399] to-[#34d399]' },
    { label: 'Feature Eng.', val: 92, color: 'from-accent2 to-[#a78bfa]' },
    { label: 'Viz Quality',  val: 88, color: 'from-accent3 to-accent3' },
    { label: 'Prophet MAPE', val: 74, color: 'from-accent to-accent' },
  ],
  'ai-srs-generator': [
    { label: 'API Design',     val: 92,  color: 'from-accent to-accent' },
    { label: 'Type Safety',    val: 95,  color: 'from-[#34d399] to-[#34d399]' },
    { label: 'SRS Compliance', val: 88,  color: 'from-accent2 to-[#a78bfa]' },
    { label: 'CORS Setup',     val: 100, color: 'from-[#34d399] to-[#34d399]' },
    { label: 'Frontend UI',    val: 80,  color: 'from-accent3 to-accent3' },
  ],
  'sorting-algorithms-benchmark': [
    { label: 'Radix (Random)',    val: 96, color: 'from-accent to-accent' },
    { label: 'TimSort (Sorted)',  val: 99, color: 'from-[#34d399] to-[#34d399]' },
    { label: 'Radix (Reversed)',  val: 95, color: 'from-accent to-accent' },
    { label: 'Bucket (Random)',   val: 78, color: 'from-accent2 to-[#a78bfa]' },
    { label: 'Bucket (Reversed)', val: 32, color: 'from-[#f87171] to-[#f87171]' },
  ],
}

const JSON_CONTENT: Record<string, React.ReactNode> = {
  'resume-intelligence-engine': (<>
    <span className="text-[#a78bfa]">role</span>: <span className="text-accent3">AI Engineer</span>,<br/>
    <span className="text-[#a78bfa]">ats_score</span>: <span className="text-[#34d399]">91</span>,<br/>
    <span className="text-[#a78bfa]">suitability</span>: <span className="text-[#34d399]">0.873</span>,<br/>
    <span className="text-[#a78bfa]">matched_skills</span>: [<span className="text-accent3">FastAPI, LLM, Python</span>],<br/>
    <span className="text-[#a78bfa]">recruiter_email</span>: <span className="text-accent3">drafted ✓</span>,<br/>
    <span className="text-muted/60">// jobs.db updated · term_memory saved</span>
  </>),
  'classroom-behavior-detection': (<>
    <span className="text-muted/60"># scb05.yaml</span><br/>
    <span className="text-[#a78bfa]">path</span>: <span className="text-accent3">./SCB-05</span><br/>
    <span className="text-[#a78bfa]">nc</span>: <span className="text-[#34d399]">11</span><br/>
    <span className="text-[#a78bfa]">names</span>: [sleeping, writing, phone, reading...]<br/>
    <span className="text-muted/60"># model=yolov8x.pt epochs=50 best_mAP50=0.7485</span>
  </>),
  'buffer-overflow-attack-lab': (<>
    <span className="text-[#a78bfa]">attack_type</span>: <span className="text-accent3">stack_smashing</span>,<br/>
    <span className="text-[#a78bfa]">offset</span>: <span className="text-[#34d399]">76</span>,<br/>
    <span className="text-[#a78bfa]">target</span>: <span className="text-accent3">32-bit Linux ELF</span>,<br/>
    <span className="text-[#a78bfa]">mitigations</span>: [<span className="text-accent3">ASLR, canary</span>],<br/>
    <span className="text-[#a78bfa]">result</span>: <span className="text-[#34d399]">root_shell_obtained</span>
  </>),
  'formal-language-typing-game': (<>
    <span className="text-muted/60"># 9 patterns from Toc_final.py</span><br/>
    <span className="text-[#a78bfa]">a_star_b_star</span>: <span className="text-[#34d399]">DFA via regex ^a*b*$</span>,<br/>
    <span className="text-[#a78bfa]">balanced_parens</span>: <span className="text-[#34d399]">PDA stack</span>,<br/>
    <span className="text-[#a78bfa]">palindrome</span>: <span className="text-[#34d399]">s == s reversed</span>,<br/>
    <span className="text-[#a78bfa]">alternating_01</span>: <span className="text-[#34d399]">regex ^(01)*$</span>,<br/>
    <span className="text-muted/60"># scoring: +10 correct, -5 wrong, 45s timer</span>
  </>),
  'indoor-scene-recognition': (<>
    <span className="text-[#a78bfa]">class</span>: <span className="text-accent3">bedroom</span>,<br/>
    <span className="text-[#a78bfa]">confidence</span>: <span className="text-[#34d399]">0.91</span>,<br/>
    <span className="text-[#a78bfa]">inference_time_ms</span>: <span className="text-[#34d399]">230</span>,<br/>
    <span className="text-[#a78bfa]">model</span>: <span className="text-accent3">yolov5s.pt</span>,<br/>
    <span className="text-[#a78bfa]">image_size</span>: <span className="text-accent3">640x640</span>
  </>),
  'global-harvest-imports': (<>
    <span className="text-muted/60"># schema.sql — 7 tables in 3NF</span><br/>
    <span className="text-[#a78bfa]">tables</span>: [Suppliers, Categories, Products, Customers, Orders...],<br/>
    <span className="text-[#a78bfa]">normalization</span>: <span className="text-accent3">3NF</span>,<br/>
    <span className="text-[#a78bfa]">generated_col</span>: <span className="text-accent3">Order_Items.subtotal</span>,<br/>
    <span className="text-[#a78bfa]">indexes</span>: [supplier_id, order_date, product_id]
  </>),
  'twitter-analytics-engagement': (<>
    <span className="text-muted/60"># Dataset: tweets_clean.csv</span><br/>
    <span className="text-[#a78bfa]">features</span>: [text_len, sin_hour, cos_hour, likes_mean],<br/>
    <span className="text-[#a78bfa]">best_model</span>: <span className="text-accent3">OLS R2=0.852</span>,<br/>
    <span className="text-[#a78bfa]">top_predictors</span>: [likes_mean, retweet_mean, text_len],<br/>
    <span className="text-[#a78bfa]">peak_hour</span>: <span className="text-[#34d399]">17-19</span>
  </>),
  'ai-srs-generator': (<>
    <span className="text-muted/60"># POST /generate-requirements response</span><br/>
    <span className="text-[#a78bfa]">requirements</span>: [<br/>
    &nbsp;&nbsp;The system shall allow users to sign up.,<br/>
    &nbsp;&nbsp;The system shall allow users to log in.,<br/>
    &nbsp;&nbsp;The system shall generate requirements using AI.<br/>
    ],<br/>
    <span className="text-muted/60"># Pydantic: input=str, output=List[str]</span>
  </>),
  'sorting-algorithms-benchmark': (<>
    <span className="text-muted/60"># Benchmark config</span><br/>
    <span className="text-[#a78bfa]">sizes</span>: [500, 1000, 5000, 10000, 50000, 100000],<br/>
    <span className="text-[#a78bfa]">datasets</span>: [random, nearly_sorted, reversed],<br/>
    <span className="text-[#a78bfa]">algorithms</span>: [TimSort, RadixSort, BucketSort],<br/>
    <span className="text-[#a78bfa]">best_overall</span>: <span className="text-accent3">RadixSort</span>
  </>),
}

const STRUCTURE_CONTENT: Record<string, React.ReactNode> = {
  'resume-intelligence-engine': (<>
    <div><span className="text-accent">📁</span> <span className="text-muted">Resume-Intelligence-Engine/</span></div>
    <div className="text-muted">├─ <span className="text-accent3">app.py</span>            <span className="text-muted/40">FastAPI entry</span></div>
    <div className="text-muted">├─ <span className="text-[#a78bfa]">jd_extract.py</span>    <span className="text-muted/40">NLP extractor</span></div>
    <div className="text-muted">├─ <span className="text-[#a78bfa]">llm_extract.py</span>   <span className="text-muted/40">LLM extractor</span></div>
    <div className="text-muted">├─ <span className="text-[#a78bfa]">ats_check.py</span>     <span className="text-muted/40">ATS scorer</span></div>
    <div className="text-muted">├─ <span className="text-[#a78bfa]">learner.py</span>       <span className="text-muted/40">Adaptive AI</span></div>
    <div className="text-muted">├─ <span className="text-[#a78bfa]">recruiter_msg.py</span> <span className="text-muted/40">Email drafter</span></div>
    <div className="text-muted">├─ <span className="text-accent3">dashboard.html</span>    <span className="text-muted/40">Web UI</span></div>
    <div className="text-muted">├─ <span className="text-accent3">jobs.db</span>           <span className="text-muted/40">SQLite store</span></div>
    <div className="text-muted">└─ <span className="text-[#34d399]">tests/</span>            <span className="text-muted/40">pytest suite</span></div>
  </>),
  'classroom-behavior-detection': (<>
    <div><span className="text-accent">📁</span> <span className="text-muted">classroom-behavior-detection/</span></div>
    <div className="text-muted">├─ <span className="text-[#a78bfa]">YOLOv8x_SCB05.ipynb</span> <span className="text-muted/40">Colab notebook</span></div>
    <div className="text-muted">├─ <span className="text-accent3">tiled_inference.py</span>   <span className="text-muted/40">CCTV pipeline</span></div>
    <div className="text-muted">├─ <span className="text-accent3">gradcam_viz.py</span>       <span className="text-muted/40">Explainability</span></div>
    <div className="text-muted">├─ <span className="text-[#34d399]">SCB-05/</span>              <span className="text-muted/40">Roboflow export</span></div>
    <div className="text-muted">├─ <span className="text-[#a78bfa]">scb05.yaml</span>           <span className="text-muted/40">Dataset config</span></div>
    <div className="text-muted">└─ <span className="text-[#34d399]">runs/detect/weights/</span> <span className="text-muted/40">best.pt</span></div>
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
    <div><span className="text-accent">📄</span> <span className="text-[#a78bfa]">Toc_final.py</span> <span className="text-muted/60">single file ~140 lines</span></div>
    <div className="text-muted mt-2">class <span className="text-[#a78bfa]">TypingGame</span>:</div>
    <div className="text-muted">  ├─ <span className="text-accent3">__init__</span>         <span className="text-muted/40">UI setup · 9 sentences</span></div>
    <div className="text-muted">  ├─ <span className="text-accent3">start_game</span>      <span className="text-muted/40">Reset state · 45s timer</span></div>
    <div className="text-muted">  ├─ <span className="text-[#34d399]">validate_sentence</span> <span className="text-muted/40">DFA · PDA · Palindrome</span></div>
    <div className="text-muted">  └─ <span className="text-accent3">end_game</span>        <span className="text-muted/40">Disable · show restart</span></div>
    <div className="text-muted/50 mt-2">stdlib only: tkinter · re · random · time</div>
  </>),
  'indoor-scene-recognition': (<>
    <div><span className="text-accent">📁</span> <span className="text-muted">indoor-recognition-main/</span></div>
    <div className="text-muted">├─ <span className="text-accent3">restapi.py</span>      <span className="text-muted/40">REST API server</span></div>
    <div className="text-muted">├─ <span className="text-accent3">webapp.py</span>       <span className="text-muted/40">Web app server</span></div>
    <div className="text-muted">├─ <span className="text-[#f59e0b]">yolov5s.pt</span>     <span className="text-muted/40">14.4MB model</span></div>
    <div className="text-muted">├─ <span className="text-accent3">Dockerfile</span>      <span className="text-muted/40">Container config</span></div>
    <div className="text-muted">├─ <span className="text-[#34d399]">templates/</span>     <span className="text-muted/40">Jinja2 HTML</span></div>
    <div className="text-muted">├─ <span className="text-[#34d399]">tests/</span>         <span className="text-muted/40">pytest suite</span></div>
    <div className="text-muted">└─ <span className="text-accent3">requirements.txt</span> <span className="text-muted/40">Dependencies</span></div>
  </>),
  'global-harvest-imports': (<>
    <div><span className="text-accent">📁</span> <span className="text-muted">global-harvest-imports/</span></div>
    <div className="text-muted">├─ <span className="text-[#a78bfa]">schema.sql</span>      <span className="text-muted/40">7 tables · FK · indexes</span></div>
    <div className="text-muted">├─ <span className="text-[#a78bfa]">seed_data.sql</span>   <span className="text-muted/40">Sample data</span></div>
    <div className="text-muted">├─ <span className="text-[#a78bfa]">queries.sql</span>     <span className="text-muted/40">5 analytical queries</span></div>
    <div className="text-muted">└─ <span className="text-[#34d399]">erd_notes.md</span>    <span className="text-muted/40">ERD · 3NF rationale</span></div>
  </>),
  'twitter-analytics-engagement': (<>
    <div><span className="text-accent">📁</span> <span className="text-muted">twitter-analytics/</span></div>
    <div className="text-muted">├─ <span className="text-[#a78bfa]">twitter_analytics.py</span> <span className="text-muted/40">Main pipeline</span></div>
    <div className="text-muted">├─ <span className="text-accent3">tweets_clean.csv</span>     <span className="text-muted/40">Dataset</span></div>
    <div className="text-muted">├─ <span className="text-[#a78bfa]">models.py</span>            <span className="text-muted/40">XGBoost · OLS · Prophet</span></div>
    <div className="text-muted">├─ <span className="text-[#34d399]">visualizations/</span>      <span className="text-muted/40">10 charts</span></div>
    <div className="text-muted">└─ <span className="text-accent3">requirements.txt</span></div>
    <div className="text-muted/50 mt-2">Co-dev: Darshan Joshi + Harshita Guduru · LTU 2025</div>
  </>),
  'ai-srs-generator': (<>
    <div><span className="text-accent">📁</span> <span className="text-muted">ai-srs-generator/</span></div>
    <div className="text-muted">├─ <span className="text-[#a78bfa]">backend/</span></div>
    <div className="text-muted">│  └─ <span className="text-accent3">main.py</span>        <span className="text-muted/40">FastAPI · Pydantic · CORS</span></div>
    <div className="text-muted">├─ <span className="text-[#34d399]">frontend/</span></div>
    <div className="text-muted">│  ├─ <span className="text-accent3">src/App.jsx</span>    <span className="text-muted/40">React · useState</span></div>
    <div className="text-muted">│  └─ <span className="text-accent3">vite.config.js</span> <span className="text-muted/40">Port 5173</span></div>
    <div className="text-muted">└─ <span className="text-accent3">requirements.txt</span>  <span className="text-muted/40">fastapi · uvicorn</span></div>
  </>),
  'sorting-algorithms-benchmark': (<>
    <div><span className="text-accent">📄</span> <span className="text-[#a78bfa]">sorting_benchmark.py</span> <span className="text-muted/40">single script</span></div>
    <div className="text-muted mt-1">def <span className="text-[#a78bfa]">timsort</span>(arr):    <span className="text-muted/40">RUN=32 · insertion+merge</span></div>
    <div className="text-muted">def <span className="text-[#a78bfa]">radix_sort</span>(arr):  <span className="text-muted/40">LSD · counting_sort</span></div>
    <div className="text-muted">def <span className="text-[#a78bfa]">bucket_sort</span>(arr): <span className="text-muted/40">value-range buckets</span></div>
    <div className="text-muted">def <span className="text-accent3">benchmark</span>():       <span className="text-muted/40">time · 9 combos</span></div>
    <div className="text-muted/50 mt-1">numpy · matplotlib · pandas</div>
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
        <div className="text-[#34d399]">✓ Complete</div>
      </>)}
    </div>
  )
}

function ScoresMock({ projectId, label }: { projectId?: string; label: string }) {
  const scores = (projectId && SCORES_CONTENT[projectId]) || SCORES_CONTENT['resume-intelligence-engine']
  return (
    <div className="p-5 h-full" style={{ background: 'var(--surface)' }}>
      <div className="text-[0.58rem] tracking-[0.12em] uppercase text-accent mb-4">{label}</div>
      <div className="space-y-3">
        {scores.map((s, i) => (
          <div key={i}>
            <div className="flex justify-between text-[0.62rem] mb-1">
              <span className="text-muted">{s.label}</span>
              <span className="text-accent font-mono">{s.val}%</span>
            </div>
            <div className="h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <div className={`h-full rounded-full bg-gradient-to-r ${s.color}`} style={{ width: `${s.val}%` }} />
            </div>
          </div>
        ))}
      </div>
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

      {active !== null && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setActive(null)}>
          <div className="bg-[color:var(--surface)] border border-white/[0.12] w-full max-w-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
              <div>
                <span className="text-[0.72rem] tracking-[0.1em] uppercase text-accent">{items[active].title}</span>
                <span className="text-[0.62rem] text-muted/60 ml-3">{items[active].description}</span>
              </div>
              <button onClick={() => setActive(null)} className="text-muted hover:text-white text-lg leading-none w-8 h-8 flex items-center justify-center">x</button>
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
