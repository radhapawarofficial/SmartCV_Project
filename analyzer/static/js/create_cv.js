/* ==========================================================================
   PROJECT: SmartCV — create_cv.js
========================================================================== */

/* ═══════════════════════════════════════════════════════════════════════════
   01. CONSTANTS & STATE VARIABLES
   ═══════════════════════════════════════════════════════════════════════════ */
const ACTION_VERBS = [
    // Original verbs
    'developed', 'managed', 'created', 'led', 'increased', 'designed', 'implemented',
    'coordinated', 'analyzed', 'executed', 'built', 'spearheaded', 'optimized',
    'automated', 'presented', 'collaborated', 'delivered', 'architected', 'deployed',
    'integrated', 'engineered', 'migrated', 'reduced', 'improved', 'launched',
    'streamlined', 'negotiated', 'mentored', 'established', 'drove',

    // Technical & Engineering (Cloud, Dev, Security)
    'refactored', 'debugged', 'configured', 'monitored', 'provisioned', 'hardened',
    'orchestrated', 'scripted', 'scaled', 'tested', 'validated', 'resolved',

    // Data & Analysis (Data Science, Analyst, Finance)
    'interpreted', 'forecasted', 'modeled', 'mined', 'visualized', 'audited',
    'quantified', 'extracted', 'reconciled', 'projected', 'assessed', 'mapped',

    // Leadership & Strategy (PM, Executive, Operations)
    'directed', 'facilitated', 'governed', 'pioneered', 'transformed', 'accelerated',
    'restructured', 'budgeted', 'supervised', 'delegated', 'centralized', 'authorized',

    // Healthcare & Clinical (Physicians, Nursing, Therapy)
    'diagnosed', 'administered', 'treated', 'rehabilitated', 'monitored', 'prescribed',
    'charted', 'evaluated', 'counseled', 'intervened', 'stabilized', 'coordinated',

    // Education & Training (Teachers, Instructors, Instructional Design)
    'instructed', 'educated', 'tutored', 'curated', 'lectured', 'fostered',
    'standardized', 'assessed', 'simplified', 'empowered', 'cultivated', 'mentored',

    // Sales & Marketing (BDM, Growth, Creative)
    'acquired', 'converted', 'retained', 'persuaded', 'marketed', 'publicized',
    'conceptualized', 'pitched', 'captured', 'generated', 'influenced', 'positioned',

    // Logistics & Skilled Trades (Supply Chain, Technicians)
    'dispatched', 'procured', 'maintained', 'installed', 'fabricated', 'repaired',
    'operated', 'inspected', 'stocked', 'expedited', 'allocated', 'shipped'
];

