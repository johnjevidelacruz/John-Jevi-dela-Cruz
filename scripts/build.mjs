import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = resolve(root, 'dist');
const base = '/John-Jevi-dela-Cruz/';
const origin = `https://johnjevidelacruz.github.io${base}`;
const email = 'johnjevi.delacruz@gmail.com';
const whatsapp = 'https://wa.me/639610704926';
const href = (path = '') => `${base}${path}`.replace(/\/{2,}/g, '/');
const canonical = (path = '') => new URL(path, origin).href;

const cases = [
  {
    slug: 'moving-company-operations',
    industry: 'Moving company',
    title: 'Leading a remote support team without keeping the owner in every decision',
    summary: 'Ensuring role adherence, coaching individuals, resolving customer claims, and converting recurring explanations into SOPs and Loom guides the team can execute consistently.',
    situation: 'Moving operations cross calls, email, SMS, CRM records, estimates, inventories, bookings, customer disputes, and field issues. Work is fast-paced and ownership can easily become fragmented when different team members handle the same scenario in different ways.',
    intervention: 'Enforced established roles and duties so recurring work and open issues have a named owner without requiring daily manual allocation. Followed work through to completion, converted repeated verbal explanations into documented procedures and video guides, and connected sales, CRM and field context so the team could act with the information required.',
    proof: 'During the current engagement, I personally booked 148 jobs with a combined booked job value of $196,000 and personally resolved 38 escalated customer claims tickets.',
    value: 'Daily work has clearer ownership, recurring decisions have reusable guidance, and customer escalations have a structured path to resolution.'
  },
  {
    slug: 'accounting-firm-workflow',
    industry: 'Accounting firm',
    title: 'Controlling a 1,350-record pipeline across signing, payment and lodgement',
    summary: 'Connecting signing, billing, payment checks, workflow status, lodgement administration, and ASIC tasks in one central, active control view with visible exceptions.',
    situation: 'Accountants complete technical tax and accounting work. A file must then pass through approval, client signing, payment verification, submission, and filing across multiple systems. Without a single view across these conditions, unsigned, unpaid, or stalled work easily slips through the cracks.',
    intervention: 'Established a single control view for signing, payment readiness, lodgement status, and exceptions. Connected prerequisite conditions that must be satisfied before moving a file to the next stage, tied accountant billing sheets directly to completed work, and enforced explicit workflow states to prioritise follow-up by the specific blocking condition.',
    proof: 'As of 24 August 2026, the control view covered 1,350 records, including 1,072 lodged files. It recorded 335 files sent for signing and 420 Adobe Sign “Signed and Filed” confirmations.',
    value: 'The firm can locate unsigned, unpaid or unfiled work from one view and direct follow-up to the condition preventing completion.'
  },
  {
    slug: 'bpo-quality-improvement',
    industry: 'BPO',
    title: 'Designing QA coverage for 444 active agents and turning findings into action',
    summary: 'Balancing audits and coaching across quartiles, shifts, and lines of business, then converting collective QA data into executive business reviews and Operations action plans.',
    situation: 'Quality assurance needed to cover multiple lines of business, varied agent shifts, and differing performance risk levels. Audit scores also needed to become actionable management intelligence rather than isolated numbers inside individual files.',
    intervention: 'Built a structured allocation model based on agent performance quartiles and shift schedules. Consolidated audit findings by line of business to highlight systemic trends, identified specific agent behaviours driving non-compliance or high handle times, and created weekly executive decks with root-cause analysis and proposed action plans.',
    proof: 'The November 2024 allocation covered 444 active agents across 16 QAs and three lines of business. During the supported improvement period, empathy non-compliance moved from 60% to 45% in three weeks and average handling time moved from 685 to 618 seconds. External evaluators placed my coaching quality in Q1, the highest QA-of-QA tier.',
    value: 'The campaign gained a quartile-weighted way to distribute QA capacity, clearer visibility into performance drivers, and a direct path from QA findings to coaching, training, and Operations action.'
  },
  {
    slug: 'ecommerce-profit-intelligence',
    industry: 'DTC e-commerce business',
    title: 'Delivering a working view of profit, margin, stock, and reorder risk',
    summary: 'Correcting the API transaction source, reprocessing history, and building an operating model for performance, product mapping, COGS, inventory depletion, stockout, and reorder decisions.',
    situation: 'Order, product, cost, and inventory data were fragmented, making daily profitability, stock-depletion, and replenishment decisions harder to support from one view. An initial data-source mismatch also produced incomplete or inaccurate transaction reporting.',
    intervention: 'Replaced the prior source with the Transaction Details API and reprocessed historical transactions. Built formula-driven calculations for current stock, stock value, 7-day sales velocity, days to stockout, projected stockout date, and reorder dates with urgency indicators. Mapped product variants and SKUs to overarching product families.',
    proof: 'The delivered tracker was put into active business use. The supplied snapshot contains 191 order records from 27 to 30 December 2025 and 51 product-mapping records across three product families.',
    value: 'Commercial and inventory questions can be investigated from one model built around a defined transaction source, mapped SKUs, and explicit replenishment indicators.'
  },
  {
    slug: 'construction-materials-finance',
    industry: 'Insulation and construction materials e-commerce business',
    title: 'Building the finance operation across two businesses',
    summary: 'Setting up both QBO environments, leading a three-person finance team, and establishing controls for customer invoicing, payment posting, transaction matching, and order-to-spend reconciliation.',
    situation: 'Two related e-commerce entities needed their QuickBooks Online environments established and their daily transaction work controlled. Invoices, payments, credit-card spend, supplier orders, credits, and adjustments needed traceability.',
    intervention: 'Built both QBO instances from scratch and established standardised procedures for invoicing, payment posting, and card matching. Created a matching ledger linking credit card charges to order numbers, purchase dates, statuses, delivery addresses, gross amounts, credits, and net totals. Applied exact-amount and charge-plus-credit matching to surface unmatched charges, credits, and order differences.',
    proof: 'I set up both QBO businesses and led a three-person finance team. The supplied ledger snapshot contains 100 card transactions and 85 orders, recording 59 matched transactions and 54 matched orders. Five supplied customer invoices demonstrate the invoicing workflow.',
    value: 'The operation had a clearer record of invoicing, payment posting, and matched or unmatched transactions, making exceptions easier to identify and investigate.'
  }
];

