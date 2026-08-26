import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = resolve(root, 'dist');
const base = '/John-Jevi-dela-Cruz/';
const origin = `https://johnjevidelacruz.github.io${base}`;
const email = 'johnjevi.delacruz@gmail.com';
const whatsapp = 'https://wa.me/639610704926';

const href = (path = '') => `${base}${path}`.replace(/\/\/{2,}/g, '/');
const canonical = (path = '') => new URL(path, origin).href;

const cases = [
  {
    slug: 'dan-moving-team',
    title: 'Turning moving-company support into a managed operating rhythm',
    organisation: 'Dan The Moving Man',
    categories: ['people', 'process', 'systems'],
    label: 'Current role · verified responsibilities',
    summary: 'Managing a VA team, assigning ownership, monitoring completion, coaching individuals, resolving claims and standardising work through SOPs and Loom tutorials.',
    context: 'A moving-company environment where customer communication, sales follow-up, inventories, CRM records and field issues must move together. Jevi returned for a second stint as VA Manager on 30 March 2026, working flexibly for approximately 15 hours per week.',
    problem: 'Daily work crossed several people and channels. Without clear ownership and repeatable guidance, tasks could require repeated follow-up, decisions could vary, and customer disputes could remain open longer than necessary.',
    owned: ['VA-team coordination and day-to-day work allocation', 'Delegation, completion monitoring and follow-up', 'Individual coaching and practical performance support', 'Customer dispute and claims coordination', 'SOPs, operational guides, training material and Loom tutorials', 'Customer and sales communication when the operation required it'],
    diagnosis: 'The core risk was not a lack of activity. It was variation: the same type of work could be handled differently depending on who received it, while the owner or manager remained the default escalation point.',
    changes: ['Made task ownership explicit and followed work through to completion', 'Converted recurring explanations into written standards and short video guidance', 'Used individual coaching to correct execution gaps', 'Kept customer, sales and field context connected to the team workflow'],
    standard: 'A managed rhythm of assign, confirm, monitor, coach and close—supported by SOPs and Loom tutorials rather than one person’s memory.',
    systems: 'Moving-company CRM records, customer communication channels, inventory and estimate context, operating guides and Loom.',
    evidence: 'The public claim is the verified scope of the current VA Manager role. No team-size or performance metric is published because none has been confirmed for this role.',
    easier: 'The team has a clearer source of direction, recurring work is easier to repeat consistently, and escalations have an accountable owner.'
  },
  {
    slug: 'harvestwise-practice-workflow',
    title: 'Making signing, payment, lodgement and ASIC work visible',
    organisation: 'HarvestWise Accounting',
    categories: ['process', 'systems', 'finance', 'data'],
    label: 'Current role · dated operating evidence',
    summary: 'Controlling the post-accountant workflow across client execution, billing and payment checks, status management, lodgement administration and ASIC/company-secretarial coordination.',
    context: 'An Australian accounting-practice environment. Accountants complete the technical accounting and tax work; Jevi manages the operational execution that follows as Practice Manager, a flexible role held since February 2026 for approximately 20 hours per week.',
    problem: 'A file could move through preparation, approval, signing, payment, submission and filing across several systems. Without one operating view, unsigned, unpaid or exception work could be difficult to see and follow through.',
    owned: ['Adobe Sign package preparation and client execution tracking', 'XPM and Xero Tax status control from approval through filing', 'Billing, payment readiness, collections and exception follow-up', 'Accountant work-allocation and billing/commission tracking', 'ATO lodgement administration after technical work was completed', 'ASIC annual-review, company-change, registration and deregistration administration', 'Central audit and tracking views across the workflow'],
    diagnosis: 'The important question was not simply whether a document existed. It was which operational conditions had been met—approved, sent, signed, paid, lodged or filed—and what exception was preventing the next step.',
    changes: ['Maintained a central lodgement audit and tracking view', 'Aligned document, payment and status checks before the next action', 'Kept accountant allocation and billing records connected to completed work', 'Used explicit workflow states and exception follow-up across signing, lodgement and ASIC work'],
    standard: 'A controlled post-preparation workflow with visible status, payment and signing conditions, clear next actions and documented exceptions.',
    systems: 'XPM, Xero Tax, Xero, Adobe Sign, Outlook, Teams, Trello, Google Sheets, Constitute and ASIC systems.',
    evidence: 'As of 24 August 2026, the central Lodgement Audit and Tracking system covered 1,350 records, including 1,072 lodged records and 335 files recorded as sent for signing. All public evidence is aggregated and anonymised.',
    easier: 'Unsigned, unpaid and not-yet-filed work can be identified from one operating view, allowing follow-up to be prioritised without relying on inbox memory.',
    caution: 'This is operations, administration and workflow control—not tax, accounting or legal advice.'
  },
  {
    slug: 'iqor-quality-improvement',
    title: 'Turning QA data into coaching and measurable improvement',
    organisation: 'iQor',
    categories: ['people', 'process', 'data'],
    label: 'Completed role · measured evidence',
    summary: 'Leading quality analysts, standardising calibration and translating audits into coaching, reporting and action plans.',
    context: 'A customer-support quality programme where audit quality, coaching consistency and leadership reporting had to operate as one system. Jevi served as Lead Quality Analyst from July 2023 to January 2025.',
    problem: 'Quality findings only become useful when they lead to consistent scoring, targeted coaching and management action. Variation in interpretation can weaken both the data and the intervention.',
    owned: ['Leadership of 10 quality analysts', 'Audit and coaching schedules supporting approximately 25 agents', 'Weekly calibration within the team and across sites/partners', 'Power BI extraction, charts, insight decks and business reviews', 'QA guideline rollout, root-cause coaching and action planning'],
    diagnosis: 'Audit results were grouped into specific failure modes so the team could distinguish isolated misses from recurring behavioural or process issues.',
    changes: ['Standardised scoring through weekly calibration', 'Focused higher-frequency support on five bottom performers', 'Connected QA findings to training and Operations action plans', 'Presented concise evidence to clients and management'],
    standard: 'A repeatable audit–calibrate–coach–report–improve cycle with named owners and a weekly cadence.',
    systems: 'Power BI, Excel/Sheets reporting, QA review workflows, coaching records and presentation decks.',
    evidence: 'Led 10 QAs and supported approximately 25 agents. Completed approximately 30 audits and 30 coaching sessions weekly. Empathy non-compliance reduced from 60% to 45% over three weeks, while average handling time decreased from 685 to 618 seconds in the supported improvement period.',
    easier: 'Managers could see what changed, why it mattered and which coaching or process action should happen next.'
  },
  {
    slug: 'fsecom-profit-intelligence',
    title: 'One operating view for profit, stock and data quality',
    organisation: 'FSECOM project',
    categories: ['systems', 'finance', 'data', 'automation'],
    label: 'Project record · dates to confirm',
    summary: 'Centralising revenue, cost, advertising, inventory, refunds and reconciliation data into a dashboard-ready operating model.',
    context: 'A DTC/eCommerce finance-operations and analytics project built in Google Sheets. The project dates and formal client attribution remain unconfirmed and are intentionally not stated.',
    problem: 'Order, transaction, advertising and inventory data came from fragmented sources. Missing records, mapping issues and source mismatches could silently distort profit and stock decisions.',
    owned: ['Workbook architecture and operating logic', 'CheckoutChamp and Facebook Ads ingestion patterns', 'Pagination, looping, normalisation and upsert/deduplication logic', 'Inventory depletion and time-based costing logic', 'Data-quality checks and dashboard-ready metrics'],
    diagnosis: 'A missing “New Sale” pattern was traced to a source/parameter mismatch. The source of truth was changed from Order Details API to Transaction Details API and the affected historical period was reprocessed.',
    changes: ['Created structured Orders, Order Items, Daily Data, Performance, Inventory, Cost History and Data Quality views', 'Added missing-date, duplicate-order, product-mapping and revenue-mismatch checks', 'Built profit, margin, CPA, AOV, inventory-health and reorder calculations', 'Designed FIFO-style stock depletion and time-based costing'],
    standard: 'A single operating model with explicit source rules, reusable transformations, reconciliation checks and visible exceptions.',
    systems: 'Google Sheets, CheckoutChamp data, Facebook Ads data, Zapier and code-based automation logic.',
    evidence: 'The build and system logic are documented. Dates, attribution and commercial outcomes are not published until they are confirmed.',
    easier: 'Operators can investigate one reconciled view instead of comparing disconnected exports and discovering silent gaps after a decision has been made.'
  },
  {
    slug: 'prestige-finance-operations',
    title: 'Building control into day-to-day finance operations',
    organisation: 'Prestige Insulation LLC',
    categories: ['people', 'process', 'finance', 'systems'],
    label: 'Completed role · verified responsibilities',
    summary: 'Managing QBO invoicing, payment posting, transaction matching, reconciliation support, validation, trackers, training and quality control.',
    context: 'A finance-operations function supporting an insulation business. Jevi served as Head of Finance Department / Finance Operations Lead from January to June 2026.',
    problem: 'Invoicing, payments, refunds, order data and card transactions needed to match across the operation. Missing or conflicting transactions created reconciliation gaps and reduced confidence in the operating view.',
    owned: ['QuickBooks Online finance workflows and invoicing', 'Receive-payment and payment posting', 'Transaction matching, expenses, credits and adjustments', 'Multi-card reconciliation support and investigation', 'Order-to-invoice validation', 'Finance-team coordination, training, trackers and QC'],
    diagnosis: 'Exceptions were traced to the transaction and source record rather than cleared without explanation.',
    changes: ['Mapped vendor and order data', 'Validated order-to-invoice accuracy', 'Investigated missing transactions and refund/charge differences', 'Maintained activity, sales and finance-operations trackers'],
    standard: 'A controlled finance-operations workflow with matching rules, exception investigation, quality review and clear tracker ownership.',
    systems: 'QuickBooks Online, order and vendor data, card transaction records and operating trackers.',
    evidence: 'The role title, dates and responsibility set are verified. No CFO, controller or tax-advisory authority is claimed.',
    easier: 'Unresolved differences can be isolated and followed through with a clearer record of what was checked and what remains open.'
  },
  {
    slug: 'flowise-rag-chatbot',
    title: 'Separating chatbot ingestion from the public runtime',
    organisation: 'Flowise RAG build',
    categories: ['systems', 'automation'],
    label: 'Technical build · no adoption claim',
    summary: 'Reworking a retrieval-augmented chatbot so the public embed used only the runtime path and no longer triggered an ingestion-related error.',
    context: 'A Flowise chatbot using retrieval-augmented generation over an Excel dataset.',
    problem: 'The public embed returned a 400 error because ingestion and credential-dependent nodes were included in the runtime flow.',
    owned: ['Flow architecture', 'Dataset ingestion and retrieval configuration', 'Runtime/embed troubleshooting', 'Deployment through GitHub Pages'],
    diagnosis: 'The error was isolated to nodes needed to load and index data, not to the public question-and-answer runtime itself.',
    changes: ['Separated ingestion and credential nodes from the public runtime flow', 'Configured Qdrant retrieval and Jina embeddings', 'Used GroqChat with a conversational retrieval QA chain', 'Removed source-document chips from the public widget'],
    standard: 'A clear boundary between controlled ingestion and the public runtime.',
    systems: 'Flowise, GroqChat, Qdrant Vector Store and Retriever, Jina Embeddings v3, Excel/File Loader and Character Text Splitter.',
    evidence: 'The architecture change and deployment are documented. No unsupported user-adoption, accuracy or production-scale claim is made.',
    easier: 'The public widget can run against the prepared knowledge base without exposing ingestion steps or credentials.'
  },
  {
    slug: 'movemate-estimator',
    title: 'Translating visible household items into moving inventory data',
    organisation: 'MoveMate concept',
    categories: ['systems', 'automation'],
    label: 'Concept / app · production not claimed',
    summary: 'A moving-industry concept that uses visible household items to support inventory and estimate preparation.',
    context: 'A concept/app designed around a recurring moving-company problem: translating photos or video into an inventory that an estimator can review.',
    problem: 'Customers often provide incomplete written inventories. Estimators still need a structured item list before selecting crews, trucks or estimate assumptions.',
    owned: ['Problem framing', 'Inventory-oriented object identification concept', 'Moving-specific output design'],
    diagnosis: 'Generic object recognition is not enough; the useful output must map what is visible to a moving inventory and preserve uncertainty for human review.',
    changes: ['Defined the item-to-inventory workflow', 'Focused the output on operational estimating rather than generic image labels', 'Kept human confirmation as part of the process'],
    standard: 'A reviewable inventory record that separates detected items, quantities and assumptions.',
    systems: 'AI-assisted object identification and moving-inventory data structures.',
    evidence: 'This is presented as a concept/app. Production deployment or commercial adoption is not claimed.',
    easier: 'An estimator can start from a structured visual inventory rather than an unlabelled folder of customer photos.'
  }
];

