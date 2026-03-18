export const PERSON = {
  name: 'Darshan Joshi',
  title: 'AI Engineer · Computer Vision · NLP · Cybersecurity',
  email: 'joshidarshan193@gmail.com',
  phone: '+1 947 240 5099',
  location: 'Southfield, MI, USA',
  linkedin: 'https://linkedin.com/in/darshanjoshi05',
  github: 'https://github.com/darshanjoshi05',
  scholar: 'https://scholar.google.com/scholar?q=Darshan+Joshi+AI+Engineer',
  bio: [
    "I'm a CS engineer at the intersection of AI research and production engineering. Currently a Research Assistant at Lawrence Technological University, I build real-time behavior detection systems with YOLOv8 and PyTorch — from dataset curation and YAML pipeline design through Grad-CAM explainability and deployment.",
    "My technical range spans computer vision (YOLOv8, Grad-CAM, OpenCV), NLP and API engineering (FastAPI, regex pipelines, document generation), deep learning (CNN-LSTM hybrid models for seismic prediction), and cybersecurity (buffer overflow analysis, exploit research, EC-Council certified across 5 domains).",
"I have 5 published and in-progress research papers spanning enterprise cybersecurity, AI-based behavior detection, earthquake prediction with CNN-LSTM, NLP-driven document intelligence, and new research. I care deeply about model interpretability, responsible AI, and clean modular architecture.",
  ],
  stats: [
    { value: '3.75', label: "Master's GPA" },
{ value: '5', label: 'Publications' },
    { value: '5',    label: 'EC-Council Certs' },
    { value: '11+',  label: 'YOLO Classes' },
  ],
}

export const SKILLS = [
  { name: 'Python',      hot: true },
  { name: 'YOLOv8',     hot: true },
  { name: 'PyTorch',    hot: true },
  { name: 'FastAPI',    hot: true },
  { name: 'OpenCV',     hot: false },
  { name: 'Scikit-Learn', hot: false },
  { name: 'NLP',        hot: false },
  { name: 'Grad-CAM',   hot: false },
  { name: 'React JS',   hot: false },
  { name: 'SQL',        hot: false },
  { name: 'C / C++',    hot: false },
  { name: 'Java',       hot: false },
  { name: 'GIT',        hot: false },
  { name: 'REST APIs',  hot: false },
  { name: 'ReportLab',  hot: true },
  { name: 'python-docx', hot: true },
  { name: 'GDB',        hot: false },
  { name: 'YAML',       hot: false },
  { name: 'Matplotlib', hot: false },
  { name: 'Bootstrap',  hot: false },
]

export const EXPERIENCE = [
  {
    role: 'Research Assistant',
    org: 'Lawrence Technological University',
    location: 'Southfield, MI',
    period: 'Dec 2024 — Present',
    current: true,
    points: [
      'Led end-to-end development of an AI-based classroom behavior detection system using YOLOv8 with measurable Precision, Recall, and mAP performance metrics.',
      'Designed and curated structured multi-class datasets (11+ behavioral classes), enforcing annotation quality under limited hardware resources.',
      'Integrated Grad-CAM explainability techniques to enhance model interpretability and support responsible AI practices.',
      'Conducted iterative hyperparameter optimization and documented reproducible YAML-based training workflows.',
      'Collaborated with faculty advisors to refine experimental scope and presented findings in structured research updates.',
      'Independently troubleshot training instability, environment configuration issues, and dataset inconsistencies.',
      'Maintained organized documentation of experiments, configuration files, and dataset revisions for long-term sustainability.',
    ],
  },
]

export interface Project {
  id: string
  num: string
  name: string
  tagline: string
  description: string
  stack: string[]
  category: string[]
  featured: boolean
  github: string
  period: string
  overview: {
    type: string
    status: string
    year: string
    role: string
  }
  stats: { value: string; label: string }[]
  bullets: string[]
  architecture: {
    nodes: { id: string; label: string; sublabel: string; color: string; row: number; col: number }[]
    edges: { from: string; to: string }[]
  }
  gallery: {
    title: string
    description: string
    type: 'terminal' | 'metrics' | 'json' | 'structure' | 'scores'
  }[]
  insights: string
}