const JOB_KEYWORDS = {
    // Development & Engineering
    'backend developer': ['node.js', 'python', 'java', 'go', 'api design', 'sql', 'nosql', 'microservices', 'authentication', 'rest'],
    'frontend developer': ['html', 'css', 'javascript', 'react', 'vue', 'angular', 'responsive design', 'git', 'webpack', 'typescript'],
    'full stack developer': ['frontend', 'backend', 'react', 'angular', 'vue', 'node.js', 'express', 'mongodb', 'postgresql', 'rest api', 'graphql', 'typescript', 'webpack', 'responsive design'],
    'mobile app developer': ['swift', 'kotlin', 'react native', 'flutter', 'ios', 'android', 'xcode', 'android studio', 'mvvm', 'rest api', 'firebase', 'app store', 'google play', 'mobile ui'],
    'qa engineer': ['selenium', 'automation testing', 'test plans', 'jira', 'ci/cd', 'performance testing', 'api testing', 'cypress'],
    'software architect': ['microservices', 'design patterns', 'scalability', 'system design', 'cloud architecture', 'security best practices', 'devops', 'ci/cd', 'docker', 'kubernetes'],
    'software engineer': ['python', 'java', 'javascript', 'react', 'node.js', 'api', 'database', 'sql', 'git', 'agile', 'scrum', 'devops', 'ci/cd', 'docker', 'kubernetes', 'aws', 'azure', 'cloud'],
    'software tester': ['manual testing', 'test cases', 'bug tracking', 'regression testing', 'black box testing', 'sdlc', 'test documentation'],
    'web developer': ['html', 'css', 'javascript', 'react', 'vue', 'angular', 'sass', 'webpack', 'responsive design', 'cross-browser', 'accessibility', 'seo', 'performance optimization'],

    // Data & Artificial Intelligence
    'business intelligence developer': ['sql', 'power bi', 'tableau', 'dax', 'etl', 'data modeling', 'ssis', 'ssrs', 'ssas', 'data warehousing', 'looker', 'snowflake'],
    'data analyst': ['sql', 'python', 'r', 'excel', 'tableau', 'power bi', 'statistics', 'data visualization', 'data mining', 'pandas', 'google analytics', 'cleaning'],
    'data engineer': ['python', 'java', 'scala', 'sql', 'nosql', 'etl', 'spark', 'hadoop', 'kafka', 'airflow', 'data warehousing', 'redshift', 'bigquery', 'dbt', 'data pipelines', 'aws', 'azure'],
    'data scientist': ['python', 'r', 'machine learning', 'deep learning', 'tensorflow', 'pytorch', 'pandas', 'numpy', 'scikit-learn', 'sql', 'tableau', 'power bi', 'statistical analysis', 'nlp', 'computer vision', 'data modeling', 'big data'],
    'machine learning engineer': ['python', 'tensorflow', 'pytorch', 'scikit-learn', 'mlops', 'neural networks', 'deep learning', 'computer vision', 'nlp', 'deployment', 'kubeflow', 'mlflow'],

    // Infrastructure, Cloud & Security
    'cloud architect': ['aws', 'azure', 'gcp', 'infrastructure as code', 'terraform', 'cloud migration', 'microservices', 'scalability', 'serverless'],
    'devOps engineer': ['jenkins', 'docker', 'kubernetes', 'terraform', 'ansible', 'aws', 'azure', 'gcp', 'ci/cd', 'bash', 'python', 'monitoring', 'prometheus', 'grafana', 'linux'],
    'ethical hacker': ['ceh', 'penetration testing', 'cybersecurity', 'cryptography', 'networking', 'vulnerability management', 'python', 'security audits'],
    'network engineer': ['cisco', 'routing', 'switching', 'tcp/ip', 'vpn', 'firewall', 'network protocols', 'lan/wan', 'bgp'],
    'penetration tester': ['metasploit', 'burp suite', 'nmap', 'kali linux', 'vulnerability assessment', 'network security', 'web app security', 'oscp'],
    'security analyst': ['siem', 'soc', 'incident response', 'firewall', 'intrusion detection', 'threat intelligence', 'security audits', 'wireshark'],
    'security architect': ['cloud security', 'firewall', 'encryption', 'iam', 'network architecture', 'risk management', 'compliance', 'zero trust'],
    'site reliability engineer': ['devops', 'automation', 'python', 'ci/cd', 'kubernetes', 'docker', 'monitoring', 'reliability', 'incident response'],
    'system administrator': ['linux', 'windows server', 'virtualization', 'active directory', 'shell scripting', 'networking', 'troubleshooting', 'powershell'],

    // Design & User Experience
    'graphic designer': ['photoshop', 'illustrator', 'indesign', 'branding', 'typography', 'color theory', 'layout design', 'print design', 'digital design', 'logo design'],
    'ui designer': ['figma', 'adobe xd', 'sketch', 'typography', 'color theory', 'prototyping', 'visual design', 'responsive design', 'interface design'],
    'ui/ux designer': ['figma', 'sketch', 'adobe xd', 'prototyping', 'wireframing', 'user research', 'usability testing', 'design systems', 'responsive design', 'interaction design', 'information architecture'],
    'ux designer': ['user research', 'wireframing', 'user flows', 'information architecture', 'usability testing', 'figma', 'interaction design', 'prototyping'],
    'ux researcher': ['qualitative research', 'quantitative research', 'user interviews', 'surveys', 'usability testing', 'data analysis', 'persona development'],

    // Business, Management & Compliance
    'compliance officer': ['regulatory compliance', 'risk assessment', 'auditing', 'policy development', 'gdpr', 'hipaa', 'ethics', 'governance', 'aml'],
    'it business analyst': ['requirements gathering', 'process mapping', 'uml', 'sql', 'data analysis', 'stakeholder management', 'swot analysis', 'gap analysis', 'documentation', 'jira', 'confluence', 'sdlc', 'bpmn'],
    'product manager': ['product roadmap', 'user stories', 'backlog', 'a/b testing', 'analytics', 'market research', 'competitive analysis', 'stakeholder management', 'agile', 'kpi', 'mvp', 'feature prioritization', 'product lifecycle'],
    'project manager': ['agile', 'scrum', 'jira', 'risk management', 'stakeholder communication', 'budgeting', 'timeline', 'gantt chart', 'pmp', 'prince2', 'resource allocation', 'sprint planning', 'ms project'],
    'scrum master': ['agile', 'scrum framework', 'kanban', 'jira', 'facilitation', 'sprint planning', 'retrospectives', 'servant leadership', 'coaching'],

    // Marketing & Communications
    'brand manager': ['brand identity', 'brand strategy', 'equity', 'market positioning', 'messaging', 'storytelling', 'competitor analysis'],
    'content strategist': ['content calendar', 'editorial', 'seo', 'storytelling', 'cms', 'copywriting', 'content auditing', 'user journey'],
    'copywriter': ['creative writing', 'branding', 'ads', 'scripts', 'blogging', 'persuasive writing', 'editing', 'headlines'],
    'creative director': ['art direction', 'visual design', 'leadership', 'brand vision', 'creative strategy', 'photography', 'video production'],
    'digital marketing specialist': ['ppc', 'sem', 'seo', 'email marketing', 'google analytics', 'social media', 'google ads', 'content marketing'],
    'email marketing specialist': ['mailchimp', 'automation', 'segmentation', 'a/b testing', 'crm', 'copywriting', 'deliverability', 'klaviyo'],
    'event coordinator': ['logistics', 'vendor management', 'budgeting', 'planning', 'promotion', 'virtual events', 'project management'],
    'growth hacker': ['user acquisition', 'viral marketing', 'a/b testing', 'analytics', 'seo', 'content marketing', 'product growth', 'conversion optimization'],
    'market research analyst': ['consumer behavior', 'surveys', 'focus groups', 'data trends', 'competitive analysis', 'spss', 'statistical analysis'],
    'marketing manager': ['campaign management', 'budgeting', 'kpi tracking', 'branding', 'market research', 'stakeholder management', 'marketing strategy'],
    'performance marketing analyst': ['roas', 'cac', 'ppc', 'conversion tracking', 'data analysis', 'attribution modeling', 'paid social'],
    'product marketing manager': ['go-to-market (gtm)', 'product positioning', 'sales enablement', 'competitive intelligence', 'persona development'],
    'public relations (pr) specialist': ['media relations', 'press releases', 'crisis management', 'storytelling', 'networking', 'earned media'],
    'seo specialist': ['keyword research', 'link building', 'on-page seo', 'technical seo', 'google search console', 'ahrefs', 'semrush'],
    'social media manager': ['community management', 'content creation', 'engagement', 'social analytics', 'buffer', 'hootsuite', 'influencer marketing'],

    // Sales & Business Development
    'account Executive': ['closing deals', 'relationship management', 'crm', 'sales pitch', 'pipeline management', 'negotiation'],
    'account Manager': ['client retention', 'upselling', 'cross-selling', 'relationship building', 'portfolio management', 'customer loyalty'],
    'business Development Manager (BDM)': ['lead generation', 'networking', 'strategic partnerships', 'prospecting', 'market expansion'],
    'channel Manager': ['partner management', 'distribution', 'resellers', 'alliance building', 'joint ventures', 'partner enablement'],
    'closer': ['high-stakes negotiation', 'deal execution', 'objections handling', 'urgency creation', 'final signatures', 'sales psychology'],
    'customer success manager': ['onboarding', 'retention', 'churn reduction', 'customer satisfaction', 'advocacy', 'account health'],
    'field sales representative': ['face-to-face sales', 'travel', 'territory management', 'networking', 'on-site presentations'],
    'inside sales representative': ['telesales', 'lead qualification', 'virtual demos', 'crm management', 'prospecting', 'outbound calling'],
    'retail sales associate': ['customer service', 'point of sale (pos)', 'merchandising', 'inventory management', 'communication', 'product knowledge'],
    'sales development representative (SDR)': ['outbound sales', 'cold calling', 'prospecting', 'lead qualification', 'salesforce', 'cadence management'],
    'sales director': ['sales leadership', 'forecasting', 'revenue growth', 'talent management', 'p&l management', 'strategic planning'],
    'sales operations manager': ['salesforce admin', 'sales reporting', 'process automation', 'data analysis', 'quota setting', 'crm optimization'],
    'sales trainer': ['sales coaching', 'curriculum development', 'sales methodology', 'public speaking', 'mentorship', 'onboarding'],
    'technical sales engineer': ['product demonstrations', 'technical solutions', 'pre-sales', 'saas', 'implementation consulting', 'rfp responses'],
    'territory manager': ['regional sales', 'market growth', 'distribution networks', 'territory planning', 'sales strategy', 'account mapping'],

    // Clinical & Direct Care
    'physician / surgeon': ['patient diagnosis', 'treatment planning', 'surgery', 'medical records', 'leadership', 'board certified', 'emr'],
    'registered nurse': ['patient monitoring', 'medication administration', 'bls', 'acls', 'wound care', 'triage', 'ehr', 'patient education'],
    'nurse practitioner': ['diagnostic testing', 'primary care', 'prescription authority', 'patient assessment', 'chronic disease management'],
    'physician assistant': ['clinical rounds', 'patient exams', 'diagnostic procedures', 'suturing', 'collaborative care', 'medical history'],
    'pharmacist': ['medication therapy management', 'drug interactions', 'dispensing', 'immunizations', 'pharmaceutical counseling', 'inventory'],
    'dentist': ['oral surgery', 'diagnostics', 'fillings', 'patient education', 'orthodontics', 'prosthodontics', 'hygiene'],
    'physical therapist': ['rehabilitation', 'mobility training', 'manual therapy', 'exercise prescription', 'patient assessment', 'pain management'],
    'occupational therapist': ['activities of daily living', 'adaptive equipment', 'fine motor skills', 'rehabilitation', 'sensory integration'],
    'speech-language pathologist': ['speech therapy', 'swallowing disorders', 'cognitive communication', 'articulation', 'audiology', 'aac'],
    'radiologic technologist': ['x-ray', 'radiation safety', 'positioning', 'image processing', 'fluoroscopy', 'patient care', 'dicom'],
    'medical assistant': ['vital signs', 'phlebotomy', 'administrative support', 'patient intake', 'ekg', 'medical terminology', 'cma'],
    'phlebotomist': ['venipuncture', 'blood collection', 'specimen handling', 'patient safety', 'lab processing', 'sanitization'],
    'emergency medical technician': ['basic life support', 'emergency response', 'cpr', 'triage', 'trauma care', 'ambulance operations'],
    'paramedic': ['advanced life support', 'intubation', 'iv therapy', 'emergency pharmacology', 'cardiac monitoring', 'trauma'],
    'dialysis technician': ['hemodialysis', 'patient monitoring', 'equipment maintenance', 'water treatment', 'cannulation', 'patient safety'],

    // Specialized Medicine
    'cardiologist': ['cardiology', 'echocardiogram', 'ecg/ekg', 'cardiovascular health', 'heart failure', 'stenting', 'stress tests'],
    'dermatologist': ['skin cancer', 'dermatopathology', 'acne treatment', 'biopsy', 'cosmetic dermatology', 'laser therapy'],
    'pediatrician': ['infant care', 'immunizations', 'growth monitoring', 'childhood development', 'preventative care', 'adolescent medicine'],
    'psychiatrist': ['psychotherapy', 'medication management', 'dsm-5', 'mental health diagnosis', 'crisis intervention', 'psychopharmacology'],
    'anesthesiologist': ['general anesthesia', 'pain management', 'sedation', 'critical care', 'preoperative assessment', 'hemodynamics'],
    'oncologist': ['chemotherapy', 'radiation therapy', 'cancer staging', 'immunotherapy', 'palliative care', 'clinical trials'],
    'neurologist': ['eeg', 'brain disorders', 'stroke management', 'neuropathy', 'epilepsy', 'neuroimaging', 'movement disorders'],
    'radiologist': ['mri', 'ct scan', 'ultrasound', 'diagnostic imaging', 'interventional radiology', 'nuclear medicine', 'dicom'],
    'obstetrician/gynecologist (ob-gyn)': ['prenatal care', 'labor and delivery', 'reproductive health', 'gynecologic surgery', 'preventative screening'],
    'pathologist': ['histopathology', 'cytopathology', 'biopsy analysis', 'laboratory medicine', 'autopsy', 'disease diagnosis'],

    // Diagnostics & Laboratory
    'medical laboratory scientist': ['hematology', 'microbiology', 'blood bank', 'clinical chemistry', 'quality control', 'lab automation'],
    'clinical laboratory technician': ['specimen processing', 'microscopy', 'reagent preparation', 'equipment calibration', 'data entry'],
    'cytotechnologist': ['cell analysis', 'pap smears', 'cancer screening', 'microscopy', 'fine needle aspiration', 'cell morphology'],
    'histotechnologist': ['tissue processing', 'sectioning', 'staining', 'microtomy', 'embedding', 'pathology support'],
    'molecular biologist': ['pcr', 'dna sequencing', 'genetics', 'molecular diagnostics', 'rna analysis', 'biotechnology'],
    'pathology assistant': ['grossing', 'autopsy assistance', 'surgical pathology', 'specimen photography', 'forensic pathology'],

    // Healthcare Administration & Support
    'hospital administrator': ['operations management', 'budgeting', 'compliance', 'strategic planning', 'healthcare law', 'staffing', 'revenue cycle'],
    'health services manager': ['department coordination', 'policy implementation', 'quality assurance', 'patient services', 'human resources'],
    'medical records coordinator': ['hipaa', 'health information management (him)', 'document control', 'data privacy', 'auditing'],
    'medical coder & biller': ['icd-10', 'cpt coding', 'hcpcs', 'claims processing', 'revenue cycle management', 'denial management'],
    'health information technician': ['ehr management', 'data analysis', 'privacy compliance', 'database administration', 'digital archiving'],
    'patient advocate': ['patient rights', 'liaison', 'complaint resolution', 'healthcare navigation', 'insurance assistance', 'empathy'],
    'medical secretary': ['scheduling', 'medical transcription', 'billing support', 'front office', 'patient records', 'medical terminology'],
    'healthcare consultant': ['process improvement', 'efficiency analysis', 'regulatory strategy', 'change management', 'financial modeling'],
    'clinical research coordinator': ['irb compliance', 'data collection', 'patient recruitment', 'clinical trials', 'protocol adherence'],
    'public health officer': ['epidemiology', 'community health', 'policy development', 'outbreak investigation', 'preventative programs'],

    // Mental Health & Social Services
    'clinical psychologist': ['psychotherapy', 'psychological testing', 'cbt', 'assessment', 'dsm-5', 'clinical diagnosis'],
    'licensed clinical social worker (lcsw)': ['case management', 'crisis intervention', 'counseling', 'advocacy', 'social services', 'mental health'],
    'mental health counselor': ['individual therapy', 'group therapy', 'treatment planning', 'empathy', 'behavioral health'],
    'substance abuse counselor': ['addiction recovery', 'relapse prevention', 'harm reduction', 'detox support', '12-step programs'],
    'behavioral health technician': ['patient observation', 'crisis de-escalation', 'therapeutic activities', 'daily charting', 'safety protocols'],

    // School & Early Childhood
    'early childhood educator': ['child development', 'play-based learning', 'social-emotional learning', 'lesson planning', 'classroom management', 'safety protocols', 'early literacy'],
    'preschool teacher': ['early childhood education (ece)', 'fine motor skills', 'creative arts', 'storytelling', 'parent communication', 'curriculum implementation'],
    'kindergarten teacher': ['phonics', 'basic numeracy', 'classroom organization', 'differentiated instruction', 'student assessment', 'iep basics'],
    'elementary school teacher': ['literacy', 'mathematics', 'science', 'social studies', 'classroom management', 'parent-teacher conferences', 'standardized testing'],
    'middle school teacher': ['adolescent psychology', 'subject matter expertise', 'classroom discipline', 'curriculum development', 'collaborative learning', 'educational technology'],
    'high school teacher': ['subject specialization', 'college readiness', 'ap/ib curriculum', 'mentoring', 'grading', 'lesson delivery', 'lecture planning'],
    'special education teacher': ['iep development', 'behavioral intervention', 'adaptive learning', 'special needs advocacy', 'differentiated instruction', 'inclusion'],
    'substitute teacher': ['adaptability', 'classroom control', 'lesson plan execution', 'flexibility', 'student safety', 'reporting'],
    'physical education (pe) teacher': ['sports coaching', 'health education', 'fitness assessment', 'teamwork', 'motor skills', 'first aid', 'gym safety'],
    'school counselor': ['student advocacy', 'academic planning', 'crisis intervention', 'career counseling', 'mental health support', 'conflict resolution'],

    // Higher Education & Research
    'university professor': ['academic research', 'lecturing', 'curriculum design', 'publishing', 'grant writing', 'mentoring', 'peer review', 'tenure track'],
    'lecturer / instructor': ['course delivery', 'syllabus design', 'student engagement', 'grading', 'public speaking', 'online teaching', 'office hours'],
    'academic researcher': ['data collection', 'methodology', 'literature review', 'academic writing', 'statistical analysis', 'lab management', 'ethics'],
    'postdoctoral fellow': ['advanced research', 'fellowships', 'manuscript preparation', 'data analysis', 'collaborative research', 'specialized expertise'],
    'graduate teaching assistant': ['grading', 'lab supervision', 'discussion leading', 'tutoring', 'academic support', 'research assistance'],
    'dean of faculty': ['academic leadership', 'faculty recruitment', 'strategic planning', 'budget management', 'policy development', 'accreditation'],
    'academic advisor': ['degree auditing', 'student retention', 'course selection', 'career guidance', 'academic probation', 'enrollment management'],
    'registrar': ['student records', 'scheduling', 'graduation clearance', 'ferpa compliance', 'database management', 'academic policy'],
    'admissions officer': ['student recruitment', 'application review', 'marketing', 'outreach', 'financial aid basics', 'interviews'],
    'librarian': ['information literacy', 'archiving', 'cataloging', 'database searching', 'collection development', 'digital resources', 'research assistance'],

    // Instructional Design & Technology
    'instructional designer': ['addie model', 'bloom\'s taxonomy', 'storyboarding', 'e-learning development', 'curriculum mapping', 'needs analysis'],
    'e-learning specialist': ['articulate storyline', 'adobe captivate', 'multimedia design', 'scorm', 'virtual classrooms', 'digital pedagogy'],
    'educational technologist': ['tech integration', 'software training', 'digital literacy', 'classroom hardware', 'innovation', 'technical support'],
    'curriculum developer': ['learning objectives', 'standards alignment', 'content creation', 'assessment design', 'textbook development', 'pedagogy'],
    'learning management system (lms) administrator': ['moodle', 'canvas', 'blackboard', 'user management', 'system troubleshooting', 'reporting', 'data privacy'],
    'corporate trainer': ['adult learning theory', 'professional development', 'workshop facilitation', 'onboarding', 'performance gaps', 'soft skills'],
    'content developer': ['copywriting', 'educational media', 'script writing', 'subject matter research', 'editing', 'visual aids'],

    // Educational Leadership & Administration
    'school Principal': ['educational leadership', 'staff supervision', 'budgeting', 'community relations', 'school safety', 'strategic planning', 'k-12'],
    'Vice Principal': ['student discipline', 'scheduling', 'teacher evaluations', 'administrative support', 'event management', 'operational efficiency'],
    'superintendent': ['district management', 'policy advocacy', 'public relations', 'fiscal oversight', 'board relations', 'educational vision'],
    'director of education': ['program evaluation', 'strategic growth', 'educational standards', 'leadership development', 'compliance', 'grant oversight'],
    'education consultant': ['process improvement', 'teacher coaching', 'school turnaround', 'strategic advice', 'educational workshops', 'policy analysis'],
    'grant writer': ['proposal writing', 'prospect research', 'funding strategy', 'budget justification', 'reporting', 'donor relations'],
    'policy analyst': ['legislative research', 'data modeling', 'socioeconomic analysis', 'educational equity', 'impact assessment', 'advocacy'],
    'chief academic officer': ['academic strategy', 'curriculum oversight', 'institutional assessment', 'faculty development', 'higher ed leadership'],

    // Tutoring & Specialized Instruction
    'private tutor': ['personalized instruction', 'test prep', 'study skills', 'remedial education', 'one-on-one coaching', 'progress tracking'],
    'sat/act instructor': ['standardized testing', 'test-taking strategies', 'quantitative reasoning', 'verbal skills', 'score improvement', 'practice exams'],
    'english teacher': ['tesol', 'tefl', 'language acquisition', 'linguistics', 'cultural immersion', 'grammar', 'conversational english'],
    'music instructor': ['instrumental training', 'music theory', 'ear training', 'performance coaching', 'repertoire planning', 'recital coordination'],
    'art teacher': ['visual arts', 'art history', 'technique instruction', 'creative expression', 'portfolio development', 'exhibition planning'],
    'vocational instructor': ['technical skills', 'trade certification', 'hands-on training', 'industry standards', 'workplace safety', 'career readiness'],
    'speech-language pathologist': ['articulation', 'language disorders', 'iep meetings', 'swallowing therapy', 'student assessment', 'communication aids'],
    'teacher': ['lesson planning', 'classroom management', 'differentiated instruction', 'assessment', 'curriculum development', 'parent communication', 'iep', '504 plan', 'educational technology'],
    'yoga instructor': ['hatha', 'vinyasa', 'ashtanga', 'pranayama', 'meditation', 'anatomy', 'alignment', 'modifications', 'sequencing', 'ryt-200', 'ryt-500'],

    // Corporate Finance
    'financial analyst': ['financial modeling', 'budgeting', 'forecasting', 'variance analysis', 'excel', 'sql', 'sap', 'data visualization', 'reporting'],
    'investment banker': ['mergers and acquisitions (m&a)', 'valuation', 'ipo', 'due diligence', 'pitch books', 'capital markets', 'lbo modeling'],
    'treasury manager': ['cash management', 'liquidity planning', 'risk mitigation', 'foreign exchange (fx)', 'banking relationships', 'debt management'],
    'financial controller': ['financial reporting', 'gaap', 'ifrs', 'internal controls', 'general ledger', 'month-end close', 'auditing'],
    'chief financial officer': ['strategic planning', 'capital structure', 'investor relations', 'risk management', 'financial leadership', 'p&l oversight'],
    'corporate development associate': ['strategic partnerships', 'm&a strategy', 'financial modeling', 'market research', 'deal sourcing', 'due diligence'],
    'internal auditor': ['risk assessment', 'compliance', 'internal controls', 'sox compliance', 'operational audits', 'process improvement'],
    'tax manager': ['tax compliance', 'tax planning', 'corporate tax', 'indirect tax', 'audit defense', 'transfer pricing', 'erp systems'],
    'budget analyst': ['budget preparation', 'financial tracking', 'cost-benefit analysis', 'expenditure control', 'variance reporting', 'fiscal policy'],
    'strategic planner': ['market trends', 'swot analysis', 'long-term forecasting', 'competitive intelligence', 'business growth', 'resource allocation'],

    // Investment & Asset Management
    'portfolio manager': ['asset allocation', 'investment strategy', 'risk management', 'portfolio rebalancing', 'market analysis', 'client reporting'],
    'equity research analyst': ['financial modeling', 'stock valuation', 'industry analysis', 'earnings reports', 'buy/sell recommendations', 'cfa'],
    'fixed income analyst': ['bond valuation', 'credit risk', 'yield curve analysis', 'interest rate swaps', 'macroeconomic research', 'monetary policy'],
    'hedge fund manager': ['alternative investments', 'arbitrage', 'leverage strategies', 'risk-adjusted returns', 'derivatives', 'quantitative analysis'],
    'asset management associate': ['client relations', 'investment research', 'compliance', 'performance attribution', 'market data', 'onboarding'],
    'venture capitalist': ['startup valuation', 'deal flow', 'equity financing', 'term sheets', 'entrepreneurship', 'strategic networking', 'exit strategy'],
    'private equity analyst': ['lbo modeling', 'due diligence', 'portfolio company monitoring', 'deal execution', 'market research', 'valuation'],
    'quantitative analyst': ['algorithmic trading', 'stochastic calculus', 'python', 'r', 'machine learning', 'risk modeling', 'derivatives pricing'],
    'trader': ['technical analysis', 'execution strategy', 'order flow', 'risk management', 'bloomberg terminal', 'market liquidity'],
    'financial planner / wealth manager': ['retirement planning', 'estate planning', 'tax strategies', 'investment advice', 'portfolio management', 'crm'],

    // Banking & Lending
    'commercial loan officer': ['commercial lending', 'credit analysis', 'underwriting', 'relationship management', 'loan structuring', 'financial statements'],
    'relationship manager': ['client acquisition', 'cross-selling', 'business banking', 'customer retention', 'financial networking', 'portfolio growth'],
    'mortgage consultant': ['loan processing', 'origination', 'residential lending', 'credit scores', 'fha/va loans', 'regulatory compliance'],
    'credit analyst': ['credit risk assessment', 'financial ratios', 'cash flow analysis', 'debt capacity', 'loan grading', 'industry risk'],
    'branch manager': ['operations management', 'staff leadership', 'customer service', 'sales targets', 'compliance', 'audit oversight'],
    'compliance officer': ['aml', 'kyc', 'regulatory reporting', 'risk management', 'policy implementation', 'finra/sec', 'bank secrecy act'],
    'risk manager': ['operational risk', 'market risk', 'liquidity risk', 'basel iii', 'stress testing', 'mitigation strategies', 'data analysis'],
    'underwriter': ['risk evaluation', 'policy pricing', 'guideline adherence', 'data verification', 'decision making', 'loss ratio analysis'],
    'collections specialist': ['debt recovery', 'negotiation', 'payment plans', 'skip tracing', 'fair debt collection practices act (fdcpa)'],
    'investment advisor': ['series 7/66', 'fiduciary duty', 'asset management', 'financial goals', 'client profiling', 'market research'],

    // Accounting & Professional Services
    'certified public accountant': ['auditing', 'tax preparation', 'financial accounting', 'ethics', 'gaap', 'ifrs', 'management advisory'],
    'management accountant': ['cost analysis', 'internal reporting', 'performance management', 'decision support', 'budgeting', 'strategic management'],
    'forensic accountant': ['fraud investigation', 'litigation support', 'asset tracing', 'white-collar crime', 'data reconstruction', 'expert witness'],
    'payroll manager': ['payroll processing', 'tax withholding', 'compliance', 'benefits administration', 'hris', 'audit support', 'employment law'],
    'bookkeeper': ['accounts payable', 'accounts receivable', 'bank reconciliation', 'quickbooks', 'journal entries', 'trial balance'],
    'audit manager': ['audit planning', 'team leadership', 'quality control', 'stakeholder management', 'compliance auditing', 'risk mapping'],
    'financial consultant': ['business strategy', 'financial planning', 'process optimization', 'valuation', 'advisory services', 'client management'],
    'cost accountant': ['inventory valuation', 'standard costing', 'variance analysis', 'margin analysis', 'lean accounting', 'manufacturing costs'],

    // FinTech & Insurance
    'actuary': ['probability', 'statistics', 'risk modeling', 'predictive analytics', 'life insurance', 'pensions', 'stochastic modeling'],
    'insurance underwriter': ['risk assessment', 'premium calculation', 'policy terms', 'actuarial data', 'hazard evaluation', 'negotiation'],
    'claims adjuster': ['investigation', 'liability assessment', 'damage estimation', 'settlement negotiation', 'policy interpretation', 'fraud detection'],
    'fintech product manager': ['saas', 'api integration', 'ux/ui', 'digital payments', 'product roadmap', 'agile', 'mobile banking', 'blockchain'],
    'risk consultant': ['threat assessment', 'business continuity', 'risk mitigation', 'regulatory landscape', 'enterprise risk management (erm)'],
    'blockchain developer (finance)': ['smart contracts', 'solidity', 'cryptography', 'defi', 'ethereum', 'distributed ledgers', 'cybersecurity'],
    'insurance agent / broker': ['sales', 'policy comparison', 'customer service', 'lead generation', 'commercial insurance', 'personal lines'],

    // Business & Operations
    'office manager': ['office administration', 'vendor management', 'facility oversight', 'budgeting', 'staff supervision', 'process improvement'],
    'administrative assistant': ['scheduling', 'data entry', 'clerical support', 'ms office', 'filing systems', 'communication', 'calendar management'],
    'executive assistant': ['travel coordination', 'itinerary planning', 'confidentiality', 'meeting minutes', 'expense reporting', 'stakeholder liaison'],
    'operations coordinator': ['process optimization', 'logistics', 'project coordination', 'reporting', 'workflow management', 'supply chain support'],
    'business owner / entrepreneur': ['business strategy', 'leadership', 'financial management', 'marketing', 'sales', 'risk-taking', 'innovation'],
    'human resources (hr) generalist': ['employee relations', 'onboarding', 'benefits administration', 'compliance', 'payroll', 'performance management'],
    'recruiter': ['sourcing', 'interviewing', 'applicant tracking systems (ats)', 'talent acquisition', 'headhunting', 'employer branding'],
    'facility manager': ['maintenance', 'safety protocols', 'hvac', 'space planning', 'contractor management', 'emergency preparedness'],
    'receptionist': ['front desk', 'multi-line phone', 'visitor management', 'customer service', 'administrative support', 'clerical tasks'],
    'personal assistant': ['lifestyle management', 'errand running', 'personal scheduling', 'organization', 'discretion', 'travel planning'],

    // Logistics & Supply Chain
    'logistics coordinator': ['transportation management', 'freight forwarding', 'routing', 'erp', 'inventory tracking', 'distribution'],
    'supply chain analyst': ['data analysis', 'demand forecasting', 'process mapping', 'optimization', 'sql', 'tableau', 'inventory management'],
    'warehouse supervisor': ['team leadership', 'safety (osha)', 'inventory accuracy', 'shipping and receiving', 'forklift operation', 'workflow'],
    'inventory manager': ['stock control', 'sku management', 'auditing', 'supply planning', 'warehousing', 'cycle counting'],
    'procurement specialist': ['strategic sourcing', 'contract negotiation', 'vendor evaluation', 'purchasing', 'cost reduction', 'rfp/rfq'],
    'delivery driver': ['route optimization', 'time management', 'safe driving', 'customer service', 'package handling', 'logistics'],
    'fleet manager': ['vehicle maintenance', 'fuel management', 'compliance', 'telematics', 'driver safety', 'transportation laws'],
    'purchasing agent': ['order processing', 'vendor relations', 'price negotiation', 'supply chain', 'inventory replenishment', 'budgeting'],

    // Customer Service & Hospitality
    'customer service representative': ['problem solving', 'crm', 'empathy', 'communication', 'complaint resolution', 'order management'],
    'call center agent': ['telephony systems', 'active listening', 'scripts', 'kpis', 'troubleshooting', 'data entry'],
    'technical support specialist': ['help desk', 'troubleshooting', 'ticketing systems', 'remote support', 'hardware/software', 'patience'],
    'hotel manager': ['hospitality management', 'guest relations', 'staffing', 'revenue management', 'property oversight', 'operations'],
    'front desk officer': ['check-in/out', 'pms software', 'reservations', 'customer service', 'concierge services', 'billing'],
    'concierge': ['local recommendations', 'travel booking', 'event tickets', 'guest services', 'networking', 'itinerary planning'],
    'chef / cook': ['culinary arts', 'food safety (servsafe)', 'menu planning', 'kitchen management', 'plating', 'inventory'],
    'restaurant manager': ['p&l management', 'staff training', 'customer experience', 'scheduling', 'health code compliance', 'sales'],
    'waitstaff / server': ['pos systems', 'customer service', 'upselling', 'multitasking', 'menu knowledge', 'teamwork'],

    // Creative & Media
    'graphic designer': ['photoshop', 'illustrator', 'indesign', 'branding', 'typography', 'color theory', 'visual communication'],
    'video editor': ['adobe premiere pro', 'final cut pro', 'after effects', 'color grading', 'storyboarding', 'motion graphics'],
    'photographer': ['lighting', 'photo editing', 'lightroom', 'composition', 'digital photography', 'studio management'],
    'social media influencer': ['content creation', 'brand partnerships', 'engagement', 'audience growth', 'storytelling', 'authenticity'],
    'content creator': ['blogging', 'videography', 'graphic design', 'social media strategy', 'copywriting', 'digital marketing'],
    'animator': ['2d/3d animation', 'maya', 'blender', 'character design', 'rigging', 'storyboarding'],
    'music producer': ['daw (ableton/logic)', 'mixing', 'mastering', 'sound design', 'composition', 'audio engineering'],
    'journalist': ['reporting', 'investigative research', 'interviewing', 'editing', 'ethics', 'copywriting', 'multimedia'],

    // Technical & Skilled Trades
    'project coordinator': ['scheduling', 'documentation', 'task tracking', 'stakeholder updates', 'jira', 'budget support'],
    'maintenance technician': ['preventative maintenance', 'troubleshooting', 'electrical', 'plumbing', 'hvac', 'hand tools'],
    'electrician': ['wiring', 'blueprints', 'electrical codes', 'circuitry', 'safety', 'testing equipment'],
    'plumber': ['pipefitting', 'drainage', 'blueprints', 'fixtures', 'maintenance', 'troubleshooting'],
    'civil engineer': ['autocad', 'structural analysis', 'project management', 'surveying', 'construction materials', 'environmental codes'],
    'construction manager': ['site supervision', 'budgeting', 'safety compliance', 'blueprints', 'subcontractor management', 'scheduling'],
    'mechanic': ['diagnostics', 'engine repair', 'braking systems', 'hvac', 'preventative maintenance', 'automotive tools'],
    'welder': ['mig/tig welding', 'blueprints', 'safety protocols', 'metallurgy', 'fabrication', 'grinding'],
    'interior designer': ['space planning', 'autocad', 'color schemes', 'mood boards', 'furniture sourcing', 'lighting design'],

    // Non-Profit & Community
    'social worker': ['case management', 'counseling', 'crisis intervention', 'advocacy', 'community resources', 'empathy'],
    'volunteer coordinator': ['recruitment', 'training', 'event planning', 'engagement', 'database management', 'public speaking'],
    'non-profit program manager': ['grant management', 'program evaluation', 'strategic planning', 'budgeting', 'community impact'],
    'fundraising consultant': ['donor relations', 'capital campaigns', 'grant writing', 'strategic development', 'networking'],
    'community outreach specialist': ['public relations', 'partnership building', 'event coordination', 'advocacy', 'education'],
    'policy advocate': ['lobbying', 'legislative research', 'public speaking', 'strategic communication', 'grassroots organizing'],

    // General & Professional Essentials
    'administrative professional': ['scheduling', 'ms office', 'data entry', 'communication', 'organization', 'filing', 'customer service', 'multi-tasking'],
    'business professional': ['project management', 'strategic planning', 'communication', 'leadership', 'collaboration', 'problem solving', 'time management'],
    'customer relations': ['communication', 'empathy', 'conflict resolution', 'crm', 'active listening', 'problem solving', 'patience'],
    'entry level / associate': ['quick learner', 'adaptability', 'teamwork', 'communication', 'microsoft office', 'problem solving', 'work ethic'],
    'general manager': ['operations', 'leadership', 'budgeting', 'staffing', 'process improvement', 'strategic planning', 'p&l management'],
    'management / leadership': ['team building', 'mentorship', 'strategic vision', 'delegation', 'performance management', 'decision making', 'budgeting'],
    'remote professional': ['self-motivation', 'digital communication', 'zoom', 'slack', 'asynchronous work', 'time management', 'independence'],
    'technical support': ['troubleshooting', 'hardware', 'software', 'ticketing systems', 'documentation', 'customer service', 'analytical thinking'],

    // General (fallback for unmatched jobs)
    'default': ['communication', 'teamwork', 'problem solving', 'organization', 'time management', 'leadership', 'adaptability', 'attention to detail', 'critical thinking', 'microsoft office', 'digital literacy', 'project coordination', 'customer focus', 'collaboration', 'emotional intelligence', 'proactive', 'analytical skills', 'work ethic'],
};