const navItems = [
  ['how-i-help/', 'How I Help', 'help'],
  ['case-studies/', 'Case Studies', 'cases'],
  ['experience/', 'Experience', 'experience'],
  ['about/', 'About', 'about']
];

function icon(name) {
  const icons = {
    arrow: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    check: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m5 12 4 4L19 6"/></svg>',
    menu: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></svg>'
  };
  return icons[name];
}

function header(current) {
  return `<header class="site-header" data-header>
    <div class="shell nav-shell">
      <a class="brand" href="${href()}" aria-label="John Jevi dela Cruz, home">
        <span class="brand-mark" aria-hidden="true">JJ</span>
        <span><strong>John Jevi dela Cruz</strong><small>Operations &amp; Management Consultant</small></span>
      </a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" data-nav-toggle><span class="sr-only">Open navigation</span><span class="menu-icon">${icon('menu')}</span><span class="close-icon">${icon('close')}</span></button>
      <nav class="site-nav" id="site-nav" aria-label="Primary" data-nav>
        ${navItems.map(([path, label, key]) => `<a href="${href(path)}"${current === key ? ' aria-current="page"' : ''}>${label}</a>`).join('')}
        <a class="button button-small" href="${href('contact/')}">Discuss an operations problem ${icon('arrow')}</a>
      </nav>
    </div>
  </header>`;
}