const additionalBuilds = [
  {
    slug: 'flowise-rag-chatbot', industry: 'AI automation build',
    title: 'Separating chatbot ingestion from the public runtime',
    summary: 'Built a retrieval-augmented generation chatbot in Flowise using GroqChat and an Excel dataset. Resolved embed errors by separating ingestion nodes from the public runtime flow and deployed it through GitHub Pages.',
    situation: 'A public Flowise embed returned an error because data-ingestion and credential-dependent nodes were still included in the runtime flow.',
    intervention: 'Separated the controlled ingestion path from the public question-and-answer runtime, then configured the retrieval flow around the prepared knowledge base.',
    proof: 'The revised embed ran through GitHub Pages without invoking ingestion steps or exposing credentials.',
    value: 'The public interface could query the prepared data through a cleaner, safer runtime path.'
  },
  {
    slug: 'movemate-estimator', industry: 'Moving operations concept',
    title: 'Turning household items into operational estimate data',
    summary: 'Designed a concept and application architecture that translates visual or listed household items into cubic volume, weight, and mover requirements for more precise inventory preparation.',
    situation: 'Moving estimates often begin with incomplete written inventories or unstructured customer photos, leaving estimators to reconstruct the useful data manually.',
    intervention: 'Defined a reviewable workflow that maps detected or listed household items to moving inventory data while preserving uncertainty for human confirmation.',
    proof: 'The concept includes moving-specific outputs for cubic volume, weight, and mover requirements rather than generic object labels.',
    value: 'Estimators can begin from structured inventory information and focus their judgment on confirmation and exceptions.'
  }
];
const allCases = [...cases, ...additionalBuilds];

const navItems = [
  ['how-i-help/', 'How I Help', 'help'], ['case-studies/', 'Case Studies', 'cases'],
  ['experience/', 'Experience', 'experience'], ['about/', 'About', 'about'],
  ['credentials/', 'Credentials', 'credentials']
];

function icon(name) {
  return {
    arrow: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    menu: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></svg>',
    previous: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg>',
    next: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg>'
  }[name];
}

function header(current) {
  return `<header class="site-header" data-header><div class="shell nav-shell"><a class="brand" href="${href()}" aria-label="John Jevi dela Cruz, home"><span class="brand-mark" aria-hidden="true">JJ</span><span><strong>John Jevi dela Cruz</strong><small>Operations &amp; Management Consultant</small></span></a><button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" data-nav-toggle><span class="sr-only">Open navigation</span><span class="menu-icon">${icon('menu')}</span><span class="close-icon">${icon('close')}</span></button><nav class="site-nav" id="site-nav" aria-label="Primary" data-nav>${navItems.map(([path, label, key]) => `<a href="${href(path)}"${current === key ? ' aria-current="page"' : ''}>${label}</a>`).join('')}<a class="button button-small" href="${href('contact/')}">Start a conversation ${icon('arrow')}</a></nav></div></header>`;
}

function footer() {
  return `<footer class="site-footer"><div class="shell footer-grid"><div><a class="footer-brand" href="${href()}">John Jevi dela Cruz</a></div><nav aria-label="Footer">${navItems.map(([path, label]) => `<a href="${href(path)}">${label}</a>`).join('')}</nav><div class="footer-contact"><a href="mailto:${email}">${email}</a><a href="${whatsapp}" rel="noopener">WhatsApp</a><a href="${href('privacy/')}">Privacy</a></div></div><div class="shell footer-base"><span>© 2026 John Jevi dela Cruz</span></div></footer>`;
}