const ATS_WEIGHTS = {
    // profilephoto: 2,
    name: 1,
    jobTitle: 2,
    email: 2,
    contact: 2,
    address: 1,
    linkedin: 2,
    github: 2,
    summary: 8,
    keywords: 30,
    actionVerbs: 8,
    education: 5,
    experience: 15,
    projects: 10,
    skills: 10,
    languages: 2,
};


let currentColor = '#1e293b';
let currentTemplate = 1;


/* ═══════════════════════════════════════════════════════════════════════════
   02. UTILITY FUNCTIONS
   ═══════════════════════════════════════════════════════════════════════════ */

function escHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function esc(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
}

function wordCount(text) {
    if (!text) return 0;
    return text.trim().split(/\s+/).filter(Boolean).length;
}

function hasEntry(entrySelector, inputSelector) {
    let found = false;
    document.querySelectorAll(entrySelector).forEach(entry => {
        if ((entry.querySelector(inputSelector)?.value || '').trim()) found = true;
    });
    return found;
}

function skillCount() {
    const raw = document.getElementById('inputSkills')?.value || '';
    return raw.split(',').filter(s => s.trim()).length;
}

/**
 * NEW: Gets relevant keywords for the target job title
 * @param {string} jobTitle - The user's target job title
 * @returns {Array} - Array of keywords to search for
 */