function footer() {
  return `<footer class="site-footer">
    <div class="shell footer-grid">
      <div><a class="footer-brand" href="${href()}">John Jevi dela Cruz</a><p>I turn the way people work into the way the business works.</p></div>
      <nav aria-label="Footer"><a href="${href('how-i-help/')}">How I Help</a><a href="${href('case-studies/')}">Case Studies</a><a href="${href('experience/')}">Experience</a><a href="${href('about/')}">About</a><a href="${href('credentials/')}">Credentials</a></nav>
      <div class="footer-contact"><a href="mailto:${email}">${email}</a><a href="${whatsapp}" rel="noopener">WhatsApp</a><a href="${href('privacy/')}">Privacy</a></div>
    </div>
    <div class="shell footer-base"><span>© 2026 John Jevi dela Cruz</span><span>No guessing. No unnecessary variation. No dependence on one person’s memory.</span></div>
  </footer>`;
}

function page({ title, description, path = '', current = '', body, bodyClass = '', robots = 'index,follow' }) {
  const fullTitle = title === 'Operations & Management Consultant' ? `${title} | John Jevi dela Cruz` : `${title} | John Jevi dela Cruz`;
  const url = canonical(path);
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'John Jevi dela Cruz',
    jobTitle: 'Operations & Management Consultant',
    url: origin,
    email: `mailto:${email}`,
    knowsAbout: ['Operations management', 'Process standardisation', 'Team management', 'Quality management', 'Finance operations', 'Accounting-practice operations', 'Workflow automation']
  });
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${fullTitle}</title>
  <meta name="description" content="${description}">
  <meta name="robots" content="${robots}">
  <link rel="canonical" href="${url}">
  <link rel="icon" href="${href('assets/images/favicon.ico')}">
  <link rel="apple-touch-icon" href="${href('assets/images/apple-touch-icon.png')}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:opsz,wght@8..60,400;8..60,500;8..60,600;8..60,700&amp;family=Source+Serif+4:opsz,wght@8..60,600;8..60,700&amp;display=swap" rel="stylesheet">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${fullTitle}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${canonical('assets/images/og-image.png')}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${fullTitle}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${canonical('assets/images/og-image.png')}">
  <link rel="stylesheet" href="${href('assets/css/styles.css')}">
  <script type="application/ld+json">${jsonLd}</script>
  <script defer src="${href('assets/js/site.js')}"></script>
</head>
<body class="${bodyClass}">
  <a class="skip-link" href="#main">Skip to main content</a>
  ${header(current)}
  <main id="main">${body}</main>
  ${footer()}