function page({ title, description, path = '', current = '', body, robots = 'index,follow' }) {
  const fullTitle = `${title} | John Jevi dela Cruz`;
  const url = canonical(path);
  const schema = JSON.stringify({ '@context': 'https://schema.org', '@type': 'Person', name: 'John Jevi dela Cruz', jobTitle: 'Operations & Management Consultant', url: origin, email: `mailto:${email}` });
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${fullTitle}</title><meta name="description" content="${description}"><meta name="robots" content="${robots}"><link rel="canonical" href="${url}"><link rel="icon" href="${href('assets/images/favicon.ico')}"><link rel="apple-touch-icon" href="${href('assets/images/apple-touch-icon.png')}"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:opsz,wght@8..60,400;8..60,500;8..60,600;8..60,700&amp;family=Source+Serif+4:opsz,wght@8..60,600;8..60,700&amp;display=swap" rel="stylesheet"><meta property="og:type" content="website"><meta property="og:title" content="${fullTitle}"><meta property="og:description" content="${description}"><meta property="og:url" content="${url}"><meta property="og:image" content="${canonical('assets/images/og-image.png')}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${fullTitle}"><meta name="twitter:description" content="${description}"><meta name="twitter:image" content="${canonical('assets/images/og-image.png')}"><link rel="stylesheet" href="${href('assets/css/styles.css')}"><script type="application/ld+json">${schema}</script><script defer src="${href('assets/js/site.js')}"></script></head><body><a class="skip-link" href="#main">Skip to main content</a>${header(current)}<main id="main">${body}</main>${footer()}</body></html>`;
}

const button = (url, label, secondary = false) => `<a class="button${secondary ? ' button-secondary' : ''}" href="${url}">${label} ${icon('arrow')}</a>`;
const pageHero = (label, title, intro, extra = '') => `<section class="page-hero section-pad ${extra}"><div class="shell"><p class="eyebrow">${label}</p><h1>${title}</h1>${intro ? `<p class="lede">${intro}</p>` : ''}</div></section>`;
const cta = title => `<section class="cta-band section-pad"><div class="shell cta-grid"><div><p class="eyebrow">Start with the recurring problem</p><h2>${title}</h2></div>${button(href('contact/'), 'Start a conversation')}</div></section>`;

function carousel(items, label, render) {
  return `<div class="carousel" data-carousel aria-roledescription="carousel" aria-label="${label}"><div class="carousel-viewport"><div class="carousel-track">${items.map((item, i) => render(item, i)).join('')}</div><button class="carousel-control carousel-control-prev" type="button" data-carousel-prev>${icon('previous')}<span class="sr-only">Previous</span></button><button class="carousel-control carousel-control-next" type="button" data-carousel-next>${icon('next')}<span class="sr-only">Next</span></button></div><ol class="carousel-indicators" aria-label="Choose a slide">${items.map((_, i) => `<li><button${i === 0 ? ' class="is-active" aria-current="true"' : ''} type="button" data-carousel-indicator data-slide-to="${i}" aria-label="Show slide ${i + 1}"></button></li>`).join('')}</ol><p class="sr-only" aria-live="polite" data-carousel-status>Slide 1 of ${items.length}</p></div>`;
}

function homeBody() {
  const services = [
    ['Manage', 'Lead daily operations', 'Set priorities, coordinate ownership, coach people, and take responsibility for escalations, disputes, and claims.'],
    ['Systemise', 'Make work repeatable', 'Review workflows, write practical SOPs, and turn recurring explanations into training the team can use.'],
    ['Control', 'Keep exceptions visible', 'Track status, quality, billing, and open issues so the next decision is clear and nothing disappears.']
  ];
  const hero = `<section class="hero section-pad"><div class="shell hero-focus"><p class="eyebrow">Operations &amp; Management Consultant</p><h1>I turn the way people work into the way the business works.</h1><p class="lede">I manage people, improve workflows, and build the SOPs, controls, and reporting that keep day-to-day operations consistent.</p><div class="button-row">${button(href('contact/'), 'Discuss an operations problem')}${button(href('case-studies/'), 'See the work', true)}</div></div></section>`;
  return `${hero}<section class="section-pad"><div class="shell"><div class="section-heading"><p class="eyebrow">How I help</p><h2>Manage the work. Build the system.</h2></div>${carousel(services, 'How I help', ([label, title, text], i) => `<article class="carousel-item carousel-card service-slide${i === 0 ? ' is-active' : ''}" data-carousel-item${i ? ' aria-hidden="true" inert' : ''}><p class="eyebrow">${label}</p><h3>${title}</h3><p>${text}</p></article>`)}<div class="section-action"><a class="text-link" href="${href('how-i-help/')}">How I can help ${icon('arrow')}</a></div></div></section><section class="section-pad selected-work"><div class="shell"><div class="section-heading"><p class="eyebrow">Selected work</p><h2>Operational problems I have been trusted to own.</h2></div>${carousel(cases, 'Selected work', (item, i) => `<article class="carousel-item carousel-card case-card${i === 0 ? ' is-active' : ''}" data-carousel-item${i ? ' aria-hidden="true" inert' : ''}><div class="case-meta"><span>${item.industry}</span></div><h3><a href="${href(`case-studies/${item.slug}/`)}">${item.title}</a></h3><p>${item.summary}</p><a class="text-link" href="${href(`case-studies/${item.slug}/`)}">Read case study ${icon('arrow')}</a></article>`)}<div class="section-action"><a class="text-link" href="${href('case-studies/')}">View all case studies ${icon('arrow')}</a></div></div></section>${cta('What is taking too much attention to keep moving?')}`;
}