function getRelevantKeywords(jobTitle) {
    if (!jobTitle) return JOB_KEYWORDS['default'];

    const normalized = jobTitle.toLowerCase().trim();

    if (JOB_KEYWORDS[normalized]) {
        return JOB_KEYWORDS[normalized];
    }

    for (const [key, keywords] of Object.entries(JOB_KEYWORDS)) {
        if (normalized.includes(key) || key.includes(normalized)) {
            return keywords;
        }
    }
    return JOB_KEYWORDS['default'];
}

function calculateKeywordMatch() {
    const jobTitle = document.getElementById('inputJobTarget')?.value || '';
    const relevantKeywords = getRelevantKeywords(jobTitle);

    const summary = document.getElementById('inputSummary')?.value || '';
    let fullText = summary.toLowerCase();

    document.querySelectorAll('.sync-exp-desc').forEach(el => {
        fullText += ' ' + (el.value || '').toLowerCase();
    });

    document.querySelectorAll('.sync-proj-desc').forEach(el => {
        fullText += ' ' + (el.value || '').toLowerCase();
    });

    document.querySelectorAll('.sync-proj-tech').forEach(el => {
        fullText += ' ' + (el.value || '').toLowerCase();
    });

    const skills = document.getElementById('inputSkills')?.value || '';
    fullText += ' ' + skills.toLowerCase();

    let matchedCount = 0;
    const matchedKeywords = [];
    const missingKeywords = [];

    relevantKeywords.forEach(keyword => {
        if (fullText.includes(keyword.toLowerCase())) {
            matchedCount++;
            matchedKeywords.push(keyword);
        } else {
            missingKeywords.push(keyword);
        }
    });

    const matchPercentage = (matchedCount / relevantKeywords.length) * 100;

    return {
        percentage: matchPercentage,
        matched: matchedKeywords,
        missing: missingKeywords,
        total: relevantKeywords.length
    };
}

function getPhotoHtml(d) {
    if (d.photoSrc) {
        return `
        <div class="cv-photo-container">
            <img src="${d.photoSrc}" class="cv-photo-img" alt="Profile">
        </div>`;
    }
    return '';
}

function contacts(d) {
    return `
        ${d.email ? `<span><i class="bi bi-envelope-fill"></i> ${esc(d.email)}</span>` : ''}
        ${d.phone ? `<span><i class="bi bi-telephone-fill"></i> ${esc(d.phone)}</span>` : ''}
        ${d.address ? `<span><i class="bi bi-geo-alt-fill"></i> ${esc(d.address)}</span>` : ''}
        ${d.linkedin ? `<span><i class="bi bi-linkedin"></i> ${esc(d.linkedin)}</span>` : ''}
        ${d.github ? `<span><i class="bi bi-github"></i> ${esc(d.github)}</span>` : ''}
    `;
}

function eduBlock(edu, cls) {
    return edu.map(e => `
        <div style="margin-bottom:10px;break-inside:avoid;">
            <div class="${cls}-entry-head" style="display:flex;justify-content:space-between;align-items:baseline;width:100%;gap:8px;font-size: var(--font-size-details);">
                <span style="flex:1;min-width:0;">${esc(e.degree)}</span>
                ${e.edu_duration ? `<span style="font-size: var(--font-size-details);color:#64748b;white-space:nowrap;flex-shrink:0;">${esc(e.edu_duration)}</span>` : ''}
            </div>
            ${e.uni || e.cgpa ? `
                <div style="display:flex;justify-content:space-between;align-items:baseline;width:100%;gap:8px;margin-top:2px;">
                    <span class="${cls}-entry-sub" style="flex:1;min-width:0;font-size: var(--font-size-details);">${esc(e.uni)}</span>
                    ${e.cgpa ? `<span style="font-size: var(--font-size-details);color:#64748b;white-space:nowrap;flex-shrink:0;">${esc(e.cgpa)}</span>` : ''}
                </div>` : ''}
        </div>`).join('');
}

function expBlock(exp, cls) {
    return exp.map(e => `
        <div style="margin-bottom:10px;break-inside:avoid;">
            <div class="${cls}-entry-head" style="display:flex;justify-content:space-between;align-items:baseline;width:100%;gap:8px;">
                <span style="font-weight:700;flex:1;min-width:0;">${esc(e.title)}</span>
                ${e.exp_duration ? `<span style="font-size:0.86em;color:#64748b;white-space:nowrap;flex-shrink:0;">${esc(e.exp_duration)}</span>` : ''}
            </div>
            ${e.company ? `<div class="${cls}-entry-sub" style="margin-top:2px;">${esc(e.company)}</div>` : ''}
            ${e.desc ? `<div class="${cls}-entry-desc" style="margin-top:3px;">${esc(e.desc)}</div>` : ''}
        </div>`).join('');
}

function projBlock(proj, cls) {
    return proj.map(p => `
        <div style="margin-bottom:10px;">
            <div class="${cls}-entry-head" style="font-weight:700;">${esc(p.title)}</div>
            ${p.tech ? `<div class="${cls}-entry-sub"><em>Tech:</em> ${esc(p.tech)}</div>` : ''}
            ${p.link ? `<div class="${cls}-entry-sub"><a href="${esc(p.link)}" target="_blank" style="color:inherit;text-decoration:underline;">${esc(p.link)}</a></div>` : ''}
            ${p.desc ? `<div class="${cls}-entry-desc">${esc(p.desc)}</div>` : ''}
        </div>`).join('');
}
/**
 * Shared custom sections block HTML for all templates.
 * @param {Array}  sections  array of {title, content} objects
 * @param {string} accentColor  hex color string for the section heading
 * @returns {string}
 */
function customsectionsBlock(sections, accentColor) {
    if (!sections || !sections.length) return '';
    return sections.map(s => `
        <div style="margin-bottom:10px;">
            <div style="
                font-size:.68rem;
                font-weight:700;
                text-transform:uppercase;
                letter-spacing:1.5px;
                color:${esc(accentColor)};
                border-bottom:2px solid ${esc(accentColor)};
                padding-bottom:3px;
                margin-bottom:6px;">
                ${esc(s.title)}
            </div>
            <div style="font-size:.71rem;color:#475569;white-space:pre-wrap;line-height:1.65;">
                ${esc(s.content)}
            </div>
        </div>`).join('');
}

/* ═══════════════════════════════════════════════════════════════════════════
   03. STYLE & THEME FUNCTIONS (FIXED)
═══════════════════════════════════════════════════════════════════════════ */

function applyThemeColor(color) {
    currentColor = color;
    const input = document.getElementById('hexColorValue');
    if (input) input.value = color;
    document.querySelectorAll('.dynamic-color-text').forEach(el => {
        el.style.color = color;
    });
    document.querySelectorAll('.dynamic-color-border').forEach(el => {
        el.style.borderBottomColor = color;
    });
    const atsBox = document.querySelector('.ats-card');
    if (atsBox) atsBox.style.borderLeftColor = color;
}

function applyStyles() {
    const cvDoc = document.getElementById('cvDocument');
    const font = document.getElementById('inputFont')?.value || 'Arial, sans-serif';
    const sizeName = document.getElementById('inputFontSizeName')?.value || '18px';
    const sizeHeading = document.getElementById('inputFontSizeHeading')?.value || '16px';
    const sizeDetails = document.getElementById('inputFontSizeDetails')?.value || '14px';
    const color = document.getElementById('hexColorValue')?.value || currentColor;

    if (cvDoc) {
        cvDoc.style.fontFamily = font;
        cvDoc.style.setProperty('--font-size-name', sizeName);
        cvDoc.style.setProperty('--font-size-heading', sizeHeading);
        cvDoc.style.setProperty('--font-size-details', sizeDetails);
    }
    applyThemeColor(color);
}

function setHexColor(hex) {
    currentColor = hex;
    const hiddenInput = document.getElementById('hexColorValue');
    if (hiddenInput) hiddenInput.value = hex;
    document.querySelectorAll('.hex-swatch').forEach(s => s.classList.remove('active'));
    const clickedSwatch = document.querySelector(`.hex-swatch[data-color="${hex}"]`);
    if (clickedSwatch) clickedSwatch.classList.add('active');
    applyStyles();
    updatePreview();
}

function initColorSwatches() {
    document.querySelectorAll('.hex-swatch').forEach(swatch => {
        swatch.addEventListener('click', function () {
            const color = this.getAttribute('data-color');
            if (color) setHexColor(color);
        });
    });
}

/* ═══════════════════════════════════════════════════════════════════════════
   04. LIVE PREVIEW SCALING (FIXED)
   ═══════════════════════════════════════════════════════════════════════════ */
function scalePreview() {
    const cvDoc = document.getElementById('cvDocument');
    if (!cvDoc) return;

    // Target the new wrapper, not the raw parent
    const wrap = cvDoc.closest('.cv-scale-wrap') || cvDoc.parentElement;
    if (!wrap) return;

    // Available width minus wrapper padding (8px each side = 16px)
    const availableWidth = wrap.clientWidth - 16;
    if (availableWidth <= 0) return;

    // Scale down to fit; never scale above 1× (natural size)
    const scale = Math.min(availableWidth / 794, 1);

    cvDoc.style.transform = `scale(${scale})`;
    cvDoc.style.transformOrigin = 'top left';

    // Shrink the wrapper height to match the visually scaled document
    // so there is no dead whitespace below the preview
    const scaledHeight = cvDoc.scrollHeight * scale;
    wrap.style.height = (scaledHeight + 16) + 'px';   // +16 for padding
}

window.addEventListener('resize', scalePreview);
/* ═══════════════════════════════════════════════════════════════════════════
   05. PHOTO PREVIEW
   ═══════════════════════════════════════════════════════════════════════════ */