export const PROJECTS: Project[] = [
  {
    id: 'resume-intelligence-engine',
    num: '01',
    name: 'Resume Intelligence Engine',
    tagline: 'AI-Powered JD-Aware Resume Generation System',
    description: 'A modular FastAPI backend that dynamically generates tailored resumes and cover letters from job descriptions. Features NLP-driven JD parsing, skills prioritization, experience reordering, and PDF/DOCX export.',
    stack: ['FastAPI', 'Python', 'NLP', 'Regex', 'ReportLab', 'python-docx', 'REST API', 'Jinja2'],
    category: ['ai', 'backend'],
    featured: true,
    github: 'https://github.com/darshanjoshi05',
    period: '2026 – Present',
    overview: { type: 'Backend AI System', status: 'In Development', year: '2026', role: 'Solo Engineer' },
    stats: [{ value: '6', label: 'Modules' }, { value: '3', label: 'Export Formats' }, { value: '87%', label: 'Avg Suitability' }],
    bullets: [
      'Architected and implemented a modular FastAPI backend for dynamic resume and cover letter generation from JDs.',
      'Designed an NLP-driven JD parsing pipeline using regex and heuristic classification to extract skills, responsibilities, and role families.',
      'Engineered dynamic skills prioritization and experience reordering mechanism for recruiter relevance.',
      'Developed rule-based intelligence for summary auto-generation and project relevance scoring.',
      'Built scalable PDF/DOCX generation workflow using ReportLab and python-docx.',
      'Structured codebase into independent modules: profile store, suitability engine, skill bridging, generator.',
    ],
    architecture: {
      nodes: [
        { id: 'input',     label: 'JD Input',         sublabel: 'JSON / Text',        color: 'blue',   row: 0, col: 0 },
        { id: 'fastapi',   label: 'FastAPI Router',    sublabel: 'REST Endpoints',     color: 'purple', row: 1, col: 0 },
        { id: 'parser',    label: 'JD Parser',         sublabel: 'NLP · Regex',        color: 'blue',   row: 2, col: 0 },
        { id: 'suit',      label: 'Suitability',       sublabel: 'Scoring · Ranking',  color: 'blue',   row: 2, col: 1 },
        { id: 'bridge',    label: 'Skill Bridge',      sublabel: 'Prioritization',     color: 'blue',   row: 2, col: 2 },
        { id: 'profile',   label: 'Profile Store',     sublabel: 'Candidate Data',     color: 'blue',   row: 2, col: 3 },
        { id: 'gen',       label: 'Generator',         sublabel: 'Content Builder',    color: 'amber',  row: 3, col: 0 },
        { id: 'pdf',       label: 'PDF Export',        sublabel: 'ReportLab',          color: 'green',  row: 4, col: 0 },
        { id: 'docx',      label: 'DOCX Export',       sublabel: 'python-docx',        color: 'green',  row: 4, col: 1 },
        { id: 'json',      label: 'JSON Response',     sublabel: 'REST API',           color: 'green',  row: 4, col: 2 },
      ],
      edges: [
        { from: 'input', to: 'fastapi' }, { from: 'fastapi', to: 'parser' },
        { from: 'fastapi', to: 'suit' },  { from: 'fastapi', to: 'bridge' },
        { from: 'fastapi', to: 'profile' }, { from: 'parser', to: 'gen' },
        { from: 'suit', to: 'gen' }, { from: 'bridge', to: 'gen' },
        { from: 'profile', to: 'gen' }, { from: 'gen', to: 'pdf' },
        { from: 'gen', to: 'docx' }, { from: 'gen', to: 'json' },
      ],
    },
    gallery: [
      { title: 'API Terminal Output', description: 'FastAPI server live generation log', type: 'terminal' },
      { title: 'Skill Match Scores', description: 'Per-skill suitability scoring', type: 'scores' },
      { title: 'JSON API Response', description: 'Structured response payload', type: 'json' },
      { title: 'Project Structure', description: 'Modular file organization', type: 'structure' },
    ],
    insights: '### What I Built\n\nA **modular FastAPI backend** that generates tailored resumes on-the-fly by parsing job descriptions with NLP.\n\n### Key Challenges\n\n- Designing a robust `jd_parser` that handles unstructured text reliably\n- Getting the skill prioritization order right without manual rules\n- Making PDF layout consistent across different content lengths\n\n### What I Learned\n\n- **Regex + heuristics** can outperform heavy NLP models for well-scoped tasks\n- Modular architecture pays off immediately when adding new export formats\n\n### Next Steps\n\n- Add an LLM-powered summary rewriter as an optional layer\n- Build a frontend UI for non-technical users',
  },
  {
    id: 'classroom-behavior-detection',
    num: '02',
    name: 'Classroom Behavior Detection',
    tagline: 'Multi-Class Object Detection · YOLOv8',
    description: 'Research project designing and training a multi-class classroom behavior detection model using YOLOv8 and PyTorch, with Grad-CAM integration for model explainability.',
    stack: ['YOLOv8', 'PyTorch', 'Grad-CAM', 'YAML', 'OpenCV', 'Python'],
    category: ['ai'],
    featured: false,
    github: 'https://github.com/darshanjoshi05',
    period: 'Dec 2024 – Present',
    overview: { type: 'Computer Vision', status: 'Active Research', year: '2024', role: 'Research Assistant' },
    stats: [{ value: '11+', label: 'Behavior Classes' }, { value: 'mAP@50', label: 'Metric' }, { value: 'CPU', label: 'Training Env' }],
    bullets: [
      'Designed and trained multi-class detection model with YOLOv8 and PyTorch (11+ behavioral classes).',
      'Structured and validated custom dataset with disciplined data organization and quality control.',
      'Configured YAML training pipelines and optimized hyperparameters (epochs, image size, batch size).',
      'Improved mAP@50 through structured debugging and performance analysis.',
      'Explored Grad-CAM integration for model explainability and responsible AI.',
      'Managed CPU-based training environments with virtual environment setups.',
    ],
    architecture: {
      nodes: [
        { id: 'data',    label: 'Raw Dataset',      sublabel: 'Images + Annotations', color: 'blue',   row: 0, col: 0 },
        { id: 'aug',     label: 'Augmentation',     sublabel: 'Resize · Flip · Crop', color: 'blue',   row: 1, col: 0 },
        { id: 'yolo',    label: 'YOLOv8 Model',     sublabel: 'PyTorch Backbone',     color: 'purple', row: 2, col: 0 },
        { id: 'train',   label: 'Training Loop',    sublabel: 'YAML Config · GPU/CPU', color: 'purple', row: 3, col: 0 },
        { id: 'eval',    label: 'Evaluation',       sublabel: 'mAP@50 · Precision',   color: 'amber',  row: 4, col: 0 },
        { id: 'gradcam', label: 'Grad-CAM',         sublabel: 'Explainability',       color: 'amber',  row: 4, col: 1 },
        { id: 'out',     label: 'Detection Output', sublabel: 'Bounding Boxes',       color: 'green',  row: 5, col: 0 },
      ],
      edges: [
        { from: 'data', to: 'aug' }, { from: 'aug', to: 'yolo' },
        { from: 'yolo', to: 'train' }, { from: 'train', to: 'eval' },
        { from: 'train', to: 'gradcam' }, { from: 'eval', to: 'out' },
        { from: 'gradcam', to: 'out' },
      ],
    },
    gallery: [
      { title: 'Training Output', description: 'YOLO training terminal logs', type: 'terminal' },
      { title: 'Class mAP Scores', description: 'Per-class detection performance', type: 'scores' },
      { title: 'Config JSON', description: 'YAML training configuration', type: 'json' },
      { title: 'Dataset Structure', description: 'Directory organization', type: 'structure' },
    ],
    insights: '### Research Context\n\nThis is my primary **research assistantship project** at Lawrence Tech.\n\n### Technical Challenges\n\n- 11+ behavioral classes with significant visual overlap\n- CPU-only training environment requiring careful batch size tuning\n- Annotation quality control across hundreds of images\n\n### Key Findings\n\n- **Grad-CAM** revealed the model focused on posture over facial features\n- Smaller batch sizes with higher epochs outperformed opposite configuration\n\n### Next Steps\n\n- GPU-accelerated training for faster iteration\n- Real-time video stream inference pipeline',
  },
  {
    id: 'buffer-overflow-attack-lab',
    num: '03',
    name: 'Buffer Overflow Attack Lab',
    tagline: 'Cybersecurity Research · Low-Level Systems',
    description: 'Analyzed buffer overflow vulnerabilities in 32-bit environments — stack smashing, heap overflow, format string attacks. Evaluated ASLR and stack canary countermeasures using GDB.',
    stack: ['C', 'GDB', 'x86 ASM', 'ASLR', 'Linux', 'Shell'],
    category: ['security'],
    featured: false,
    github: 'https://github.com/darshanjoshi05',
    period: 'Jan – Jun 2024',
    overview: { type: 'Security Research', status: 'Completed', year: '2024', role: 'Solo Researcher' },
    stats: [{ value: '3', label: 'Attack Vectors' }, { value: 'x86', label: 'Architecture' }, { value: 'Root', label: 'Privilege Level' }],
    bullets: [
      'Analyzed buffer overflow vulnerabilities in 32-bit environments, identifying security weaknesses.',
      'Manipulated memory locations and return addresses to bypass execution restrictions.',
      'Developed and tested exploit code to achieve root access via code injection and privilege escalation.',
      'Explored stack smashing, heap overflow, and format string attacks to evaluate security risks.',
      'Debugged and traced memory allocations using GDB, monitoring registers and stack behavior.',
      'Conducted post-exploit analysis testing ASLR and stack protection countermeasures.',
    ],
    architecture: {
      nodes: [
        { id: 'vuln',   label: 'Vulnerable Binary', sublabel: 'C / 32-bit',          color: 'blue',   row: 0, col: 0 },
        { id: 'input',  label: 'Crafted Input',     sublabel: 'Payload / Shellcode',  color: 'amber',  row: 1, col: 0 },
        { id: 'stack',  label: 'Stack Overflow',    sublabel: 'Return Addr Overwrite', color: 'purple', row: 2, col: 0 },
        { id: 'heap',   label: 'Heap Overflow',     sublabel: 'Metadata Corruption', color: 'purple', row: 2, col: 1 },
        { id: 'fmt',    label: 'Format String',     sublabel: '%x · %n Exploit',     color: 'purple', row: 2, col: 2 },
        { id: 'gdb',    label: 'GDB Analysis',      sublabel: 'Register · Stack Trace', color: 'blue', row: 3, col: 0 },
        { id: 'aslr',   label: 'ASLR Bypass',       sublabel: 'Countermeasure Test', color: 'amber',  row: 4, col: 0 },
        { id: 'root',   label: 'Root Access',       sublabel: 'Privilege Escalation', color: 'green',  row: 5, col: 0 },
      ],
      edges: [
        { from: 'vuln', to: 'input' }, { from: 'input', to: 'stack' },
        { from: 'input', to: 'heap' }, { from: 'input', to: 'fmt' },
        { from: 'stack', to: 'gdb' }, { from: 'heap', to: 'gdb' },
        { from: 'fmt', to: 'gdb' }, { from: 'gdb', to: 'aslr' },
        { from: 'aslr', to: 'root' },
      ],
    },
    gallery: [
      { title: 'GDB Session', description: 'Live debugging with stack traces', type: 'terminal' },
      { title: 'Exploit Success Rates', description: 'Attack vector effectiveness', type: 'scores' },
      { title: 'Memory Map', description: 'Process memory layout', type: 'json' },
      { title: 'Lab Structure', description: 'Exploit file organization', type: 'structure' },
    ],
    insights: '### What I Explored\n\nDeep-dive into **memory exploitation** in controlled 32-bit Linux environments.\n\n### Attack Vectors Tested\n\n- **Stack smashing**: Overwriting return address to redirect execution\n- **Heap overflow**: Corrupting heap metadata for arbitrary writes\n- **Format string**: Using `%n` to write to arbitrary memory locations\n\n### Key Insight\n\n`ASLR` significantly raises the difficulty but does not prevent exploitation when combined with **information leaks** that reveal base addresses.\n\n### EC-Council Connection\n\nThis lab reinforced and extended my **Ethical Hacking Essentials** certification curriculum.',
  },
  {
    id: 'formal-language-typing-game',
    num: '04',
    name: 'Formal Language Typing Game',
    tagline: 'Python · Tkinter · CS Education Tool',
    description: 'An interactive Python/Tkinter game visualizing formal language theory in real-time — regular expressions, palindromes, and balanced parentheses validation using stack-based logic.',
    stack: ['Python', 'Tkinter', 'Stack Logic', 'Regex', 'Automata Theory'],
    category: ['ai'],
    featured: false,
    github: 'https://github.com/darshanjoshi05',
    period: 'Oct – Dec 2024',
    overview: { type: 'Educational Tool', status: 'Completed', year: '2024', role: 'Solo Developer' },
    stats: [{ value: '3', label: 'Formal Languages' }, { value: 'Real-time', label: 'Validation' }, { value: 'GUI', label: 'Interface' }],
    bullets: [
      'Designed a Python-based interactive game using Tkinter for real-time formal language concept visualization.',
      'Implemented algorithms for regular expressions, palindromes, and balanced parentheses validation.',
      'Developed data processing functions to enhance user interaction and improve learning outcomes.',
      'Applied stack-based logic and automated error detection to refine gameplay mechanics.',
    ],
    architecture: {
      nodes: [
        { id: 'ui',     label: 'Tkinter GUI',       sublabel: 'User Interface',       color: 'blue',   row: 0, col: 0 },
        { id: 'input',  label: 'User Input',        sublabel: 'Keyboard Events',      color: 'blue',   row: 1, col: 0 },
        { id: 'regex',  label: 'Regex Engine',      sublabel: 'Pattern Matching',     color: 'purple', row: 2, col: 0 },
        { id: 'stack',  label: 'Stack Automaton',   sublabel: 'Palindrome / Parens',  color: 'purple', row: 2, col: 1 },
        { id: 'score',  label: 'Scoring System',    sublabel: 'Points · Timer',       color: 'amber',  row: 3, col: 0 },
        { id: 'out',    label: 'Visual Feedback',   sublabel: 'Correct / Wrong',      color: 'green',  row: 4, col: 0 },
      ],
      edges: [
        { from: 'ui', to: 'input' }, { from: 'input', to: 'regex' },
        { from: 'input', to: 'stack' }, { from: 'regex', to: 'score' },
        { from: 'stack', to: 'score' }, { from: 'score', to: 'out' },
      ],
    },
    gallery: [
      { title: 'Game Session', description: 'Live typing validation output', type: 'terminal' },
      { title: 'Accuracy Scores', description: 'Per-language accuracy rates', type: 'scores' },
      { title: 'State Machine', description: 'Automata configuration', type: 'json' },
      { title: 'Source Structure', description: 'Python module layout', type: 'structure' },
    ],
    insights: '### Learning Goal\n\nMake **formal language theory** tangible and interactive for CS students.\n\n### Implementation Choices\n\n- `Tkinter` chosen for zero-dependency desktop GUI\n- **Stack-based DFA** for balanced parentheses was elegant to implement\n- Regex compilation cached at startup for real-time feedback\n\n### What I Would Change\n\n- Port to a web app (Flask + JS) for broader accessibility\n- Add difficulty progression and leaderboard',
  },
  {
    id: 'global-harvest-imports',
    num: '05',
    name: 'Global Harvest Imports',
    tagline: 'Enterprise Database Architecture',
    description: 'Collaborated with domain specialists to design a relational database system using ERDs and DFDs, transforming multi-department requirements into a normalised logical schema.',
    stack: ['SQL', 'ERD', 'DFD', 'Schema Design', 'Normalization', 'MySQL'],
    category: ['db', 'backend'],
    featured: false,
    github: 'https://github.com/darshanjoshi05',
    period: 'Jan – Jun 2024',
    overview: { type: 'Database Design', status: 'Completed', year: '2024', role: 'Database Architect' },
    stats: [{ value: '3NF', label: 'Normalization' }, { value: 'ERD', label: 'Design Tool' }, { value: '5+', label: 'Departments' }],
    bullets: [
      'Collaborated with specialists to identify needs and understand data requirements across departments.',
      'Facilitated discussions to define system architecture, data relationships, and database schema.',
      'Executed database design phase using entity-relationship diagrams (ERDs) and data flow diagrams (DFDs).',
      'Transformed requirements into a logical data model with proper normalization.',
    ],
    architecture: {
      nodes: [
        { id: 'req',    label: 'Requirements',      sublabel: 'Stakeholder Input',    color: 'blue',   row: 0, col: 0 },
        { id: 'dfd',    label: 'DFD',               sublabel: 'Data Flow Diagram',    color: 'blue',   row: 1, col: 0 },
        { id: 'erd',    label: 'ERD',               sublabel: 'Entity Relationships', color: 'purple', row: 2, col: 0 },
        { id: 'norm',   label: 'Normalization',     sublabel: '1NF → 2NF → 3NF',     color: 'amber',  row: 3, col: 0 },
        { id: 'schema', label: 'Logical Schema',    sublabel: 'Tables · Constraints', color: 'amber',  row: 4, col: 0 },
        { id: 'db',     label: 'MySQL Database',    sublabel: 'Deployed Schema',      color: 'green',  row: 5, col: 0 },
      ],
      edges: [
        { from: 'req', to: 'dfd' }, { from: 'dfd', to: 'erd' },
        { from: 'erd', to: 'norm' }, { from: 'norm', to: 'schema' },
        { from: 'schema', to: 'db' },
      ],
    },
    gallery: [
      { title: 'SQL Output', description: 'Schema creation statements', type: 'terminal' },
      { title: 'Table Scores', description: 'Normalization compliance per table', type: 'scores' },
      { title: 'Schema JSON', description: 'Table definitions', type: 'json' },
      { title: 'DB Structure', description: 'Schema file layout', type: 'structure' },
    ],
    insights: '### Design Process\n\nFull **requirements → logical model** pipeline for a multi-department import company.\n\n### Key Design Decisions\n\n- Chose **3NF** normalization to eliminate transitive dependencies\n- Separate tables for Products, Suppliers, Orders, Shipments, Customers\n- Composite primary keys for junction tables\n\n### What I Learned\n\n- Stakeholder communication is 50% of database design\n- ERD-first approach prevents costly schema refactors later',
  },
]