function helpBody() {
  const services = [
    ['Manage daily operations', 'Keep priorities clear and make sure work reaches a finished result.', ['Work allocation, deadlines, and task monitoring', 'Coaching, follow-up, and performance support', 'Escalations, disputes, claims, and customer issues'], 'The team knows what matters, assigned work moves, and escalations have a clear path.'],
    ['Make work repeatable', 'Turn repeated explanations into a process the team can use.', ['Workflow review and simplification', 'Practical SOPs, decision rules, and Loom guides', 'Training, onboarding, and handoffs'], 'The team relies less on verbal instruction and new people have a faster path to consistent work.'],
    ['Show what needs attention', 'Make open work and exceptions visible before they become surprises.', ['Status and exception tracking', 'Quality, billing, and finance checks', 'Recurring problem review and follow-through'], 'Blocked work surfaces earlier, exceptions have a record, and recurring problems can be corrected.']
  ];
  return `${pageHero('How I help', 'I manage the work today and improve how it runs tomorrow.', 'My work sits across people, process, and systems. The goal is clear ownership, consistent execution, and fewer problems returning to the owner.')}<section class="section-pad"><div class="shell services-stack">${services.map(([title, intro, items, result]) => `<article class="service-block service-row"><div class="service-title"><h2>${title}</h2><p>${intro}</p></div><div class="service-detail"><h3>What I take ownership of</h3><ul class="plain-list">${items.map(item => `<li>${item}</li>`).join('')}</ul><p class="service-result"><strong>Result:</strong> ${result}</p></div></article>`).join('')}</div></section><section class="fit-section section-pad"><div class="shell fit-focus"><p class="eyebrow">A good fit</p><h2>Your team is busy, but you still carry too much of the coordination.</h2><ul class="check-list"><li><span>You remain the default person for priorities and escalations.</span></li><li><span>Assigned work still needs chasing.</span></li><li><span>Recurring work depends on verbal instructions.</span></li></ul></div></section>${cta('Bring the work that keeps getting chased, repeated, or escalated.')}`;
}

function card(item, wide = false) {
  return `<article class="case-card${wide ? ' case-card-wide' : ''}"><div class="case-meta"><span>${item.industry}</span></div><h3><a href="${href(`case-studies/${item.slug}/`)}">${item.title}</a></h3><p>${item.summary}</p><a class="text-link" href="${href(`case-studies/${item.slug}/`)}">Read case study ${icon('arrow')}</a></article>`;
}

function casesBody() {
  return `${pageHero('Selected work', 'Operational problems I have been trusted to own.', 'These are not software demonstrations. Each case study shows an operational problem, the management responsibility taken, the system established, and the visible evidence that remained afterward.')}<section class="section-pad"><div class="shell"><div class="section-heading"><h2>Flagship case studies</h2></div><div class="case-index-grid">${cases.map((item, i) => card(item, i === 0)).join('')}</div></div></section><section class="section-pad selected-work"><div class="shell"><div class="section-heading"><h2>Additional builds</h2></div><div class="case-index-grid">${additionalBuilds.map(item => card(item)).join('')}</div></div></section>${cta('Have a similar operating problem?')}`;
}

function caseBody(item) {
  return `<article class="case-detail"><header class="case-hero section-pad"><div class="shell"><a class="back-link" href="${href('case-studies/')}">← All case studies</a><p class="eyebrow">${item.industry}</p><h1>${item.title}</h1><p class="lede">${item.summary}</p></div></header><section class="case-story section-pad"><div class="shell case-content case-content-wide"><section><h2>Situation</h2><p>${item.situation}</p></section><section><h2>Intervention</h2><p>${item.intervention}</p></section><section class="evidence-block"><h2>Proof</h2><p>${item.proof}</p></section><section><h2>Operating value</h2><p>${item.value}</p></section></div></section></article>${cta('Does this operating pattern look familiar?')}`;
}