function previewImage(event) {
    const file = event.target.files[0];
    const prevPhoto = document.getElementById('prevPhoto');

    if (file && prevPhoto) {
        const reader = new FileReader();
        reader.onload = function (e) {
            prevPhoto.src = e.target.result;
            prevPhoto.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

/* ═══════════════════════════════════════════════════════════════════════════
   06. DATA COLLECTION
   ═══════════════════════════════════════════════════════════════════════════ */

function getData() {
    const edu = [];
    document.querySelectorAll('.edu-entry, #eduContainer .dynamic-entry').forEach(e => {
        const degree = (e.querySelector('.sync-edu-degree')?.value || '').trim();
        const uni = (e.querySelector('.sync-edu-uni')?.value || '').trim();
        const edu_duration = (e.querySelector('.sync-edu-duration')?.value || '').trim();
        const cgpa = (e.querySelector('.sync-edu-cgpa')?.value || '').trim();
        if (degree || uni) edu.push({ degree, uni, edu_duration, cgpa });
    });

    const exp = [];
    document.querySelectorAll('.exp-entry, #expContainer .dynamic-entry').forEach(e => {
        const title = (e.querySelector('.sync-exp-title')?.value || '').trim();
        const company = (e.querySelector('.sync-exp-company')?.value || '').trim();
        const exp_duration = (e.querySelector('.sync-exp-duration')?.value || '').trim();
        const desc = (e.querySelector('.sync-exp-desc')?.value || '').trim();
        if (title || company) exp.push({ title, company, exp_duration, desc });
    });

    const proj = [];
    document.querySelectorAll('.proj-entry, #projContainer .dynamic-entry').forEach(e => {
        const title = (e.querySelector('.sync-proj-title')?.value || '').trim();
        const tech = (e.querySelector('.sync-proj-tech')?.value || '').trim();
        const link = (e.querySelector('.sync-proj-link')?.value || '').trim();
        const desc = (e.querySelector('.sync-proj-desc')?.value || '').trim();
        if (title) proj.push({ title, tech, link, desc });
    });

    const customSections = [];
    document.querySelectorAll('#customsectionsContainer .customsections-entry').forEach(e => {
        const title = (e.querySelector('.sync-customsections-title')?.value || '').trim();
        const content = (e.querySelector('.sync-customsections-content')?.value || '').trim();
        if (title || content) {
            customSections.push({ title: title, content: content });
        }
    });

    const skillsRaw = document.getElementById('inputSkills')?.value || '';
    const langsRaw = document.getElementById('inputLanguages')?.value || '';

    const photoImg = document.getElementById('prevPhoto');
    const photoSrc = (photoImg && photoImg.src && photoImg.src.startsWith('data:image')) ? photoImg.src : '';

    return {
        name: document.getElementById('inputName')?.value || '',
        jobTitle: document.getElementById('inputJobTarget')?.value || '',
        jobTarget: document.getElementById('inputJobTarget')?.value || '',
        email: document.getElementById('inputEmail')?.value || '',
        phone: document.getElementById('inputPhone')?.value || '',
        address: document.getElementById('inputAddress')?.value || '',
        linkedin: document.getElementById('inputLinkedin')?.value || '',
        github: document.getElementById('inputGithub')?.value || '',
        summary: document.getElementById('inputSummary')?.value || '',
        skills: skillsRaw.split(',').map(s => s.trim()).filter(Boolean),
        languages: langsRaw.split(',').map(s => s.trim()).filter(Boolean),
        langs: langsRaw.split(',').map(s => s.trim()).filter(Boolean),
        education: edu,
        edu: edu,
        experience: exp,
        exp: exp,
        projects: proj,
        proj: proj,
        custom_sections: customSections,
        customsections: customSections,
        color: document.getElementById('hexColorValue')?.value || currentColor,
        font: document.getElementById('inputFont')?.value || 'Arial, sans-serif',
        fontSizeName: document.getElementById('inputFontSizeName')?.value || '18px',
        fontSizeHeading: document.getElementById('inputFontSizeHeading')?.value || '16px',
        fontSizeDetails: document.getElementById('inputFontSizeDetails')?.value || '14px',
        photoSrc: document.getElementById('prevPhotoData')?.src || '',
        photoSrc: photoSrc,
        template: document.querySelector('input[name="template_chosen"]:checked')?.value || 'template1',
    };
}

/* ═══════════════════════════════════════════════════════════════════════════
   07. TEMPLATE RENDERERS (T1 - T10)
   ═══════════════════════════════════════════════════════════════════════════ */
/* Template 1: Navy Sidebar (Two-column layout) */
function renderT1(d) {
    const photoHtml = getPhotoHtml(d);

    const contactsHtml = `
        <div class="sb-item-group">
            ${d.email ? `<div class="sb-item" style="font-size: var(--font-size-details);"><i class="bi bi-envelope"></i> ${esc(d.email)}</div>` : ''}
            ${d.phone ? `<div class="sb-item" style="font-size: var(--font-size-details);"><i class="bi bi-telephone"></i> ${esc(d.phone)}</div>` : ''}
            ${d.address ? `<div class="sb-item" style="font-size: var(--font-size-details);"><i class="bi bi-geo-alt"></i> ${esc(d.address)}</div>` : ''}
            ${d.linkedin ? `<div class="sb-item" style="font-size: var(--font-size-details);"><i class="bi bi-linkedin"></i> <a href="${esc(d.linkedin)}" target="_blank" style="color:inherit;text-decoration:none;">${esc(d.linkedin)}</a></div>` : ''}
            ${d.github ? `<div class="sb-item" style="font-size: var(--font-size-details);"><i class="bi bi-github"></i> <a href="${esc(d.github)}" target="_blank" style="color:inherit;text-decoration:none;">${esc(d.github)}</a></div>` : ''}
        </div>
    `;
    const eduHtml = d.edu.length ? d.edu.map(e => `
        <div style="margin-bottom:6px;">
            <div style="font-size: var(--font-size-details); font-weight:600;">${esc(e.degree)}</div>
            <div style="font-size: var(--font-size-details); opacity:.8;">${esc(e.uni)}</div>
            <div style="font-size: var(--font-size-details); opacity:.7;">${esc(e.edu_duration)}${e.cgpa ? ' • ' + esc(e.cgpa) : ''}</div>
        </div>`).join('') : '';

    const skillsHtml = d.skills.length ? d.skills.map(s =>
        `<div class="sb-skill" style="font-size: var(--font-size-details);"><div class="sb-skill-dot"></div><span>${esc(s)}</span></div>`
    ).join('') : '';

    const langsHtml = d.langs.length ? d.langs.map(l =>
        `<div style="font-size: var(--font-size-details); margin-bottom:3px; opacity:.9;"><i class="bi bi-check2-circle" style="margin-right:4px;"></i>${esc(l)}</div>`
    ).join('') : '';

    const expHtml = expBlock(d.exp, 'cv-t1');
    const projHtml = projBlock(d.proj, 'cv-t1');

    const customsectionsHtml = d.customsections && d.customsections.length ? d.customsections.map(c => `
    <div class="sec-title">${esc(c.title)}</div>
    <div class="entry-desc" style="white-space:pre-wrap; margin-bottom: 10px; font-size: var(--font-size-details);">${esc(c.content)}</div>
`).join('') : '';

    return `
        <div class="cv-t1" style="--cv-color:${d.color};">
            <div class="cv-sidebar" style="background-color: var(--cv-color);">
                ${photoHtml}
                <div class="sb-section">CONTACTS</div>
                ${contactsHtml}
                ${d.edu.length ? `<div class="sb-section">EDUCATION</div>${eduHtml}` : ''}
                ${d.skills.length ? `<div class="sb-section">SKILLS</div>${skillsHtml}` : ''}
                ${d.langs.length ? `<div class="sb-section">LANGUAGES</div>${langsHtml}` : ''}
            </div>
            <div class="cv-main">
                <div class="cv-name" style="color: var(--cv-color);">${esc(d.name)}</div>
                <div class="cv-role-main">${esc(d.jobTarget)}</div>
                ${d.summary ? `<div class="sec-title" style="color: var(--cv-color); border-bottom-color: var(--cv-color);">PROFESSIONAL SUMMARY</div><div class="summary" style="font-size: var(--font-size-details);">${esc(d.summary)}</div>` : ''}
                ${d.exp.length ? `<div class="sec-title" style="color: var(--cv-color); border-bottom-color: var(--cv-color);">WORK EXPERIENCE</div>${expHtml}` : ''}
                ${d.proj.length ? `<div class="sec-title" style="color: var(--cv-color); border-bottom-color: var(--cv-color);">PROJECTS</div>${projHtml}` : ''}
                ${customsectionsHtml}
            </div>
        </div>
    `;
}
/* Template 2 — Modern Blue Header */
function renderT2(d) {
    const contactsRow1 = [];
    const contactsRow2 = [];

    if (d.email) contactsRow1.push(`<span style="font-size: var(--font-size-details);"><i class="bi bi-envelope-fill"></i> ${esc(d.email)}</span>`);
    if (d.phone) contactsRow1.push(`<span style="font-size: var(--font-size-details);"><i class="bi bi-telephone-fill"></i> ${esc(d.phone)}</span>`);
    if (d.address) contactsRow1.push(`<span style="font-size: var(--font-size-details);"><i class="bi bi-geo-alt-fill"></i> ${esc(d.address)}</span>`);
    if (d.linkedin) contactsRow2.push(`<span style="font-size: var(--font-size-details);"><i class="bi bi-linkedin"></i> ${esc(d.linkedin)}</span>`);
    if (d.github) contactsRow2.push(`<span style="font-size: var(--font-size-details);"><i class="bi bi-github"></i> ${esc(d.github)}</span>`);

    const contactsHtml = `
        <div class="cv-contacts">${contactsRow1.join('')}</div>
        ${contactsRow2.length ? `<div class="cv-contacts cv-contacts-row2">${contactsRow2.join('')}</div>` : ''}
    `;

    const customsectionsHtml = d.customsections && d.customsections.length ? d.customsections.map(c => `
    <div class="sec-title">${esc(c.title)}</div>
    <div class="entry-desc" style="white-space:pre-wrap; margin-bottom: 10px; font-size: var(--font-size-details);">${esc(c.content)}</div>
`).join('') : '';

    return `<div class="cv-t2" style="--cv-color:${d.color}; font-family:${d.font}; font-size:${d.fontSize};">
        <div class="cv-header">
            <div class="cv-name">${esc(d.name)}</div>
            <div class="cv-role">${esc(d.jobTitle)}</div>
            ${contactsHtml}
        </div>
        <div class="cv-body">
            ${d.summary ? `<div class="sec-title">Professional Summary</div><div class="t2-summary" style="font-size: var(--font-size-details);">${esc(d.summary)}</div>` : ''}
            ${d.experience && d.experience.length ? `
                <div class="sec-title">Experience</div>
                ${d.experience.map(e => `
                    <div style="margin-bottom:10px;break-inside:avoid;">
                        <div style="display:flex;justify-content:space-between;align-items:baseline;">
                            <span style="font-weight:700;font-size: var(--font-size-details);color:#0f172a;">${esc(e.title)}</span>
                            ${e.exp_duration ? `<span style="font-size: var(--font-size-details);color:#64748b;white-space:nowrap;flex-shrink:0;">${esc(e.exp_duration)}</span>` : ''}
                        </div>
                        ${e.company ? `<div style="font-size: var(--font-size-details);color:#64748b;font-style:italic;">${esc(e.company)}</div>` : ''}
                        ${e.desc ? `<div style="font-size: var(--font-size-details);color:#475569;white-space:pre-wrap;">${esc(e.desc)}</div>` : ''}
                    </div>`).join('')}` : ''}
            ${d.education && d.education.length ? `
                <div class="sec-title">Education</div>
                ${d.education.map(e => `
                    <div class="t2-edu-entry">
                        <div class="t2-edu-row">
                            <div class="t2-edu-degree" style="font-size: var(--font-size-details);">${esc(e.degree)}</div>
                            ${e.edu_duration ? `<div class="t2-edu-duration" style="font-size: var(--font-size-details);">${esc(e.edu_duration)}</div>` : ''}
                        </div>
                        <div class="t2-edu-row">
                            <div class="t2-edu-uni" style="font-size: var(--font-size-details);">${esc(e.uni)}</div>
                            ${e.cgpa ? `<div class="t2-edu-cgpa" style="font-size: var(--font-size-details);">${esc(e.cgpa)}</div>` : ''}
                        </div>
                    </div>`).join('')}` : ''}
            ${d.projects && d.projects.length ? `
                <div class="sec-title">Projects</div>
                ${d.projects.map(p => `
                    <div style="margin-bottom:10px;break-inside:avoid;">
                        <div style="font-weight:700;font-size: var(--font-size-details);color:#0f172a;">${esc(p.title)}</div>
                        ${p.tech ? `<div style="font-size: var(--font-size-details);color:#64748b;font-style:italic;"><em>Tech:</em> ${esc(p.tech)}</div>` : ''}
                        ${p.link ? `<div style="font-size: var(--font-size-details);color:#64748b;"><a href="${esc(p.link)}" target="_blank" style="color:inherit;text-decoration:underline;">${esc(p.link)}</a></div>` : ''}
                        ${p.desc ? `<div style="font-size: var(--font-size-details);color:#475569;white-space:pre-wrap;">${esc(p.desc)}</div>` : ''}
                    </div>`).join('')}` : ''}
            ${d.skills && d.skills.length ? `
                <div class="sec-title">Skills</div>
                <div class="t2-skills-row">${d.skills.map(s => `<span class="skill-chip" style="font-size: var(--font-size-details);">${esc(s)}</span>`).join('')}</div>` : ''}
            ${d.languages && d.languages.length ? `
                <div class="sec-title">Languages</div>
                <div class="t2-summary" style="font-size: var(--font-size-details);">${d.languages.map(esc).join(' · ')}</div>` : ''}
            ${customsectionsHtml}
        
    </div></div>`;
}
/* Template 3 — Gradient Banner Two-Column */
function renderT3(d) {
    const leftContent = `
        ${d.experience.length ? `
            <div class="sec-title">Experience</div>
            ${d.experience.map(e => `
                <div style="margin-bottom:10px;">
                    <div class="entry-head" style="font-size: var(--font-size-details);">${esc(e.title)}</div>
                    <div class="entry-sub" style="font-size: var(--font-size-details);">${esc(e.company)}</div>
                    <div class="entry-date" style="font-size: var(--font-size-details);">${esc(e.exp_duration)}</div>
                    <div class="entry-desc" style="font-size: var(--font-size-details);">${esc(e.desc)}</div>
                </div>`).join('')}` : ''}
        ${d.projects.length ? `
            <div class="sec-title">Projects</div>
            ${d.projects.map(p => `
                <div style="margin-bottom:8px;">
                    <div class="entry-head" style="font-size: var(--font-size-details);">${esc(p.title)}</div>
                    <div class="entry-sub" style="font-size: var(--font-size-details);">${esc(p.tech)}</div>
                    <div class="entry-desc" style="font-size: var(--font-size-details);">${esc(p.desc)}</div>
                </div>`).join('')}` : ''}
        ${d.customsections && d.customsections.length ? d.customsections.map(c => `
        <div class="sec-title">${esc(c.title)}</div>
        <ul class="t2-customsections-list" style="font-size: var(--font-size-details);">
            ${c.content.split('\n').map(line => line.trim() ? `<li>${esc(line)}</li>` : '').join('')}
        </ul>`).join('') : ''}
    
    `;
    const rightContent = `
        ${d.summary ? `<div class="sec-title">Summary</div><div class="summary" style="font-size: var(--font-size-details);">${esc(d.summary)}</div>` : ''}
        ${d.education.length ? `
            <div class="sec-title">Education</div>
            ${d.education.map(e => `
                <div style="margin-bottom:8px;">
                    <div class="entry-head" style="font-size: var(--font-size-details);">${esc(e.degree)}</div>
                    <div class="entry-sub" style="font-size: var(--font-size-details);">${esc(e.uni)}</div>
                    <div class="entry-date" style="font-size: var(--font-size-details);">${esc(e.edu_duration)}</div>
                </div>`).join('')}` : ''}
        ${d.skills.length ? `
            <div class="sec-title">Skills</div>
            <div>${d.skills.map(s => `<span class="skill-tag" style="font-size: var(--font-size-details);">${esc(s)}</span>`).join('')}</div>` : ''}
        ${d.languages.length ? `<div class="sec-title">Languages</div><div class="summary" style="font-size: var(--font-size-details);">${d.languages.map(esc).join(' · ')}</div>` : ''}
    `;

    return `<div class="cv-t3" style="--cv-color:${d.color}; font-family:${d.font}; font-size:${d.fontSize};">
        <div class="cv-header">
            <div class="cv-name">${esc(d.name)}</div>
            <div class="cv-role">${esc(d.jobTitle)}</div>
            <div class="cv-contacts" style="font-size: var(--font-size-details);">${contacts(d)}</div>
        </div>
        <div class="cv-cols">
            <div class="col-left">${leftContent}</div>
            <div class="col-right">${rightContent}</div>
        </div>
    </div>`;
}
/* Template 4 — Teal Professional Sidebar */
function renderT4(d) {
    return `<div class="cv-t4" style="--cv-color:${d.color}; font-family:${d.font}; font-size:${d.fontSize};">
        <div class="cv-sidebar">
            ${getPhotoHtml(d)}
            <div class="sb-section">Contact</div>
            ${d.email ? `<div class="sb-item" style="font-size: var(--font-size-details);"><i class="bi bi-envelope"></i> ${esc(d.email)}</div>` : ''}
            ${d.phone ? `<div class="sb-item" style="font-size: var(--font-size-details);"><i class="bi bi-telephone"></i> ${esc(d.phone)}</div>` : ''}
            ${d.address ? `<div class="sb-item" style="font-size: var(--font-size-details);"><i class="bi bi-geo-alt"></i> ${esc(d.address)}</div>` : ''}
            ${d.linkedin ? `<div class="sb-item" style="font-size: var(--font-size-details);"><i class="bi bi-linkedin"></i> <a href="${esc(d.linkedin)}" style="color:inherit;text-decoration:none;">${esc(d.linkedin)}</a></div>` : ''}
            ${d.github ? `<div class="sb-item" style="font-size: var(--font-size-details);"><i class="bi bi-github"></i> <a href="${esc(d.github)}" style="color:inherit;text-decoration:none;">${esc(d.github)}</a></div>` : ''}
            ${d.education.length ? `
                <div class="sb-section">Education</div>
                ${d.education.map(e => `
                    <div class="sb-edu" style="font-size: var(--font-size-details);"><strong>${esc(e.degree)}</strong>${esc(e.uni)}<br><small>${esc(e.edu_duration)}</small></div>`
    ).join('')}` : ''}
            ${d.skills.length ? `
                <div class="sb-section">Skills</div>
                ${d.skills.map(s => `
                    <div class="sb-skill" style="font-size: var(--font-size-details);">
                        <div class="sb-bar"><div class="sb-bar-fill" style="width:80%;"></div></div>
                        ${esc(s)}
                    </div>`).join('')}` : ''}
            ${d.languages.length ? `
                <div class="sb-section">Languages</div>
                ${d.languages.map(l => `<div class="sb-item" style="font-size: var(--font-size-details);">${esc(l)}</div>`).join('')}` : ''}
        </div>
        <div class="cv-main">
            <div class="cv-name">${esc(d.name)}</div>
            <div class="cv-role-main">${esc(d.jobTitle)}</div>
            ${d.summary ? `<div class="sec-title">About Me</div><div class="summary" style="font-size: var(--font-size-details);">${esc(d.summary)}</div>` : ''}
            ${d.experience.length ? `<div class="sec-title">Work Experience</div><div style="margin-bottom:8px;">${expBlock(d.experience, 'cv-t4')}</div>` : ''}
            ${d.projects.length ? `<div class="sec-title">Projects</div>${projBlock(d.projects, 'cv-t4')}` : ''}            
            ${d.customsections && d.customsections.length ? d.customsections.map(c => `
                <div class="sec-title">${esc(c.title)}</div>
                <div class="entry-desc" style="white-space:pre-wrap; margin-bottom: 10px; font-size: var(--font-size-details);">${esc(c.content)}</div>
            `).join('') : ''}
        </div>
    </div>`;
}
/* Template 5 — Classic Academic Center */
function renderT5(d) {
    return `<div class="cv-t5" style="--cv-color:${d.color}; font-family:${d.font}; font-size:${d.fontSize};">
        <div class="cv-header">
            <div class="cv-name" style="color: var(--cv-color);">${esc(d.name)}</div>
            <div class="cv-role" style="color: var(--cv-color);">${esc(d.jobTitle)}</div>
            <div class="cv-contacts" style="font-size: var(--font-size-details);">${contacts(d)}</div>
        </div>
        ${d.summary ? `<div class="sec-title" style="color: var(--cv-color);">Professional Summary</div><hr class="sec-divider" style="border-top-color: var(--cv-color);"><div class="summary" style="font-size: var(--font-size-details);">${esc(d.summary)}</div>` : ''}
        ${d.education.length ? `
            <div class="sec-title" style="color: var(--cv-color);">Education</div><hr class="sec-divider" style="border-top-color: var(--cv-color);">
            ${d.education.map(e => `
                <div style="margin-bottom:8px;">
                    <div class="entry-head" style="font-size: var(--font-size-details);"><span>${esc(e.degree)}</span><span>${esc(e.edu_duration)}</span></div>
                    <div class="entry-sub" style="font-size: var(--font-size-details);">${esc(e.uni)}</div>
                </div>`).join('')}` : ''}
        ${d.experience.length ? `<div class="sec-title" style="color: var(--cv-color);">Work Experience</div><hr class="sec-divider" style="border-top-color: var(--cv-color);">${expBlock(d.experience, 'cv-t5')}` : ''}
        ${d.projects.length ? `<div class="sec-title" style="color: var(--cv-color);">Projects</div><hr class="sec-divider" style="border-top-color: var(--cv-color);">${projBlock(d.projects, 'cv-t5')}` : ''}
        ${d.skills.length ? `
            <div class="sec-title" style="color: var(--cv-color);">Skills</div><hr class="sec-divider" style="border-top-color: var(--cv-color);">
            <div class="skill-list" style="font-size: var(--font-size-details);">${d.skills.map(s => `<span class="skill-item">${esc(s)}</span>`).join('')}</div>` : ''}
        ${d.languages.length ? `<div class="sec-title" style="color: var(--cv-color);">Languages</div><hr class="sec-divider" style="border-top-color: var(--cv-color);"><div class="summary" style="font-size: var(--font-size-details);">${d.languages.map(esc).join(' · ')}</div>` : ''}
        ${d.customsections && d.customsections.length ? d.customsections.map(c => `
            <div class="sec-title" style="color: var(--cv-color);">${esc(c.title)}</div><hr class="sec-divider" style="border-top-color: var(--cv-color);">
            <div class="entry-desc" style="white-space:pre-wrap; margin-bottom: 10px; font-size: var(--font-size-details);">${esc(c.content)}</div>
        `).join('') : ''}
    </div>`;
}
/* Template 6 — Tech Dark Header */
function renderT6(d) {
    return `<div class="cv-t6" style="--cv-color:${d.color}; font-family:${d.font}; font-size:${d.fontSize};">
        <div class="cv-header">
            <div class="cv-name">${esc(d.name)}</div>
            <div class="cv-role">${esc(d.jobTitle)}</div>
            <div class="cv-contacts" style="font-size: var(--font-size-details);">${contacts(d)}</div>
        </div>
        <div class="cv-body">
            ${d.summary ? `<div class="sec-title">Profile</div><div class="summary" style="font-size: var(--font-size-details);">${esc(d.summary)}</div>` : ''}
            ${d.experience.length ? `<div class="sec-title">Experience</div>${expBlock(d.experience, 'cv-t6')}` : ''}
            ${d.education.length ? `<div class="sec-title">Education</div>${eduBlock(d.education, 'cv-t6')}` : ''}
            ${d.projects.length ? `<div class="sec-title">Projects</div>${projBlock(d.projects, 'cv-t6')}` : ''}
            ${d.skills.length ? `
                <div class="sec-title">Technical Skills</div>
                <div style="font-size: var(--font-size-details);">${d.skills.map(s => `<span class="skill-chip">${esc(s)}</span>`).join('')}</div>` : ''}
            ${d.languages.length ? `<div class="sec-title">Languages</div><div class="summary" style="font-size: var(--font-size-details);">${d.languages.map(esc).join(' · ')}</div>` : ''}
            ${d.customsections && d.customsections.length ? d.customsections.map(c => `
                <div class="sec-title">${esc(c.title)}</div>
                <div class="entry-desc" style="white-space:pre-wrap; margin-bottom: 10px; font-size: var(--font-size-details);">${esc(c.content)}</div>
            `).join('') : ''}
        </div>
    </div>`;
}
/* Template 7 — Elegant Violet Timeline */
function renderT7(d) {
    const nameParts = d.name.split(' ');
    const fName = nameParts[0] || d.name;
    const lName = nameParts.slice(1).join(' ');

    return `<div class="cv-t7" style="--cv-color:${d.color}; font-family:${d.font}; font-size:${d.fontSize};">
        <div class="cv-header">
            <div class="cv-name">${esc(fName)} <span>${esc(lName)}</span></div>
            <div class="cv-role">${esc(d.jobTitle)}</div>
            <div class="cv-contacts" style="font-size: var(--font-size-details);">${contacts(d)}</div>
        </div>
        ${d.summary ? `<div class="sec-title">About</div><div class="summary" style="font-size: var(--font-size-details);">${esc(d.summary)}</div>` : ''}
        ${d.experience.length ? `
            <div class="sec-title">Experience</div>
            ${d.experience.map(e => `
                <div class="entry-wrap">
                    <div class="entry-head" style="font-size: var(--font-size-details);">${esc(e.title)}</div>
                    <div class="entry-sub" style="font-size: var(--font-size-details);">${esc(e.company)}</div>
                    <div class="entry-date" style="font-size: var(--font-size-details);">${esc(e.exp_duration)}</div>
                    <div class="entry-desc" style="font-size: var(--font-size-details);">${esc(e.desc)}</div>
                </div>`).join('')}` : ''}
        ${d.education.length ? `
            <div class="sec-title">Education</div>
            ${d.education.map(e => `
                <div class="entry-wrap">
                    <div class="entry-head" style="font-size: var(--font-size-details);">${esc(e.degree)}</div>
                    <div class="entry-sub" style="font-size: var(--font-size-details);">${esc(e.uni)}</div>
                    <div class="entry-date" style="font-size: var(--font-size-details);">${esc(e.edu_duration)}</div>
                </div>`).join('')}` : ''}
        ${d.projects.length ? `
            <div class="sec-title">Projects</div>
            ${d.projects.map(p => `
                <div class="entry-wrap">
                    <div class="entry-head" style="font-size: var(--font-size-details);">${esc(p.title)}</div>
                    <div class="entry-sub" style="font-size: var(--font-size-details);">${esc(p.tech)}</div>
                    <div class="entry-desc" style="font-size: var(--font-size-details);">${esc(p.desc)}</div>
                </div>`).join('')}` : ''}
        ${d.skills.length ? `
            <div class="sec-title">Skills</div>
            <div style="font-size: var(--font-size-details);">${d.skills.map(s => `<span class="skill-tag">${esc(s)}</span>`).join('')}</div>` : ''}
        ${d.languages.length ? `<div class="sec-title">Languages</div><div class="summary" style="font-size: var(--font-size-details);">${d.languages.map(esc).join(' · ')}</div>` : ''}
        ${d.customsections && d.customsections.length ? d.customsections.map(c => `
            <div class="sec-title">${esc(c.title)}</div>
            <div class="entry-desc" style="white-space:pre-wrap; margin-bottom: 10px; font-size: var(--font-size-details);">${esc(c.content)}</div>
        `).join('') : ''}
    </div>`;
}
/* Template 8 — Light Gray Sidebar */
function renderT8(d) {
    return `<div class="cv-t8" style="--cv-color:${d.color}; font-family:${d.font}; font-size:${d.fontSize};">
        <div class="cv-sidebar">
            ${getPhotoHtml(d)}
            <div class="sb-section">Contact</div>
            ${d.email ? `<div class="sb-item" style="font-size: var(--font-size-details);"><i class="bi bi-envelope"></i> ${esc(d.email)}</div>` : ''}
            ${d.phone ? `<div class="sb-item" style="font-size: var(--font-size-details);"><i class="bi bi-telephone"></i> ${esc(d.phone)}</div>` : ''}
            ${d.address ? `<div class="sb-item" style="font-size: var(--font-size-details);"><i class="bi bi-geo-alt"></i> ${esc(d.address)}</div>` : ''}
            ${d.linkedin ? `<div class="sb-item" style="font-size: var(--font-size-details);"><i class="bi bi-linkedin"></i> <a href="${esc(d.linkedin)}" style="color:inherit;text-decoration:none;">${esc(d.linkedin)}</a></div>` : ''}
            ${d.github ? `<div class="sb-item" style="font-size: var(--font-size-details);"><i class="bi bi-github"></i> <a href="${esc(d.github)}" style="color:inherit;text-decoration:none;">${esc(d.github)}</a></div>` : ''}
            ${d.education.length ? `
                <div class="sb-section">Education</div>
                ${d.education.map(e => `
                    <div style="margin-bottom:7px;">
                        <div style="font-size: var(--font-size-details); font-weight:700;color:#0f172a;">${esc(e.degree)}</div>
                        <div style="font-size: var(--font-size-details); color:#64748b;">${esc(e.uni)}</div>
                        <div style="font-size: var(--font-size-details); color:#94a3b8;">${esc(e.edu_duration)}</div>
                    </div>`).join('')}` : ''}
            ${d.skills.length ? `
                <div class="sb-section">Skills</div>
                ${d.skills.map(s => `
                    <div class="sb-skill" style="font-size: var(--font-size-details);"><div class="sb-dot"></div>${esc(s)}</div>`).join('')}` : ''}
            ${d.languages.length ? `
                <div class="sb-section">Languages</div>
                ${d.languages.map(l => `<div class="sb-skill" style="font-size: var(--font-size-details);"><div class="sb-dot"></div>${esc(l)}</div>`).join('')}` : ''}
        </div>
        <div class="cv-main">
            <div class="cv-name">${esc(d.name)}</div>
            <div class="cv-role-main">${esc(d.jobTitle)}</div>
            ${d.summary ? `<div class="sec-title" style="margin-top:0;">Summary</div><div class="summary" style="font-size: var(--font-size-details);">${esc(d.summary)}</div>` : ''}
            ${d.experience.length ? `<div class="sec-title">Experience</div>${expBlock(d.experience, 'cv-t8')}` : ''}
            ${d.projects.length ? `<div class="sec-title">Projects</div>${projBlock(d.projects, 'cv-t8')}` : ''}
            ${d.customsections && d.customsections.length ? d.customsections.map(c => `
                <div class="sec-title">${esc(c.title)}</div>
                <div class="entry-desc" style="white-space:pre-wrap; margin-bottom: 10px; font-size: var(--font-size-details);">${esc(c.content)}</div>
            `).join('') : ''}
        </div>
    </div>`;
}
/* Template 9 — Red Accent Strip */
function renderT9(d) {
    return `<div class="cv-t9" style="--cv-color:${d.color}; font-family:${d.font}; font-size:${d.fontSize};">
        <div class="cv-strip"></div>
        <div class="cv-inner">
            <div class="cv-header">
                <div>
                    <div class="cv-name">${esc(d.name)}</div>
                    <div class="cv-role">${esc(d.jobTitle)}</div>
                </div>
                <div class="cv-contacts" style="font-size: var(--font-size-details);">
                ${d.email ? `<div class="sb-item" style="font-size: var(--font-size-details);"><i class="bi bi-envelope"></i> ${esc(d.email)}</div>` : ''}
                ${d.phone ? `<div class="sb-item" style="font-size: var(--font-size-details);"><i class="bi bi-telephone"></i> ${esc(d.phone)}</div>` : ''}
                ${d.address ? `<div class="sb-item" style="font-size: var(--font-size-details);"><i class="bi bi-geo-alt"></i> ${esc(d.address)}</div>` : ''}
                ${d.linkedin ? `<div class="sb-item" style="font-size: var(--font-size-details);"><i class="bi bi-linkedin"></i> <a href="${esc(d.linkedin)}" target="_blank" style="color:inherit;text-decoration:none;">${esc(d.linkedin)}</a></div>` : ''}
                ${d.github ? `<div class="sb-item" style="font-size: var(--font-size-details);"><i class="bi bi-github"></i> <a href="${esc(d.github)}" target="_blank" style="color:inherit;text-decoration:none;">${esc(d.github)}</a></div>` : ''}
        </div>
            </div>
            ${d.summary ? `<div class="sec-title">Profile</div><div class="summary" style="font-size: var(--font-size-details);">${esc(d.summary)}</div>` : ''}
            ${d.education.length ? `<div class="sec-title">Education</div>${eduBlock(d.education, 'cv-t9')}` : ''}
            ${d.experience.length ? `<div class="sec-title">Experience</div>${expBlock(d.experience, 'cv-t9')}` : ''}
            ${d.projects.length ? `<div class="sec-title">Projects</div>${projBlock(d.projects, 'cv-t9')}` : ''}
            ${d.skills.length ? `
                <div class="sec-title">Skills</div>
                <div style="font-size: var(--font-size-details);">${d.skills.map(s => `<span class="skill-chip">${esc(s)}</span>`).join('')}</div>` : ''}
            ${d.languages.length ? `<div class="sec-title">Languages</div><div class="summary" style="font-size: var(--font-size-details);">${d.languages.map(esc).join(' · ')}</div>` : ''}
            ${d.customsections && d.customsections.length ? d.customsections.map(c => `
                <div class="sec-title">${esc(c.title)}</div>
                <div class="entry-desc" style="white-space:pre-wrap; margin-bottom: 10px; font-size: var(--font-size-details);">${esc(c.content)}</div>
            `).join('') : ''}
        </div>
    </div>`;
}
/* Template 10 — Green Executive Two-Column */
function renderT10(d) {
    return `<div class="cv-t10" style="--cv-color:${d.color}; font-family:${d.font}; font-size:${d.fontSize};">
        <div class="cv-sidebar">
            ${getPhotoHtml(d)}
            <div class="sb-section">Contact</div>
            ${d.email ? `<div class="sb-item" style="font-size: var(--font-size-details);"><i class="bi bi-envelope"></i> ${esc(d.email)}</div>` : ''}
            ${d.phone ? `<div class="sb-item" style="font-size: var(--font-size-details);"><i class="bi bi-telephone"></i> ${esc(d.phone)}</div>` : ''}
            ${d.address ? `<div class="sb-item" style="font-size: var(--font-size-details);"><i class="bi bi-geo-alt"></i> ${esc(d.address)}</div>` : ''}
            ${d.linkedin ? `<div class="sb-item" style="font-size: var(--font-size-details);"><i class="bi bi-linkedin"></i> <a href="${esc(d.linkedin)}" target="_blank" style="color:inherit;text-decoration:none;">${esc(d.linkedin)}</a></div>` : ''}
            ${d.github ? `<div class="sb-item" style="font-size: var(--font-size-details);"><i class="bi bi-github"></i> <a href="${esc(d.github)}" target="_blank" style="color:inherit;text-decoration:none;">${esc(d.github)}</a></div>` : ''}
        
            ${d.education.length ? `
                <div class="sb-section">Education</div>
                ${d.education.map(e => `
                    <div style="margin-bottom:8px;font-size: var(--font-size-details);">
                        <strong style="display:block;">${esc(e.degree)}</strong>
                        ${esc(e.uni)}<br>
                        <small style="opacity:.7;">${esc(e.edu_duration)}</small>
                    </div>`).join('')}` : ''}
            ${d.skills.length ? `
                <div class="sb-section">Skills</div>
                ${d.skills.map(s => `
                    <div class="sb-skill" style="font-size: var(--font-size-details);"><div class="sb-skill-dot"></div>${esc(s)}</div>`).join('')}` : ''}
            ${d.languages.length ? `
                <div class="sb-section">Languages</div>
                ${d.languages.map(l => `
                    <div class="sb-skill" style="font-size: var(--font-size-details);"><div class="sb-skill-dot"></div>${esc(l)}</div>`).join('')}` : ''}
        </div>
        <div class="cv-main">
            <div class="cv-name">${esc(d.name)}</div>
            <div class="cv-role-main">${esc(d.jobTitle)}</div>
            ${d.summary ? `<div class="sec-title">Summary</div><div class="summary" style="font-size: var(--font-size-details);">${esc(d.summary)}</div>` : ''}
            ${d.experience.length ? `<div class="sec-title">Experience</div>${expBlock(d.experience, 'cv-t10')}` : ''}
            ${d.projects.length ? `<div class="sec-title">Projects</div>${projBlock(d.projects, 'cv-t10')}` : ''}
            ${d.customsections && d.customsections.length ? d.customsections.map(c => `
                <div class="sec-title">${esc(c.title)}</div>
                <div class="entry-desc" style="white-space:pre-wrap; margin-bottom: 10px; font-size: var(--font-size-details);">${esc(c.content)}</div>
            `).join('') : ''}
        </div>
    </div>`;
}

/* ═══════════════════════════════════════════════════════════════════════════
   08. MAIN UPDATE FUNCTION
   ═══════════════════════════════════════════════════════════════════════════ */

function updatePreview() {
    const d = getData();

    const renders = {
        template1: renderT1, template2: renderT2, template3: renderT3,
        template4: renderT4, template5: renderT5, template6: renderT6,
        template7: renderT7, template8: renderT8, template9: renderT9,
        template10: renderT10,
    };

    const fn = renders[d.template] || renderT1;
    const cvDoc = document.getElementById('cvDocument');
    if (cvDoc) {
        cvDoc.innerHTML = fn(d);
        cvDoc.style.fontFamily = d.font;
        cvDoc.style.fontSizeName = d.fontSizeName;
        cvDoc.style.fontSizeHeading = d.fontSizeHeading;
        cvDoc.style.fontSizeDetails = d.fontSizeDetails;
    }

    applyThemeColor(d.color);
    recalcAts();
    scalePreview();
}

function calculateStrictAts() { recalcAts(); }


/* ═══════════════════════════════════════════════════════════════════════════
   09. DYNAMIC ENTRY MANAGEMENT
   ═══════════════════════════════════════════════════════════════════════════ */

function addMore(containerId, entryClass, updateFunc) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const seed = container.querySelector('.' + entryClass);
    if (!seed) return;

    const clone = seed.cloneNode(true);

    clone.querySelectorAll('input, textarea').forEach(inp => inp.value = '');

    const removeBtn = clone.querySelector('.remove-btn');
    if (removeBtn) removeBtn.style.display = 'block';

    container.appendChild(clone);

    attachDynamicListeners(containerId, entryClass, updateFunc);

    if (updateFunc) updateFunc();
}

function removeEntry(btn, updateFunc) {
    const entry = btn.closest('.dynamic-entry');
    if (entry) {
        entry.remove();
        if (updateFunc) updateFunc();
    }
}

function attachDynamicListeners(containerId, className, updateFunc) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.querySelectorAll('.' + className + ' input, .' + className + ' textarea').forEach(el => {
        el.removeEventListener('input', updateFunc);
        el.addEventListener('input', updateFunc);
    });
}

/* ═══════════════════════════════════════════════════════════════════════════
   10. SECTION PREVIEW UPDATERS 
═══════════════════════════════════════════════════════════════════════════ */

function updateEducationPreview() { updatePreview(); }
function updateExperiencePreview() { updatePreview(); }
function updateProjectPreview() { updatePreview(); }
function updateSkillsPreview() { updatePreview(); }
function updateLanguagesPreview() { updatePreview(); }
function updateCustomSectionsPreview() {
    const area = document.getElementById('previewCustomSectionsArea');
    if (!area) return;
    const color = document.getElementById('hexColorValue')?.value || '#2563eb';
    let html = '';

    document.querySelectorAll('#customsectionsContainer .customsections-entry').forEach(entry => {
        const title = entry.querySelector('.sync-customsections-title')?.value || '';
        const content = entry.querySelector('.sync-customsections-content')?.value || '';

        if (title.trim() || content.trim()) {
            html += `
            <div class="preview-custom-section mb-3">
                <div class="cv-section-title dynamic-color-text dynamic-color-border"
                     style="color:${color}; border-bottom: 2px solid ${color}; font-weight: bold; text-transform: uppercase; margin-bottom: 5px;">
                    ${escHtml(title) || 'Custom Section'}
                </div>
                <div class="cv-text" style="white-space:pre-wrap; font-size: 0.9rem;">${escHtml(content)}</div>
            </div>`;
        }
    });
    area.innerHTML = html;
}
function syncInputToPreview() { updatePreview(); }

/* ═══════════════════════════════════════════════════════════════════════════
   11. ULTRA-STRICT ATS SCORING SYSTEM 
   ═══════════════════════════════════════════════════════════════════════════ */

function recalcAts() {
    let score = 0;
    let topSuggestion = null;
    let highestWeight = 0;

    // 1. Job Title Check (5 points)
    const jobTitle = document.getElementById('inputJobTarget')?.value.trim() || '';
    if (jobTitle) {
        score += ATS_WEIGHTS.jobTitle;
    } else {
        if (ATS_WEIGHTS.jobTitle > highestWeight) {
            highestWeight = ATS_WEIGHTS.jobTitle;
            topSuggestion = {
                text: 'Add your target job title (e.g., "Software Engineer", "Project Manager")',
                icon: 'bi-briefcase-fill',
                weight: ATS_WEIGHTS.jobTitle
            };
        }
    }

    // 2. Summary Check (15 points)
    const summary = document.getElementById('inputSummary')?.value.trim() || '';
    const summaryWords = wordCount(summary);
    if (summaryWords >= 40) {
        score += ATS_WEIGHTS.summary;
    } else if (summaryWords >= 20) {
        score += ATS_WEIGHTS.summary * 0.6;
        if (ATS_WEIGHTS.summary * 0.4 > highestWeight) {
            highestWeight = ATS_WEIGHTS.summary * 0.4;
            topSuggestion = {
                text: `Expand your professional summary to 40+ words (currently ${summaryWords} words)`,
                icon: 'bi-file-text-fill',
                weight: ATS_WEIGHTS.summary * 0.4
            };
        }
    } else {
        if (ATS_WEIGHTS.summary > highestWeight) {
            highestWeight = ATS_WEIGHTS.summary;
            topSuggestion = {
                text: `Write a professional summary (40+ words) highlighting your career goals and strengths`,
                icon: 'bi-file-text-fill',
                weight: ATS_WEIGHTS.summary
            };
        }
    }

    // 3. KEYWORD MATCH - ULTRA STRICT (40 points)
    const keywordMatch = calculateKeywordMatch();
    const keywordScore = (keywordMatch.percentage / 100) * ATS_WEIGHTS.keywords;
    score += keywordScore;

    // If keyword match is below 70%, suggest adding missing keywords
    if (keywordMatch.percentage < 70 && jobTitle) {
        const missingTop3 = keywordMatch.missing.slice(0, 3).join(', ');
        const pointsLost = ATS_WEIGHTS.keywords - keywordScore;

        if (pointsLost > highestWeight) {
            highestWeight = pointsLost;
            topSuggestion = {
                text: `Add industry keywords for "${jobTitle}": ${missingTop3}`,
                icon: 'bi-key-fill',
                weight: pointsLost
            };
        }
    }

    // 4. Education Check (5 points)
    const hasEdu = hasEntry('.edu-entry', '.sync-edu-degree');
    if (hasEdu) {
        score += ATS_WEIGHTS.education;
    } else {
        if (ATS_WEIGHTS.education > highestWeight) {
            highestWeight = ATS_WEIGHTS.education;
            topSuggestion = {
                text: 'Add at least one education entry',
                icon: 'bi-mortarboard-fill',
                weight: ATS_WEIGHTS.education
            };
        }
    }

    // 5. Experience/Projects Check (10 points)
    const hasExp = hasEntry('.exp-entry', '.sync-exp-title');
    const hasProj = hasEntry('.proj-entry', '.sync-proj-title');
    if (hasExp || hasProj) {
        score += ATS_WEIGHTS.experience;
    } else {
        if (ATS_WEIGHTS.experience > highestWeight) {
            highestWeight = ATS_WEIGHTS.experience;
            topSuggestion = {
                text: 'Add at least one work experience or project entry',
                icon: 'bi-briefcase-fill',
                weight: ATS_WEIGHTS.experience
            };
        }
    }

    // 6. Skills Check (10 points)
    const numSkills = skillCount();
    if (numSkills >= 6) {
        score += ATS_WEIGHTS.skills;
    } else if (numSkills >= 3) {
        score += ATS_WEIGHTS.skills * 0.5;
        if (ATS_WEIGHTS.skills * 0.5 > highestWeight) {
            highestWeight = ATS_WEIGHTS.skills * 0.5;
            topSuggestion = {
                text: `Add more skills (currently ${numSkills}, aim for 6+)`,
                icon: 'bi-lightning-fill',
                weight: ATS_WEIGHTS.skills * 0.5
            };
        }
    } else {
        if (ATS_WEIGHTS.skills > highestWeight) {
            highestWeight = ATS_WEIGHTS.skills;
            topSuggestion = {
                text: 'Add at least 6 relevant technical skills',
                icon: 'bi-lightning-fill',
                weight: ATS_WEIGHTS.skills
            };
        }
    }

    // 7. Action Verbs Check (10 points)
    let fullText = summary.toLowerCase();
    document.querySelectorAll('.sync-exp-desc, .sync-proj-desc').forEach(el => {
        fullText += ' ' + (el.value || '').toLowerCase();
    });

    let verbCount = 0;
    ACTION_VERBS.forEach(verb => {
        if (fullText.includes(verb)) verbCount++;
    });

    const verbScore = Math.min((verbCount / 5) * ATS_WEIGHTS.actionVerbs, ATS_WEIGHTS.actionVerbs);
    score += verbScore;

    if (verbCount < 5) {
        const pointsLost = ATS_WEIGHTS.actionVerbs - verbScore;
        if (pointsLost > highestWeight) {
            highestWeight = pointsLost;
            topSuggestion = {
                text: `Use more action verbs in descriptions (e.g., "Developed", "Led", "Optimized")`,
                icon: 'bi-lightning-charge-fill',
                weight: pointsLost
            };
        }
    }

    // 8. Contact Check (5 points)
    const phone = document.getElementById('inputPhone')?.value.trim() || '';
    if (phone && phone !== '+91 0000000000') {
        score += ATS_WEIGHTS.contact;
    } else {
        if (ATS_WEIGHTS.contact > highestWeight) {
            highestWeight = ATS_WEIGHTS.contact;
            topSuggestion = {
                text: 'Add your phone number',
                icon: 'bi-telephone-fill',
                weight: ATS_WEIGHTS.contact
            };
        }
    }

    // Cap score at 100
    score = Math.min(Math.round(score), 100);

    // Update UI
    const scoreEl = document.getElementById('liveAtsScore');
    const barEl = document.getElementById('atsProgressBar');
    const listEl = document.getElementById('atsSuggestionsList');

    const color = score >= 75 ? '#16a34a' : (score >= 50 ? '#d97706' : '#dc2626');

    if (scoreEl) {
        scoreEl.textContent = score + '%';
        scoreEl.style.color = color;
    }

    if (barEl) {
        barEl.style.width = score + '%';
        barEl.style.background = color;
    }

    if (listEl) {
        if (score >= 90) {
            listEl.innerHTML = `
                <div class="text-center py-3">
                    <i class="bi bi-trophy-fill text-warning" style="font-size:2rem;"></i>
                    <div class="fw-bold text-success mt-2">Outstanding! Your CV is ATS-optimized.</div>
                </div>`;
        } else if (topSuggestion) {
            listEl.innerHTML = `
                <div class="ats-suggestion-single">
                    <div class="d-flex align-items-start gap-2">
                        <i class="${topSuggestion.icon} text-primary" style="font-size:1.25rem;margin-top:2px;"></i>
                        <div class="flex-grow-1">
                            <div class="fw-semibold text-dark">${topSuggestion.text}</div>
                            <div class="small text-muted mt-1">Worth +${Math.round(topSuggestion.weight)} points</div>
                        </div>
                    </div>
                </div>`;
        } else {
            listEl.innerHTML = `<div class="text-success small">✓ All checks passed!</div>`;
        }
    }

    const hidden = document.getElementById('hiddenAtsScore');
    if (hidden) hidden.value = score;

    return score;
}


/* ═══════════════════════════════════════════════════════════════════════════
   12. PDF DOWNLOAD (FIXED - "SAVE AS" DIALOG)
   ═══════════════════════════════════════════════════════════════════════════ */
/*
 * Triggers "Save As" dialog with dynamic filename
 * Format: [Target_Job]_CV_[Date].pdf
 * Example: Software_Engineer_CV_2026-04-03.pdf
 */
async function downloadPdfHandler() {
    const element = document.getElementById('cvDocument');
    if (!element) return;

    const jobTitle = document.getElementById('inputJobTarget')?.value.trim() || 'Professional';
    const cleanName = jobTitle.replace(/[^a-zA-Z0-9]/g, '_');
    const dateStr = new Date().toISOString().split('T')[0];
    const filename = `${cleanName}_CV_${dateStr}.pdf`;

    // Temporarily remove CSS scale so html2pdf captures true A4 size
    const savedTransform = element.style.transform;
    const savedTransformOrigin = element.style.transformOrigin;
    element.style.transform = 'scale(1)';
    element.style.transformOrigin = 'top left';

    const opt = {
        margin: 0,
        filename: filename,
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'px', format: [794, 1123], orientation: 'portrait' },
    };

    try {
        // Generate PDF as a raw ArrayBuffer blob
        const pdfBlob = await html2pdf().set(opt).from(element).outputPdf('blob');

        // Restore visual scale regardless of save path taken
        element.style.transform = savedTransform;
        element.style.transformOrigin = savedTransformOrigin;
        scalePreview();

        // Try the File System Access API "Save As" dialog first
        if (typeof window.showSaveFilePicker === 'function') {
            try {
                const fileHandle = await window.showSaveFilePicker({
                    suggestedName: filename,
                    types: [{
                        description: 'PDF Document',
                        accept: { 'application/pdf': ['.pdf'] },
                    }],
                });
                const writable = await fileHandle.createWritable();
                await writable.write(pdfBlob);
                await writable.close();
            } catch (pickerErr) {
                if (pickerErr.name !== 'AbortError') {
                    console.error('Save picker error:', pickerErr);
                }
            }
        } else {
            const url = URL.createObjectURL(pdfBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setTimeout(() => URL.revokeObjectURL(url), 5000);
        }

    } catch (err) {
        element.style.transform = savedTransform;
        element.style.transformOrigin = savedTransformOrigin;
        console.error('PDF generation failed:', err);
        alert('Failed to generate PDF. Please try again.');
    }
}

/* ═══════════════════════════════════════════════════════════════════════════
   13. INITIALIZATION
   ═══════════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

    document.querySelectorAll('input[name="template_chosen"]').forEach(radio => {
        radio.addEventListener('change', updatePreview);
    });

    const cvForm = document.getElementById('cvForm');
    if (cvForm) {
        cvForm.addEventListener('input', updatePreview);
        cvForm.addEventListener('change', updatePreview);
    }

    document.getElementById('inputFont')?.addEventListener('change', applyStyles);
    document.getElementById('inputFontSizeName')?.addEventListener('change', applyStyles);
    document.getElementById('inputFontSizeHeading')?.addEventListener('change', applyStyles);
    document.getElementById('inputFontSizeDetails')?.addEventListener('change', applyStyles);

    initColorSwatches();

    document.getElementById('downloadPdfBtn')?.addEventListener('click', downloadPdfHandler);

    attachDynamicListeners('eduContainer', 'sync-edu-degree', updateEducationPreview);
    attachDynamicListeners('eduContainer', 'sync-edu-uni', updateEducationPreview);
    attachDynamicListeners('eduContainer', 'sync-edu-duration', updateEducationPreview);
    attachDynamicListeners('eduContainer', 'sync-edu-cgpa', updateEducationPreview);

    attachDynamicListeners('expContainer', 'sync-exp-title', updateExperiencePreview);
    attachDynamicListeners('expContainer', 'sync-exp-company', updateExperiencePreview);
    attachDynamicListeners('expContainer', 'sync-exp-duration', updateExperiencePreview);
    attachDynamicListeners('expContainer', 'sync-exp-desc', updateExperiencePreview);

    attachDynamicListeners('projContainer', 'sync-proj-title', updateProjectPreview);
    attachDynamicListeners('projContainer', 'sync-proj-tech', updateProjectPreview);
    attachDynamicListeners('projContainer', 'sync-proj-link', updateProjectPreview);
    attachDynamicListeners('projContainer', 'sync-proj-desc', updateProjectPreview);

    attachDynamicListeners('customsectionsContainer', 'sync-customsections-title', function () {
        updateCustomSectionsPreview();
        updatePreview();
    });
    attachDynamicListeners('customsectionsContainer', 'sync-customsections-content', function () {
        updateCustomSectionsPreview();
        updatePreview();
    });

    requestAnimationFrame(function () {
        requestAnimationFrame(function () {
            applyStyles();
            updatePreview();
            scalePreview();
        });
    });

    window.addEventListener('load', scalePreview);
    window.addEventListener('resize', scalePreview);
});