</body>
</html>`;
}

const arrowLink = (url, label, secondary = false) => `<a class="button${secondary ? ' button-secondary' : ''}" href="${url}">${label} ${icon('arrow')}</a>`;

function metric(value, label, note) {
  return `<div class="metric"><strong>${value}</strong><span>${label}</span>${note ? `<small>${note}</small>` : ''}</div>`;
}

function caseCard(item, featured = false) {
  return `<article class="case-card${featured ? ' case-card-featured' : ''}" data-case-card data-categories="${item.categories.join(' ')}">
    <div class="case-meta"><span>${item.organisation}</span><span>${item.label}</span></div>
    <h3><a href="${href(`case-studies/${item.slug}/`)}">${item.title}</a></h3>
    <p>${item.summary}</p>
    <div class="case-tags">${item.categories.map(cat => `<span>${({people:'People & performance', process:'Process & SOP', systems:'Systems & workflow', finance:'Finance operations', data:'Data & reporting', automation:'Automation & AI'})[cat]}</span>`).join('')}</div>
    <a class="text-link" href="${href(`case-studies/${item.slug}/`)}">Read the operating story ${icon('arrow')}</a>
  </article>`;
}

function homeBody() {
  return `
  <section class="hero section-pad">
    <div class="shell hero-grid">
      <div class="hero-copy">
        <p class="eyebrow">Operations &amp; Management Consultant</p>
        <h1>I turn the way people work into <em>the way the business works.</em></h1>
        <p class="lede">I manage people, improve workflows, build SOPs and controls, and connect the systems behind day-to-day operations so the business does not depend on constant owner intervention.</p>
        <div class="button-row">${arrowLink(href('contact/'), 'Discuss an operations problem')}${arrowLink(href('case-studies/'), 'See the work', true)}</div>
        <p class="trust-line">Management experience across moving, accounting-practice, finance and quality operations.</p>
      </div>
      <aside class="operating-card" aria-label="Manage, Systemise, Control operating model">
        <div class="operating-intro"><span>Operating model</span><p>No guessing.<br>No unnecessary variation.<br>No dependence on one person’s memory.</p></div>
        <ol class="operating-steps">
          <li><span>01</span><div><strong>Manage</strong><p>Make ownership, priorities and follow-through clear.</p></div></li>
          <li><span>02</span><div><strong>Systemise</strong><p>Turn repeatable work into standards people can follow.</p></div></li>
          <li><span>03</span><div><strong>Control</strong><p>Make status, quality and exceptions visible.</p></div></li>
        </ol>
      </aside>
    </div>
  </section>
  <section class="problem-band section-pad">
    <div class="shell split-heading"><p class="eyebrow">The operating problem</p><h2>Work should not stall because the owner is the only person who knows what happens next.</h2></div>
    <div class="shell problem-grid">
      <p>Tasks need chasing. The same decision is made differently by different people. Training happens verbally. Exceptions disappear between inboxes, trackers and tools.</p>
      <p>The problem is rarely a lack of effort. It is a lack of an operating system people can follow—one with clear ownership, written standards and visible control points.</p>
    </div>
  </section>
  <section class="section-pad">
    <div class="shell section-heading"><p class="eyebrow">How I help</p><h2>Manage the work. Systemise the process. Control the result.</h2><p>Technology supports the model; it is not the service. The work starts with the business problem and the people responsible for solving it.</p></div>
    <div class="pillar-grid">
      <article><span class="pillar-number">01</span><h3>Manage</h3><p>Coordinate people and work so the right person owns the next action.</p><ul><li>Team coordination and delegation</li><li>Completion monitoring</li><li>Individual coaching</li><li>Escalation and dispute handling</li></ul></article>
      <article><span class="pillar-number">02</span><h3>Systemise</h3><p>Turn working knowledge into a repeatable company standard.</p><ul><li>Workflow diagnosis and mapping</li><li>SOPs and decision rules</li><li>Loom tutorials and training</li><li>Onboarding and handoff systems</li></ul></article>
      <article><span class="pillar-number">03</span><h3>Control</h3><p>Build the visibility needed to catch drift, gaps and exceptions.</p><ul><li>QA and audit tracking</li><li>Status and exception reporting</li><li>Reconciliation and operational checks</li><li>Continuous improvement</li></ul></article>
    </div>
    <div class="shell section-action">${arrowLink(href('how-i-help/'), 'Explore the full operating model', true)}</div>
  </section>
  <section class="proof-band section-pad">
    <div class="shell section-heading compact"><p class="eyebrow">Dated, qualified evidence</p><h2>Management claims should be backed by operating proof.</h2></div>
    <div class="shell metrics-grid">
      ${metric('10', 'quality analysts led', 'iQor · 2023–2025')}
      ${metric('≈25', 'agents supported', 'iQor · role evidence')}
      ${metric('1,350', 'practice-tracker records', 'HarvestWise · as of 24 Aug 2026')}
      ${metric('60% → 45%', 'empathy non-compliance', 'iQor · over three weeks')}
    </div>
  </section>
  <section class="section-pad">
    <div class="shell section-heading"><p class="eyebrow">Selected operating stories</p><h2>Proof across people, process, finance and systems.</h2><p>Each story shows the context, what I owned, what changed and the evidence or caution that belongs with the claim.</p></div>
    <div class="shell case-grid featured-cases">${cases.slice(0,4).map(c => caseCard(c, true)).join('')}</div>
    <div class="shell section-action">${arrowLink(href('case-studies/'), 'View all case studies', true)}</div>
  </section>
  <section class="method-section section-pad">
    <div class="shell method-grid">
      <div class="section-heading"><p class="eyebrow">How the work changes</p><h2>From “ask the person who knows” to “follow the way the business works.”</h2></div>
      <ol class="method-list">
        <li><span>Diagnose</span><p>See how the work really moves, including handoffs and exceptions.</p></li>
        <li><span>Assign</span><p>Give each decision and next action a clear owner.</p></li>
        <li><span>Document</span><p>Capture the standard in practical SOPs, rules and examples.</p></li>
        <li><span>Make visible</span><p>Build status views, checks and exception reporting.</p></li>
        <li><span>Coach</span><p>Help people adopt the standard and correct recurring gaps.</p></li>
        <li><span>Improve</span><p>Use evidence to refine the process instead of relying on opinion.</p></li>
      </ol>
    </div>
  </section>
  <section class="section-pad">
    <div class="shell section-heading"><p class="eyebrow">Operating environments</p><h2>Different businesses. The same need for clarity and follow-through.</h2></div>
    <div class="shell environment-list"><span>Accounting-practice operations</span><span>Moving &amp; service operations</span><span>Finance operations</span><span>QA &amp; customer support</span><span>Data &amp; automation</span></div>
  </section>
  <section class="credential-band">
    <div class="shell credential-row"><p>Certified and trained across the systems that support the work.</p><div><span>QBO ProAdvisor</span><span>Xero Advisor L1 &amp; L2</span><span>Xero Payroll AU</span><span>Six Sigma White Belt</span><span>EF SET C2</span></div><a class="text-link" href="${href('credentials/')}">View credentials ${icon('arrow')}</a></div>
  </section>
  ${ctaBand('What currently requires too much owner attention?', 'Tell me what keeps needing follow-up, where decisions vary, or which function needs stronger control.', 'Discuss your operation')}`;
}

function ctaBand(title, text, label) {
  return `<section class="cta-band section-pad"><div class="shell cta-grid"><div><p class="eyebrow">Start with the real problem</p><h2>${title}</h2><p>${text}</p></div>${arrowLink(href('contact/'), label)}</div></section>`;
}

function helpBody() {
  const pillar = (number, title, intro, items, outputs) => `<article class="service-block"><div class="service-title"><span>${number}</span><div><h2>${title}</h2><p>${intro}</p></div></div><div><h3>What I take ownership of</h3><ul class="check-list">${items.map(x => `<li>${icon('check')}<span>${x}</span></li>`).join('')}</ul></div><div><h3>Typical operating outputs</h3><ul class="plain-list">${outputs.map(x => `<li>${x}</li>`).join('')}</ul></div></article>`;
  return `
    ${pageHero('How I Help', 'Bring order to the people, process and systems behind day-to-day work.', 'The engagement starts with a recognisable operating problem—not a menu of software tasks. I diagnose the workflow, clarify ownership and build a standard the team can actually run.')}
    <section class="section-pad"><div class="shell services-stack">
      ${pillar('01','Manage','Create clear ownership and a reliable cadence for the team.',['Team coordination and work allocation','Delegation and task ownership','Completion monitoring and follow-up','Individual coaching and performance support','Escalation, dispute and claims management'],['Responsibility map','Priority and completion view','Coaching cadence','Escalation path','Manager-ready status summary'])}
      ${pillar('02','Systemise','Turn repeatable work into a standard that does not live in one person’s head.',['Workflow diagnosis and process mapping','SOP and decision-rule creation','Loom tutorials and operations material','Onboarding and handoff systems','Process standardisation across people and channels'],['Current-state process map','Practical SOP library','Decision rules and examples','Training or Loom walkthroughs','Handoff checklist'])}
      ${pillar('03','Control','Make quality, status and exceptions visible before they become surprises.',['QA and audit tracking','Exception reporting and operational checks','Status visibility across tools','Data reconciliation and gap investigation','Follow-through and continuous improvement'],['Control-point checklist','Exception log','Status dashboard or tracker','QA review cadence','Improvement backlog'])}
    </div></section>
    <section class="fit-section section-pad"><div class="shell fit-grid"><div><p class="eyebrow">Good engagement fit</p><h2>The business already has work and people—but the operating system needs help.</h2><ul class="check-list"><li>${icon('check')}<span>The owner is still the default dispatcher or escalation point.</span></li><li>${icon('check')}<span>Responsibilities exist, but completion and follow-through are inconsistent.</span></li><li>${icon('check')}<span>A repeatable process still depends on verbal instruction.</span></li><li>${icon('check')}<span>A tracker or system holds data but does not create a usable operating view.</span></li><li>${icon('check')}<span>A function needs active management while the process is stabilised.</span></li></ul></div><aside class="not-fit"><h3>Not positioned as</h3><p>Tax advice, accounting sign-off, legal or company-secretarial advice, a generic VA task menu, or a software-only implementation service.</p><p class="small-note">Finance and accounting-practice work is framed as operations, administration, coordination and controls.</p></aside></div></section>
    ${ctaBand('Talk through the problem before choosing the tool.', 'A short description of what is difficult, what keeps being chased and what you want taken off your plate is enough to start.', 'Talk through the problem')}`;
}

function casesBody() {
  const filters = [['all','All work'],['people','People & performance'],['process','Process & SOP'],['systems','Systems & workflow'],['finance','Finance operations'],['data','Data & reporting'],['automation','Automation & AI']];
  return `
    ${pageHero('Case Studies', 'Operating evidence, not a gallery of tools.', 'The technology sits in the background. Each story leads with the problem, the ownership and the standard introduced—then states the evidence and its limits.')}
    <section class="section-pad cases-section"><div class="shell"><h2 class="sr-only">Case study index</h2><div class="filters" aria-label="Filter case studies" data-filters>${filters.map(([value,label],i)=>`<button type="button" data-filter="${value}" aria-pressed="${i===0?'true':'false'}">${label}</button>`).join('')}</div><p class="filter-status" aria-live="polite" data-filter-status>Showing all ${cases.length} case studies.</p><div class="case-grid" data-case-grid>${cases.map(c=>caseCard(c)).join('')}</div><noscript><p class="notice">Filtering requires JavaScript. All case studies are shown.</p></noscript></div></section>
    ${ctaBand('Want to discuss a similar operating problem?', 'Share the friction and the result you need. We can determine whether the right first step is management support, process standardisation or stronger operational control.', 'Discuss your operation')}`;
}

function caseBody(item) {
  const list = items => `<ul class="check-list">${items.map(x=>`<li>${icon('check')}<span>${x}</span></li>`).join('')}</ul>`;
  return `<article class="case-detail">
    <header class="case-hero section-pad"><div class="shell"><a class="back-link" href="${href('case-studies/')}">← All case studies</a><p class="eyebrow">${item.organisation}</p><h1>${item.title}</h1><p class="lede">${item.summary}</p><div class="case-label">${item.label}</div></div></header>
    <section class="case-story section-pad"><div class="shell case-story-grid"><aside class="case-index"><span>Operating story</span><a href="#context">Context</a><a href="#problem">Problem</a><a href="#ownership">Ownership</a><a href="#change">Change</a><a href="#evidence">Evidence</a></aside><div class="case-content">
      <section id="context"><p class="eyebrow">Context</p><h2>The operating environment</h2><p>${item.context}</p></section>
      <section id="problem"><p class="eyebrow">Problem</p><h2>The friction or visibility gap</h2><p>${item.problem}</p></section>
      <section id="ownership"><p class="eyebrow">What Jevi owned</p><h2>Decisions, people, workflow and follow-through</h2>${list(item.owned)}</section>
      <section><p class="eyebrow">Diagnosis</p><h2>What was actually getting in the way</h2><p>${item.diagnosis}</p></section>
      <section id="change"><p class="eyebrow">Changes made</p><h2>How the operating model changed</h2>${list(item.changes)}</section>
      <section><p class="eyebrow">Standard introduced</p><h2>What became repeatable</h2><p>${item.standard}</p><div class="system-note"><strong>Systems used</strong><p>${item.systems}</p></div></section>
      <section id="evidence" class="evidence-block"><p class="eyebrow">Result / evidence</p><h2>What can be stated publicly</h2><p>${item.evidence}</p>${item.caution?`<p class="caution"><strong>Guardrail:</strong> ${item.caution}</p>`:''}<h3>What became easier</h3><p>${item.easier}</p></section>
    </div></div></section>
  </article>${ctaBand('Does this operating pattern look familiar?', 'Describe where your work stalls, varies or disappears. The next step is to understand the process—not sell you a tool.', 'Discuss an operations problem')}`;
}

function experienceBody() {
  const roles = [
    ['Mar 2026—Present','Dan The Moving Man','VA Manager','Manages the VA team, delegates work, monitors completion, coaches individuals, resolves claims and disputes, and creates SOPs, training material and Loom tutorials. Customer and sales support remain part of the operating context.'],
    ['Feb 2026—Present','HarvestWise Accounting','Practice Manager','Owns post-accountant operational execution across client signing, XPM/Xero Tax statuses, billing and payment controls, collections, work allocation, ATO lodgement administration, ASIC work, registrations and exception tracking.'],
    ['Jan—Jun 2026','Prestige Insulation LLC','Head of Finance Department / Finance Operations Lead','Managed QBO invoicing and payments, transaction matching, reconciliation support, order-to-invoice validation, finance trackers, team training and quality control.'],
    ['Jan—Apr 2026','RF-Tech IT Solutions Inc.','Freelance AI Data Annotation Support','Reviewed structured vehicle-damage classification records under remote confidentiality, data-security and output-quality protocols.'],
    ['Mar—Nov 2025','Dan The Moving Man','Admin Assistant / Operations Support','Supported moving operations across lead intake, Supermove records, quoting, bookings, customer follow-up, invoice disputes, phone routing, reporting and field-issue coordination.'],
    ['Jan—Aug 2025','Magic','Part-Time Executive Assistant','Provided remote administration, document organisation, tracker maintenance, written coordination and dependable task follow-through.'],
    ['Jul 2023—Jan 2025','iQor','Lead Quality Analyst','Led 10 QAs, supported approximately 25 agents, managed audits, coaching and calibration, produced insight reporting and drove measured empathy and handling-time improvement.']
  ];
  return `
    ${pageHero('Experience', 'A progression from frontline execution to management, control and systems thinking.', 'The through-line is not a collection of unrelated tools. It is increasing ownership: first of customer work, then standards and coaching, then finance and practice workflows, and now broader operating functions.')}
    <section class="section-pad"><div class="shell timeline">${roles.map((r,i)=>`<article><div class="timeline-date">${r[0]}</div><div class="timeline-marker" aria-hidden="true"><span>${String(i+1).padStart(2,'0')}</span></div><div class="timeline-body"><p class="eyebrow">${r[1]}</p><h2>${r[2]}</h2><p>${r[3]}</p>${i<3?`<a class="text-link" href="${href(`case-studies/${[cases[0].slug,cases[1].slug,cases[4].slug][i]}/`)}">See related operating evidence ${icon('arrow')}</a>`:''}</div></article>`).join('')}</div></section>
    <section class="progression-band section-pad"><div class="shell"><p class="eyebrow">Earlier progression</p><h2>Customer support built the operating foundation.</h2><div class="progression-grid"><div><strong>Frontline support</strong><p>Multiple BPO environments developed practical issue resolution, documentation and customer judgment.</p></div><div><strong>Subject-matter support</strong><p>Promoted quickly at ePerformax to provide demos, side-barging, procedure guidance and supervisor calls.</p></div><div><strong>Quality leadership</strong><p>QA work added coaching, calibration, reporting, root-cause analysis and standards management.</p></div><div><strong>Management</strong><p>Current work combines people, process, finance, compliance administration and systems into one operating view.</p></div></div></div></section>
    ${ctaBand('Need a manager who can understand the work from the frontline upward?', 'That cross-functional perspective is strongest where people, process and systems need to operate as one function.', 'Discuss your operation')}`;
}

function aboutBody() {
  return `
    ${pageHero('About', 'Strongest where people, process and systems intersect.', 'I have worked from the frontline, inside quality programmes, across moving and service operations, in finance operations and in accounting-practice management. That breadth matters because operational problems rarely stay inside one department.')}
    <section class="section-pad"><div class="shell about-grid"><div class="about-story"><p class="eyebrow">The cross-functional advantage</p><h2>I can see the same problem from several sides of the business.</h2><p>Frontline experience shows where instructions fail in real use. Management experience shows how ownership, coaching and follow-through shape performance. Quality work shows how to turn evidence into standards. Finance and practice work show why status, reconciliation and controls matter. Systems work connects those views without making the software the main story.</p><blockquote>“I turn ‘this is how one person does it’ into ‘this is how the company does it.’”</blockquote></div><div class="lens-list"><article><span>People</span><p>Team coordination, delegation, coaching and escalation ownership.</p></article><article><span>Process</span><p>Workflow diagnosis, SOPs, decision rules, handoffs and training.</p></article><article><span>Systems</span><p>Trackers, status models, CRM and operational visibility.</p></article><article><span>Control</span><p>QA, reconciliation, exception reporting and follow-through.</p></article></div></div></section>
    <section class="principles section-pad"><div class="shell"><p class="eyebrow">Operating principles</p><div class="principle-grid"><article><span>01</span><h2>No guessing.</h2><p>The owner, next action and source of truth should be clear.</p></article><article><span>02</span><h2>No unnecessary variation.</h2><p>Similar work should follow the same decision rules unless the exception is deliberate.</p></article><article><span>03</span><h2>No memory dependency.</h2><p>Critical work should survive holidays, handoffs and team changes.</p></article></div></div></section>
    ${ctaBand('Bring me the messy operating problem.', 'We can start with the workflow that keeps needing attention and work outward from the real constraint.', 'Discuss your operation')}`;
}

function credentialsBody() {
  const creds = [
    ['QuickBooks Online ProAdvisor','Accounting / finance operations','assets/images/quickbooks-online-certification.png'],
    ['Xero Advisor Certification · Level 1','Accounting / finance operations','assets/images/xero-certified-associate-l1.png'],
    ['Xero Advisor Certification · Level 2','Accounting / finance operations','assets/images/xero-certified-professional-l2.png'],
    ['Xero Payroll Specialist · Australia','Accounting / payroll systems','assets/images/xero-payroll-specialist.png'],
    ['Six Sigma White Belt','Process improvement','assets/images/six-sigma-white-belt-full.webp'],
    ['EF SET English · 78/100 · CEFR C2','Communication','assets/images/ef-set-certificate-full.webp']
  ];
  return `
    ${pageHero('Credentials', 'Supporting evidence—not the centre of the positioning.', 'Credentials reinforce the work across finance systems, process improvement and communication. They do not replace role evidence, operating judgment or the guardrails that belong with regulated work.')}
    <section class="section-pad"><div class="shell credentials-list">${creds.map(([name,group,img])=>`<article><div><p class="eyebrow">${group}</p><h2>${name}</h2></div><a class="text-link" href="${href(img)}" target="_blank" rel="noopener">View credential ${icon('arrow')}</a></article>`).join('')}</div></section>
    <section class="tool-section section-pad"><div class="shell"><p class="eyebrow">Supporting tools</p><h2>Tools are grouped by the operating job they support.</h2><div class="tool-grid"><article><h3>Accounting &amp; finance</h3><p>Xero, Xero Tax, XPM and QuickBooks Online.</p></article><article><h3>Workflow &amp; coordination</h3><p>Google Workspace, Microsoft 365, Trello, Adobe Sign, Constitute and Supermove.</p></article><article><h3>Data &amp; reporting</h3><p>Excel, Google Sheets, Power BI and dashboard-ready operating trackers.</p></article><article><h3>Automation &amp; AI</h3><p>Flowise, Qdrant, Jina Embeddings, GroqChat, Zapier, Make, n8n, Retell AI, Twilio and GitHub.</p></article></div><p class="small-note">Software names appear only where they explain the system or provide useful evidence.</p></div></section>
    ${ctaBand('Credentials support the work. The operating problem defines it.', 'If you need stronger management, repeatable workflows or clearer control, start with the process that is consuming attention.', 'Start a conversation')}`;
}

function contactBody() {
  return `
    <section class="contact-hero section-pad"><div class="shell contact-grid"><div><p class="eyebrow">Discuss an operations problem</p><h1>What is currently difficult—and what would you like taken off your plate?</h1><p class="lede">A short description is enough. I am looking for the operating friction, where ownership breaks down, and what a useful outcome would look like.</p><div class="contact-direct"><span>Prefer direct contact?</span><a href="mailto:${email}">${email}</a><a href="${whatsapp}" rel="noopener">WhatsApp</a></div></div>
      <form class="contact-form" action="https://formspree.io/f/mblgbzoj" method="post" data-contact-form>
        <div class="form-intro"><h2>Start the conversation</h2><p>Fields marked <span aria-hidden="true">*</span><span class="sr-only">with an asterisk</span> are required.</p></div>
        <div class="field"><label for="name">Name <span aria-hidden="true">*</span></label><input id="name" name="name" autocomplete="name" required></div>
        <div class="field"><label for="email">Email <span aria-hidden="true">*</span></label><input id="email" name="email" type="email" autocomplete="email" required></div>
        <div class="field"><label for="company">Company <span aria-hidden="true">*</span></label><input id="company" name="company" autocomplete="organization" required></div>
        <div class="field"><label for="difficult">What is currently difficult? <span aria-hidden="true">*</span></label><textarea id="difficult" name="current_difficulty" rows="5" required></textarea></div>
        <div class="field"><label for="off-plate">What would you like taken off your plate? <span aria-hidden="true">*</span></label><textarea id="off-plate" name="desired_outcome" rows="5" required></textarea></div>
        <div class="field honeypot" aria-hidden="true"><label for="website">Leave this field empty</label><input id="website" name="_gotcha" tabindex="-1" autocomplete="off"></div>
        <input type="hidden" name="form_source" value="portfolio_operations_enquiry">
        <p class="form-privacy">By submitting, you agree that your details may be used to respond to this enquiry. Read the <a href="${href('privacy/')}">privacy note</a>.</p>
        <button class="button form-submit" type="submit">Send enquiry ${icon('arrow')}</button>
        <div class="form-status" role="status" aria-live="polite" tabindex="-1" data-form-status></div>
        <noscript><p class="notice">The form will submit to the delivery service in a new page. Your entered details will be included.</p></noscript>
      </form>
    </div></section>`;
}

function privacyBody() {
  return `
    ${pageHero('Privacy', 'A concise note about contact-form information.', 'This portfolio collects only the information you choose to submit when starting a conversation.')}
    <section class="section-pad"><div class="shell legal-copy"><section><h2>Information collected</h2><p>The contact form asks for your name, email, company, a description of what is currently difficult, and what you would like taken off your plate. Do not submit passwords, payment details, tax records or other sensitive information.</p></section><section><h2>How it is used</h2><p>The information is used to review and respond to your enquiry, understand whether the operating problem is a reasonable fit, and continue the conversation you requested.</p></section><section><h2>Form delivery</h2><p>The form is delivered through Formspree to the mailbox configured for this website. Formspree may process the submission to provide that delivery service.</p></section><section><h2>Analytics and tracking</h2><p>This version of the site does not intentionally send the contents of your enquiry to an analytics service. Any future analytics should remain privacy-conscious and must not collect sensitive form content.</p></section><section><h2>Questions or requests</h2><p>To ask about, correct or request deletion of information you submitted, email <a href="mailto:${email}">${email}</a>.</p></section><p class="small-note">Last updated: 27 August 2026. This page explains the website’s operating practice and is not legal advice.</p></div></section>`;
}

function pageHero(eyebrow, title, text) {
  return `<section class="page-hero section-pad"><div class="shell"><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p class="lede">${text}</p></div></section>`;
}

function notFoundBody() {
  return `<section class="not-found section-pad"><div class="shell"><p class="eyebrow">404 · Page not found</p><h1>The page moved, but the operating story is still here.</h1><p class="lede">Use the updated navigation to continue.</p><div class="button-row">${arrowLink(href(), 'Return home')}${arrowLink(href('case-studies/'), 'View case studies', true)}</div></div></section>`;
}

function redirectPage(target, title = 'Page moved') {
  const destination = href(target);
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} | John Jevi dela Cruz</title><meta name="robots" content="noindex,follow"><link rel="canonical" href="${canonical(target)}"><meta http-equiv="refresh" content="0;url=${destination}"><script>location.replace(${JSON.stringify(destination)});</script></head><body><main><h1>${title}</h1><p><a href="${destination}">Continue to the updated page</a>.</p></main></body></html>`;
}