export const EDUCATION = [
  {
    degree: 'Master of Science',
    field: 'Computer Science Engineering',
    school: 'Lawrence Technological University',
    location: 'Southfield, USA',
    gpa: '3.75 / 4.0',
    period: '2024 – 2025',
    type: 'Graduate',
    gpaNote: 'US Scale',
  },
  {
    degree: 'Bachelor of Engineering',
    field: 'Computer Science Engineering',
    school: 'Sree Dattha Institute of Engineering & Science',
    location: 'Hyderabad, India',
    gpa: '6.5 / 10',
    period: '2019 – 2023',
    type: 'Undergraduate',
    gpaNote: 'Indian Scale',
  },
]

export const CERTIFICATIONS = [
  { name: 'Network Defense Essentials', issuer: 'EC-Council' },
  { name: 'Ethical Hacking Essentials', issuer: 'EC-Council' },
  { name: 'Digital Forensics Essentials', issuer: 'EC-Council' },
  { name: 'Cisco Labs Crash Course', issuer: 'EC-Council' },
  { name: 'Website Hacking Techniques', issuer: 'EC-Council' },
  { name: 'Digital Marketing', issuer: 'General' },
  { name: 'Student Ambassador Program', issuer: 'General' },
]

export const PUBLICATIONS = [
  {
    id: 'cyber-security-infrastructure',
    num: '01',
    url: 'https://www.ijaresm.com/uploaded_files/document_file/Darshan_Joshi9Suj.pdf',
    doi: '',
    citedBy: 12,
    title: 'Design and Analysis of Cyber Security Infrastructure in Large Enterprises and Organisations',
    journal: 'IJARESM',
    journalFull: 'International Journal of Advanced Research in Engineering, Science and Management',
    year: '2023',
    status: 'Published',
    domain: 'Cybersecurity',
    type: 'Research Paper',
    abstract: 'A comprehensive study on enterprise cybersecurity architectures covering risk mitigation, layered defense strategies, and scalable infrastructure design. The paper synthesizes best practices across firewalls, IDS/IPS, SIEM systems, and endpoint protection frameworks.',
    description: 'Authored a comprehensive research study on enterprise cybersecurity architectures, focusing on risk mitigation, layered defense strategies, and scalable infrastructure design. Conducted systematic literature review of security framework components to derive actionable recommendations.',
    keywords: ['Cybersecurity', 'Enterprise Architecture', 'IDS/IPS', 'SIEM', 'Firewall', 'Risk Mitigation', 'Endpoint Protection'],
    points: [
      'Authored a comprehensive research study on enterprise cybersecurity architectures, focusing on risk mitigation, layered defense strategies, and scalable infrastructure design.',
      'Conducted systematic literature review of security framework components (firewalls, IDS/IPS, SIEM, endpoint protection) to derive actionable recommendations.',
      'Synthesized complex technical findings into a formal research manuscript, demonstrating disciplined documentation and analytical reasoning.',
      'Managed end-to-end research workflow including conceptualization, data collection, critical evaluation, and formal publication.',
      'Analyzed real-world enterprise network topologies and proposed a layered defense-in-depth model for large organizations.',
    ],
    highlights: [
      { label: 'Focus Area', value: 'Enterprise Cybersecurity' },
      { label: 'Framework', value: 'Defense-in-Depth' },
      { label: 'Key Topic', value: 'IDS/IPS · SIEM · Firewall' },
    ],
  },
  {
    id: 'classroom-behavior-detection-pub',
    num: '02',
    url: '',
    doi: '',
    citedBy: 0,
    title: 'Classroom Behavior Detection Using YOLOv8 and Explainable AI',
    journal: 'IJSRST',
    journalFull: 'International Journal of Scientific Research in Science and Technology',
    year: '2025',
    status: 'Under Review',
    domain: 'Computer Vision / AI',
    type: 'Research Article',
    abstract: 'This paper presents a real-time multi-class classroom behavior detection framework built with YOLOv8 and PyTorch. The system classifies 11+ student behavioral patterns in classroom environments with measurable Precision, Recall, and mAP@50 scores. Grad-CAM explainability layers are integrated to validate model decisions and support responsible AI deployment in educational settings.',
    description: 'Research paper documenting the design, dataset curation, training methodology, and Grad-CAM explainability analysis of the YOLOv8-based classroom behavior detection system developed at Lawrence Technological University.',
    keywords: ['YOLOv8', 'Computer Vision', 'Behavior Detection', 'Grad-CAM', 'Explainable AI', 'PyTorch', 'Object Detection', 'Education AI'],
    points: [
      'Designed and trained a YOLOv8 multi-class detection model covering 11+ behavioral categories in classroom environments.',
      'Structured and curated a custom annotated dataset with rigorous quality control under CPU-constrained hardware.',
      'Configured reproducible YAML-based training pipelines with systematic hyperparameter optimization.',
      'Achieved mAP@50 improvements through iterative debugging, augmentation strategies, and batch tuning.',
      'Integrated Grad-CAM heatmap visualization for model explainability and responsible AI validation.',
      'Proposed deployment strategies for real-time inference in resource-limited campus settings.',
    ],
    highlights: [
      { label: 'Model', value: 'YOLOv8 · PyTorch' },
      { label: 'Metric', value: 'mAP@50 Optimized' },
      { label: 'Innovation', value: 'Grad-CAM Explainability' },
    ],
  },
  {
    id: 'earthquake-prediction-cnn-lstm',
    num: '03',
    url: 'https://www.sciencepublishinggroup.com/article/10.11648/j.ajce.20251305.14',
    doi: '10.11648/j.ajce.20251305.14',
    citedBy: 0,
    title: 'Earthquake Prediction and Synthetic Seismogram Generation Using Hybrid CNN-LSTM Model',
    journal: 'American Journal of Civil Engineering',
    journalFull: 'American Journal of Civil Engineering',
    year: '2025',
    status: 'Published',
    domain: 'Deep Learning / Seismology',
    type: 'Research Paper',
    abstract: 'This paper presents a hybrid CNN-LSTM deep learning architecture for earthquake prediction and the generation of synthetic seismograms. The model leverages convolutional layers for spatial feature extraction from seismic waveform data and LSTM layers for temporal sequence modeling, enabling accurate magnitude prediction and realistic synthetic seismogram synthesis for data augmentation and simulation purposes.',
    description: 'A deep learning study combining CNN spatial feature extraction and LSTM temporal modeling to predict seismic events and generate synthetic seismograms, published in the American Journal of Civil Engineering, October 2025.',
    keywords: ['CNN', 'LSTM', 'Earthquake Prediction', 'Seismogram', 'Deep Learning', 'Hybrid Model', 'Seismology', 'Time Series'],
    points: [
      'Designed a hybrid CNN-LSTM architecture that combines convolutional spatial features with LSTM temporal sequence modeling for seismic data analysis.',
      'Developed a pipeline for processing real seismic waveform datasets and training multi-target prediction models for magnitude and location estimation.',
      'Implemented synthetic seismogram generation capabilities to augment training datasets for improved model generalization.',
      'Evaluated model performance against baseline deep learning models on established seismic datasets.',
      'Demonstrated that CNN-LSTM hybrid models outperform standalone CNN or LSTM architectures on temporal seismic prediction tasks.',
      'Published findings in the American Journal of Civil Engineering, October 30, 2025.',
    ],
    highlights: [
      { label: 'Architecture', value: 'CNN + LSTM Hybrid' },
      { label: 'Application', value: 'Seismic Prediction' },
      { label: 'Published', value: 'Oct 30, 2025' },
    ],
  },
  {
    id: 'nlp-resume-intelligence',
    num: '04',
    url: '',
    doi: '',
    citedBy: 0,
    title: 'NLP-Driven Resume Tailoring: A Modular Approach to JD-Aware Career Document Generation',
    journal: 'IJCST',
    journalFull: 'International Journal of Computer Science and Technology',
    year: '2026',
    status: 'Ready for Publication',
    domain: 'NLP / Backend AI',
    type: 'Technical Paper',
    abstract: 'This paper describes the architecture, design decisions, and evaluation of a FastAPI-based resume intelligence system that uses NLP techniques to parse job descriptions and generate tailored career documents. The system achieves 87%+ suitability scoring accuracy and sub-2-second generation latency.',
    description: 'A technical paper detailing the NLP pipeline, modular architecture, and performance benchmarks of the Resume Intelligence Engine — a system for automatic, JD-aware resume generation.',
    keywords: ['NLP', 'FastAPI', 'Resume Generation', 'JD Parsing', 'Document AI', 'Python', 'ReportLab'],
    points: [
      'Described the full architecture of a 6-module FastAPI system for NLP-driven resume generation.',
      'Benchmarked JD skill extraction accuracy against manually labeled datasets (87%+ suitability match).',
      'Evaluated PDF/DOCX generation latency and formatting consistency across diverse input lengths.',
      'Compared regex-based NLP heuristics against spaCy NER models for skill extraction precision.',
      'Proposed future directions including LLM-powered summary rewriting and ATS score prediction.',
    ],
    highlights: [
      { label: 'Accuracy', value: '87%+ Suitability' },
      { label: 'Latency', value: '<2s Generation' },
      { label: 'Stack', value: 'FastAPI · NLP · Python' },
    ],
  },
]