const roles = [
  {
    industry: 'Moving company', title: 'VA Manager', dates: 'March 2026 to present',
    description: 'I lead the virtual assistant team and coordinate day-to-day moving operations. The team operates on defined roles and duties. Adherence is monitored, and only urgent or ad hoc tasks are delegated, rather than assigning daily workloads manually. Because I previously worked inside the same operation, I connect team management with operational details across leads, estimates, inventories, CRM records, bookings, and field issues.',
    ownership: 'Team coordination, role adherence, ad hoc delegation, completion monitoring, individual coaching, dispute and claims resolution, SOPs, Loom training, and sales/customer communication.',
    evidence: ['During the current engagement, I personally booked 148 jobs with a combined booked job value of $196,000 and personally resolved 38 escalated customer claims tickets.'], caseSlug: 'moving-company-operations'
  },
  {
    industry: 'Accounting firm', title: 'Practice Manager', dates: 'February 2026 to present',
    description: 'I own the post-preparation compliance workflow after accountants complete technical work, including client execution, payment readiness, lodgement administration, and ASIC or company administration. I coordinate client signing via Adobe Sign, billing and payment checks, XPM and Xero Tax status controls, ATO lodgement administration, accountant work-allocation tracking, collections, ASIC administration, and workflow exceptions. I also support WordPress operations, including research, SEO fields, publishing, and image metadata.',
    ownership: 'Post-preparation workflow control, Adobe Sign preparation and tracking, payment readiness, ATO lodgement administration, accountant billing sheets, company registrations, ASIC form administration, and central audit management.',
    evidence: ['Maintained a central Lodgement Audit and Tracking view covering 1,350 workflow records. The view recorded 1,072 lodged files, 88 completed files, and 88 draft or in-progress files. It also recorded 85 files out to sign and 124 unpaid files, with 72 appearing in both categories.', 'Tracked 335 files sent for signing and logged 420 Adobe Sign “Signed and Filed” confirmations.', 'Coordinated approximately 1,873 outgoing messages across lodgement, signing, billing, ASIC, collections, and client workflows.', 'Coordinated at least 17 successful company registrations and 5 signed voluntary company deregistrations.'], caseSlug: 'accounting-firm-workflow'
  },
  {
    industry: 'Insulation and construction materials e-commerce business', title: 'Head of Finance Department / Finance Operations Lead', dates: 'January 2026 to June 2026',
    description: 'I led a three-person finance function across two related businesses. I set up both companies in QuickBooks Online from scratch, configured delivery-address sales tax rules, created and sent customer invoices, and managed payment posting, expense tracking, and reconciliation support. I also built a matching ledger connecting card activity to order records so missing or conflicting transactions could be identified.',
    ownership: 'Multi-company QBO setup, finance team leadership, customer invoicing, order-to-spend matching, multi-card reconciliation controls, and quality review.',
    evidence: ['The matching ledger snapshot from 27 January to 7 February 2026 tracked 100 card transactions and 85 orders, recording 59 matched transactions and 54 matched orders using exact-amount and charge-plus-credit matching.', 'Prepared customer invoices across insulation and drywall products covering quantities, rates, shipping, sales tax, terms, and payment instructions.'], caseSlug: 'construction-materials-finance'
  },
  {
    industry: 'AI data annotation provider', title: 'Freelance AI Data Annotation Support', dates: 'January 2026 to April 2026',
    description: 'I reviewed structured vehicle-damage records containing license plates, vehicle parts, damage classifications, timestamps, and reviewer notes. The work required consistent interpretation, detailed record review, and compliance with remote security and output-quality protocols.',
    ownership: 'Structured record review, damage classification consistency, and quality control.'
  },
  {
    industry: 'Moving company', title: 'Admin Assistant / Operations Support', dates: 'March 2025 to November 2025',
    description: 'I supported frontline moving operations across CRM triage, quote creation, bookings, payment links, customer follow-up, invoice dispute handling, phone routing, sales reporting, and field issue coordination. I also adjusted chat and phone AI using operational feedback and configured service types and mover-assignment rules based on project weight.',
    ownership: 'Lead and booking flow, CRM accuracy, quote calculations, dispute handling, phone routing, AI configuration, and operational reporting.'
  },
  {
    industry: 'Remote executive support', title: 'Part-Time Executive Assistant', dates: 'January 2025 to August 2025',
    description: 'I provided remote administration, document organisation, tracker maintenance, written coordination, operational notes, and dependable follow-through on assigned tasks.',
    ownership: 'Task follow-up, document organisation, tracking, and task completion.'
  },
  {
    industry: 'BPO', title: 'Lead Quality Analyst', dates: 'July 2023 to January 2025',
    description: 'I directly led 10 quality analysts and separately supported a personal portfolio of approximately 25 agents through audits, coaching, and performance review. I designed and maintained the campaign-wide allocation covering 16 QAs, three lines of business, and 444 active agents in the November 2024 snapshot. Workloads were balanced by performance quartile, with QA schedules aligned to agent shifts. I consolidated QA findings by line of business, identified underlying agent behaviours, built weekly business review decks, and presented root-cause analyses and action plans to clients, directors, Operations Managers, and Team Leaders.',
    ownership: 'People leadership, campaign workload allocation, audit and coaching coverage, calibration, performance analysis, and executive stakeholder briefing.',
    evidence: ['Empathy non-compliance reduced from 60% to 45% over three weeks during the supported improvement period.', 'Average Handling Time decreased from 685 seconds to 618 seconds during the supported improvement period.', 'Scored in Q1, the highest tier, by external evaluators for QA-of-QA coaching quality.', 'Recognised as Top QA in May 2024 and September 2024.'], caseSlug: 'bpo-quality-improvement'
  }
];