async function put(path, content) {
  const target = resolve(out, path);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, content);
}

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(resolve(root, 'static'), out, { recursive: true });

await put('index.html', page({ title: 'Operations & Management Consultant', description: 'John Jevi dela Cruz manages people, improves workflows, builds SOPs and controls, and connects systems so operations run consistently without constant owner intervention.', body: homeBody(), current: 'home', path: '' }));
await put('how-i-help/index.html', page({ title: 'Operations Management & Process Consulting', description: 'Manage teams, systemise workflows and build controls across service, finance and accounting-practice operations.', body: helpBody(), current: 'help', path: 'how-i-help/' }));
await put('case-studies/index.html', page({ title: 'Operations, Process & Systems Case Studies', description: 'Evidence from people management, accounting-practice workflows, finance operations, QA, reporting and automation.', body: casesBody(), current: 'cases', path: 'case-studies/' }));
for (const item of cases) await put(`case-studies/${item.slug}/index.html`, page({ title: `${item.organisation} Case Study`, description: item.summary, body: caseBody(item), current: 'cases', path: `case-studies/${item.slug}/` }));
await put('experience/index.html', page({ title: 'Management & Operations Experience', description: 'Career progression across VA management, accounting-practice operations, finance operations and quality leadership.', body: experienceBody(), current: 'experience', path: 'experience/' }));
await put('about/index.html', page({ title: 'About John Jevi dela Cruz', description: 'Cross-functional operations consultant working where people, process and systems intersect.', body: aboutBody(), current: 'about', path: 'about/' }));
await put('credentials/index.html', page({ title: 'Credentials', description: 'QuickBooks Online, Xero, process-improvement and communication credentials supporting operations-management work.', body: credentialsBody(), path: 'credentials/' }));
await put('contact/index.html', page({ title: 'Discuss an Operations Problem', description: 'Start a conversation about workflow, ownership, SOP, quality or operational-control problems.', body: contactBody(), path: 'contact/' }));
await put('privacy/index.html', page({ title: 'Privacy', description: 'How contact-form information is collected, delivered and used on the portfolio website.', body: privacyBody(), path: 'privacy/' }));
await put('404.html', page({ title: 'Page Not Found', description: 'The requested portfolio page could not be found.', body: notFoundBody(), path: '404.html', bodyClass: 'error-page', robots: 'noindex,follow' }));