// Keep single for education page backward compat
export const PUBLICATION = PUBLICATIONS[0]

export const SKILL_GROUPS = [
  {
    title: 'AI / ML',
    items: [
      { name: 'Python', level: 95 }, { name: 'YOLOv8', level: 88 },
      { name: 'PyTorch', level: 82 }, { name: 'OpenCV', level: 80 }, { name: 'Scikit-Learn', level: 75 },
    ],
  },
  {
    title: 'Backend / APIs',
    items: [
      { name: 'FastAPI', level: 90 }, { name: 'NLP / Regex', level: 85 },
      { name: 'REST APIs', level: 88 }, { name: 'ReportLab', level: 80 }, { name: 'Jinja2', level: 75 },
    ],
  },
  {
    title: 'Languages',
    items: [
      { name: 'Python', level: 95 }, { name: 'C / C++', level: 80 },
      { name: 'Java', level: 72 }, { name: 'SQL', level: 78 }, { name: 'HTML/CSS', level: 82 },
    ],
  },
  {
    title: 'Security',
    items: [
      { name: 'Buffer Overflow', level: 85 }, { name: 'GDB Debugging', level: 80 },
      { name: 'Network Defense', level: 75 }, { name: 'Digital Forensics', level: 72 }, { name: 'Ethical Hacking', level: 70 },
    ],
  },
]