function experienceBody() {
  return `${pageHero('Work history', 'I learned the work first. Then I learned how to lead and systemise it.', 'My experience moved from frontline customer operations into quality leadership, finance operations, practice management, and remote team management. I manage people and the operational systems around them: analyse how work is actually being done, remove unnecessary variation, document the correct process, build controls, and make follow-through visible.')}<section class="section-pad"><div class="shell timeline">${roles.map(role => `<article><div class="timeline-date">${role.dates}</div><div class="timeline-marker" aria-hidden="true"></div><div class="timeline-body"><p class="eyebrow">${role.industry}</p><h2>${role.title}</h2><p>${role.description}</p><h3>Core ownership</h3><p>${role.ownership}</p>${role.evidence ? `<h3>Operational evidence</h3><ul class="plain-list">${role.evidence.map(item => `<li>${item}</li>`).join('')}</ul>` : ''}${role.caseSlug ? `<a class="text-link" href="${href(`case-studies/${role.caseSlug}/`)}">Read the related case study ${icon('arrow')}</a>` : ''}</div></article>`).join('')}</div></section><section class="experience-bridge section-pad"><div class="shell"><p class="eyebrow">Earlier customer operations foundation</p><h2>Frontline work taught me where procedures break in real use.</h2><p>Before moving into quality and operations leadership, I worked across several frontline customer-support and subject matter expert roles in the BPO industry. At one employer, I was promoted to SME within two weeks of entering production and supported demo calls, side-barging, procedure clarification, and supervisor escalations. At another, I created client-approved email templates and macros adopted across the wider agent workflow.</p></div></section>${cta('Need a manager who understands the work from the frontline upward?')}`;
}

function aboutBody() {
  return `${pageHero('About', 'I understand what a process says on paper and what happens when a real team has to use it.', 'Frontline work taught me where instructions break down. Quality leadership taught me how to coach from evidence. Finance and accounting-practice work taught me the importance of accurate status, careful checks, and reliable handoffs. Management brings those lessons together.')}<section class="section-pad"><div class="shell about-balance"><div><p class="eyebrow">How I think about the work</p><h2>Make it clear. Make it repeatable. Make exceptions visible.</h2></div><div class="about-copy"><p>I am most useful when a function needs both day-to-day ownership and a better way of working. That means understanding how people actually execute the process, then improving the standard without losing the practical details that keep work moving.</p><blockquote>“My job is to make the work clearer, easier to repeat, and less dependent on constant checking.”</blockquote></div></div></section><section class="principles section-pad"><div class="shell"><div class="section-heading"><p class="eyebrow">Operating principles</p><h2>Simple rules that keep work dependable.</h2></div><div class="principle-grid"><article><h3>Make ownership clear.</h3><p>Every priority, handoff, and escalation should have an accountable next person.</p></article><article><h3>Document what helps.</h3><p>SOPs should answer real questions and make the next task easier to complete.</p></article><article><h3>Keep exceptions visible.</h3><p>Problems should surface early enough to solve, not disappear until they become urgent.</p></article></div></div></section>${cta('Bring me the messy operating problem.')}`;
}

function credentialsBody() {
  const credentials = [
    ['QuickBooks Online ProAdvisor', 'Finance systems', 'assets/images/quickbooks-online-certification.png'],
    ['Xero Advisor Certification, Level 1', 'Finance systems', 'assets/images/xero-certified-associate-l1.png'],
    ['Xero Advisor Certification, Level 2', 'Finance systems', 'assets/images/xero-certified-professional-l2.png'],
    ['Xero Payroll Specialist, Australia', 'Payroll systems', 'assets/images/xero-payroll-specialist.png'],
    ['Six Sigma White Belt', 'Process improvement', 'assets/images/six-sigma-white-belt-full.webp'],
    ['The Non-Technical Skills of Effective Data Scientists', 'Data communication', 'assets/images/certificate-nontechnical-skills-data-scientists-full.webp'],
    ['EF SET English, 78/100, CEFR C2', 'Communication', 'assets/images/ef-set-certificate-full.webp']
  ];
  const tools = [
    ['https://www.xero.com/favicon.ico', 'Xero'], ['https://quickbooks.intuit.com/favicon.ico', 'QuickBooks'],
    ['https://ssl.gstatic.com/docs/spreadsheets/favicon3.ico', 'Google Sheets'], ['https://www.microsoft.com/favicon.ico', 'Microsoft Excel'],
    ['https://app.powerbi.com/images/PowerBI_Favicon.ico', 'Power BI'], ['https://www.supermove.com/favicon.ico', 'Supermove'],
    ['https://www.ringcentral.com/favicon.ico', 'RingCentral'], ['https://a.slack-edge.com/80588/marketing/img/meta/favicon-32.png', 'Slack'],
    ['https://trello.com/favicon.ico', 'Trello'], ['https://www.adobe.com/favicon.ico', 'Adobe Sign'],
    ['https://zapier.com/favicon.ico', 'Zapier'], ['https://www.make.com/favicon.ico', 'Make'],
    ['https://n8n.io/favicon.ico', 'n8n'], ['https://www.salesforce.com/favicon.ico', 'Salesforce']
  ];
  return `${pageHero('Credentials', 'Training that supports the work.', 'Credentials strengthen the systems, process, data, and communication skills used across my operating roles.')}<section class="section-pad"><div class="shell"><div class="section-heading"><h2>Professional credentials</h2></div><div class="credentials-list">${credentials.map(([name, area, image]) => `<article><div><p class="eyebrow">${area}</p><h3>${name}</h3></div><a class="text-link" href="${href(image)}" target="_blank" rel="noopener">View credential ${icon('arrow')}</a></article>`).join('')}</div></div></section><section class="tool-section section-pad"><div class="shell"><div class="section-heading"><p class="eyebrow">Tools</p><h2>Platforms I have used in real work.</h2></div><div class="tool-logo-grid">${tools.map(([source, name]) => `<div class="tool-logo"><img src="${source}" alt="" loading="lazy"><span>${name}</span></div>`).join('')}</div></div></section>${cta('The platform matters less than the operating discipline around it.')}`;
}