const redirects = {
  'services.html': 'how-i-help/',
  'certifications.html': 'credentials/',
  'fractional-ops-partner.html': 'how-i-help/',
  'moving-crm-operations.html': 'case-studies/dan-moving-team/',
  'xero-quickbooks-support.html': 'how-i-help/',
  'case-ai-flowise-rag-chatbot.html': 'case-studies/flowise-rag-chatbot/',
  'case-ai-movemate-estimator-prototype.html': 'case-studies/movemate-estimator/',
  'case-ai-phone-agent-automation-playbook.html': 'case-studies/',
  'case-bookkeeping-invoice-disputes-support.html': 'case-studies/dan-moving-team/',
  'case-bookkeeping-qbo-setup-philly-insulation-inventory.html': 'case-studies/prestige-finance-operations/',
  'case-bookkeeping-qbo-setup-prestige-insulation.html': 'case-studies/prestige-finance-operations/',
  'case-data-api-ingestion-normalization.html': 'case-studies/fsecom-profit-intelligence/',
  'case-data-profit-intelligence-stock-tracker.html': 'case-studies/fsecom-profit-intelligence/',
  'case-data-weekly-insights-decks.html': 'case-studies/iqor-quality-improvement/',
  'case-moving-afterhours-lead-recovery.html': 'case-studies/dan-moving-team/',
  'case-moving-executive-reporting-coordination.html': 'case-studies/dan-moving-team/',
  'case-moving-intake-crm-hygiene.html': 'case-studies/dan-moving-team/',
  'case-qa-empathy-lift-aht-down.html': 'case-studies/iqor-quality-improvement/',
  'case-qa-guidelines-rollout-calibration.html': 'case-studies/iqor-quality-improvement/',
  'case-qa-operating-system-10qas.html': 'case-studies/iqor-quality-improvement/'
};
for (const [oldPath, target] of Object.entries(redirects)) await put(oldPath, redirectPage(target));

const sitemapPages = ['', 'how-i-help/', 'case-studies/', ...cases.map(x => `case-studies/${x.slug}/`), 'experience/', 'about/', 'credentials/', 'contact/', 'privacy/'];
await put('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapPages.map(path => `  <url><loc>${canonical(path)}</loc><lastmod>2026-08-27</lastmod></url>`).join('\n')}\n</urlset>\n`);
await put('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${canonical('sitemap.xml')}\n`);

console.log(`Built ${sitemapPages.length} indexable pages and ${Object.keys(redirects).length} migration redirects in ${out}`);