function contactBody() {
  return `<section class="contact-hero section-pad"><div class="shell contact-grid"><div><p class="eyebrow">Start a conversation</p><h1>What keeps getting stuck?</h1><p class="lede">Tell me what is happening and where the work keeps returning to you.</p><div class="contact-direct"><a href="mailto:${email}">${email}</a><a href="${whatsapp}" rel="noopener">WhatsApp</a></div></div><form class="contact-form" action="https://formspree.io/f/mblgbzoj" method="post" data-contact-form><div class="form-intro"><h2>Tell me what is happening</h2></div><div class="field"><label for="name">Name</label><input id="name" name="name" autocomplete="name" required></div><div class="field"><label for="email">Email</label><input id="email" name="email" type="email" autocomplete="email" required></div><div class="field"><label for="difficult">What needs attention?</label><textarea id="difficult" name="current_difficulty" rows="6" required></textarea></div><div class="honeypot" aria-hidden="true"><input id="website" name="_gotcha" tabindex="-1" autocomplete="off" aria-label="Spam prevention field"></div><input type="hidden" name="form_source" value="portfolio_operations_enquiry"><button class="button form-submit" type="submit">Send message ${icon('arrow')}</button><div class="form-status" role="status" aria-live="polite" tabindex="-1" data-form-status></div></form></div></section>`;
}

function privacyBody() {
  return `<header class="privacy-hero section-pad"><div class="shell"><h1>Privacy</h1></div></header><section class="privacy-content section-pad" aria-label="Contact form privacy terms"><div class="shell privacy-policy"><section><h2>Information collected</h2><p>When you use the contact form, the following information is collected:</p><ul><li>Your name</li><li>Your email address</li><li>Your enquiry and any other information you choose to include</li></ul><p>The website and its form-delivery provider may also process limited technical information, such as your IP address, browser or device information, submission time, and referring page. This helps deliver the form and protect the website from spam, fraud, and misuse.</p></section><section><h2>How your information is used</h2><p>Your information is used only when reasonably connected with your enquiry. This may include:</p><ul><li>Reviewing and responding to your message</li><li>Discussing services or information you requested</li><li>Keeping necessary communication and business records</li><li>Protecting the website and form from spam, fraud, or misuse</li><li>Meeting applicable legal or regulatory obligations</li></ul><p>Your personal information is not sold or rented. It will not be used for unrelated marketing without your permission.</p></section><section><h2>Storage and service providers</h2><p>Contact form submissions are processed by Formspree so they can be delivered and answered. Information may also be stored in email, website hosting, cloud storage, or other business systems used to manage enquiries.</p><p>These providers may process or store information in other countries. They are given access only where needed to provide their services. Reasonable administrative, technical, and organisational measures are used to protect information against loss, misuse, unauthorised access, alteration, or disclosure.</p></section><section><h2>Retention</h2><p>Information is kept only for as long as reasonably needed to respond to your enquiry, manage follow-up, maintain appropriate business records, and meet applicable legal, accounting, or regulatory requirements.</p><p>When information is no longer reasonably required, it will be deleted, destroyed, or de-identified where practical.</p></section><section><h2>Your privacy requests</h2><p>Where applicable, you may ask to access the personal information held about you, correct inaccurate information, delete information that is no longer needed, or withdraw consent where processing relies on consent.</p><p>Valid requests will be handled within a reasonable period and in accordance with applicable privacy laws. Some information may need to be retained for legal, regulatory, record-keeping, fraud-prevention, or security purposes.</p></section><section><h2>Disclosure</h2><p>Information may be shared with trusted service providers where necessary to operate the website or respond to your enquiry. It may also be disclosed where required or permitted by law.</p></section><section class="privacy-contact"><h2>Contact</h2><p>For a question or privacy request, email <a href="mailto:${email}">${email}</a>.</p></section><section><h2>Consent</h2><p>By submitting the contact form, you confirm that the information you provide is accurate to the best of your knowledge and that you understand how it will be handled.</p></section></div></section>`;
}

const notFoundBody = () => `<section class="not-found section-pad"><div class="shell"><p class="eyebrow">404</p><h1>Page not found.</h1><p class="lede">The page may have moved. Use the current navigation to continue.</p><div class="button-row">${button(href(), 'Return home')}${button(href('case-studies/'), 'View case studies', true)}</div></div></section>`;
function redirectPage(target) {
  const destination = href(target);
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page moved | John Jevi dela Cruz</title><meta name="robots" content="noindex,follow"><link rel="canonical" href="${canonical(target)}"><meta http-equiv="refresh" content="0;url=${destination}"><script>location.replace(${JSON.stringify(destination)});</script></head><body><main><h1>Page moved</h1><p><a href="${destination}">Continue to the current page</a>.</p></main></body></html>`;
}
async function put(path, content) {
  const target = resolve(out, path);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, content);
}

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(resolve(root, 'static'), out, { recursive: true });
await put('index.html', page({ title: 'Operations & Management Consultant', description: 'John Jevi dela Cruz manages people, improves workflows, and builds the systems that keep day-to-day operations consistent.', body: homeBody() }));
await put('how-i-help/index.html', page({ title: 'Operations Management Consulting', description: 'Hands-on operations management for teams that need clearer ownership, stronger follow-through, and repeatable workflows.', path: 'how-i-help/', current: 'help', body: helpBody() }));
await put('case-studies/index.html', page({ title: 'Operations Case Studies', description: 'Case studies in moving operations, accounting-practice workflows, BPO quality, e-commerce data, and finance operations.', path: 'case-studies/', current: 'cases', body: casesBody() }));
for (const item of allCases) await put(`case-studies/${item.slug}/index.html`, page({ title: `${item.title} Case Study`, description: item.summary, path: `case-studies/${item.slug}/`, current: 'cases', body: caseBody(item) }));
await put('experience/index.html', page({ title: 'Work History', description: 'Work history across remote team management, accounting-practice operations, finance operations, AI data review, and BPO quality leadership.', path: 'experience/', current: 'experience', body: experienceBody() }));
await put('about/index.html', page({ title: 'About', description: 'John Jevi dela Cruz combines frontline, quality, finance, practice-management, and systems experience to improve how teams operate.', path: 'about/', current: 'about', body: aboutBody() }));
await put('credentials/index.html', page({ title: 'Credentials', description: 'Professional training and platforms used across operations, finance systems, process improvement, data communication, and team leadership.', path: 'credentials/', current: 'credentials', body: credentialsBody() }));
await put('contact/index.html', page({ title: 'Contact', description: 'Contact John Jevi dela Cruz to discuss an operations problem that keeps getting stuck, repeated, or escalated.', path: 'contact/', body: contactBody() }));
await put('privacy/index.html', page({ title: 'Privacy', description: 'How information submitted through the contact form is collected, used, stored, retained, and deleted.', path: 'privacy/', body: privacyBody() }));
await put('404.html', page({ title: 'Page Not Found', description: 'The requested page could not be found.', path: '404.html', robots: 'noindex,follow', body: notFoundBody() }));

const redirects = {
  'services.html': 'how-i-help/', 'certifications.html': 'credentials/', 'fractional-ops-partner.html': 'how-i-help/', 'xero-quickbooks-support.html': 'how-i-help/',
  'moving-crm-operations.html': 'case-studies/moving-company-operations/', 'case-moving-afterhours-lead-recovery.html': 'case-studies/moving-company-operations/', 'case-moving-executive-reporting-coordination.html': 'case-studies/moving-company-operations/', 'case-moving-intake-crm-hygiene.html': 'case-studies/moving-company-operations/', 'case-bookkeeping-invoice-disputes-support.html': 'case-studies/moving-company-operations/',
  'case-data-weekly-insights-decks.html': 'case-studies/bpo-quality-improvement/', 'case-qa-empathy-lift-aht-down.html': 'case-studies/bpo-quality-improvement/', 'case-qa-guidelines-rollout-calibration.html': 'case-studies/bpo-quality-improvement/', 'case-qa-operating-system-10qas.html': 'case-studies/bpo-quality-improvement/',
  'case-data-api-ingestion-normalization.html': 'case-studies/ecommerce-profit-intelligence/', 'case-data-profit-intelligence-stock-tracker.html': 'case-studies/ecommerce-profit-intelligence/',
  'case-bookkeeping-construction-materials-inventory.html': 'case-studies/construction-materials-finance/', 'case-bookkeeping-construction-materials-qbo-setup.html': 'case-studies/construction-materials-finance/',
  'case-ai-flowise-rag-chatbot.html': 'case-studies/flowise-rag-chatbot/', 'case-ai-movemate-estimator-prototype.html': 'case-studies/movemate-estimator/', 'case-ai-phone-agent-automation-playbook.html': 'case-studies/',
  'case-studies/dan-moving-team/index.html': 'case-studies/moving-company-operations/', 'case-studies/harvestwise-practice-workflow/index.html': 'case-studies/accounting-firm-workflow/', 'case-studies/iqor-quality-improvement/index.html': 'case-studies/bpo-quality-improvement/', 'case-studies/fsecom-profit-intelligence/index.html': 'case-studies/ecommerce-profit-intelligence/', 'case-studies/prestige-finance-operations/index.html': 'case-studies/construction-materials-finance/'
};
for (const [path, target] of Object.entries(redirects)) await put(path, redirectPage(target));
const pages = ['', 'how-i-help/', 'case-studies/', ...allCases.map(item => `case-studies/${item.slug}/`), 'experience/', 'about/', 'credentials/', 'contact/', 'privacy/'];
await put('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(path => `  <url><loc>${canonical(path)}</loc><lastmod>2026-08-27</lastmod></url>`).join('\n')}\n</urlset>\n`);
await put('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${canonical('sitemap.xml')}\n`);
console.log(`Built ${pages.length} indexable pages and ${Object.keys(redirects).length} redirects in ${out}`);
