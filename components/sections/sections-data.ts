/**
 * All homepage body copy in one place.
 *
 * Separating content from the section components keeps each section a thin,
 * reusable layout shell and lets copy be revised (or later moved to a CMS)
 * without touching markup or motion.
 */

export interface NumberedBlock {
  title: string;
  body: string;
}

/** Section 2 — the world the firm operates in. */
export const businessRealityIntro =
  "Executives are not short of advice. They are short of time to convert advice into structural change before the ground shifts again. Four forces now compress that window.";

export const businessRealityBlocks: NumberedBlock[] = [
  {
    title: "AI acceleration",
    body: "Capability that took a decade to build can now be matched in a quarter. Advantage accrues to organisations that can absorb new technology into how they operate, not merely adopt it.",
  },
  {
    title: "Market volatility",
    body: "Capital, talent and demand move faster and less predictably. Plans built for a single forecast are fragile; the durable enterprise is designed to hold under several.",
  },
  {
    title: "Leadership complexity",
    body: "The number of decisions that must be made well, and quickly, has grown faster than most leadership teams have been structured to handle. Clarity has become the scarce resource.",
  },
  {
    title: "Organisational resilience",
    body: "Resilience is not a culture initiative. It is an architecture — of decision rights, incentives and information — that lets an organisation adapt without losing coherence.",
  },
];

/** Section 3 — capabilities grid. */
export interface Capability {
  title: string;
  body: string;
  href: string;
}

export const capabilities: Capability[] = [
  {
    title: "Enterprise Readiness",
    body: "A clear-eyed assessment of whether the organisation is built to execute its own strategy — and where it is not.",
    href: "/practices/enterprise-readiness",
  },
  {
    title: "AI Transformation",
    body: "Moving beyond pilots to operating models where intelligence is embedded in how work is actually done.",
    href: "/practices/ai-transformation",
  },
  {
    title: "Strategic Partnerships",
    body: "Structuring the alliances, ventures and acquisitions that extend capability faster than building alone.",
    href: "/practices/strategic-partnerships",
  },
  {
    title: "Valuation Optimisation",
    body: "Identifying where enterprise value is created, diluted or hidden, and re-aligning the business around it.",
    href: "/practices/valuation-optimisation",
  },
  {
    title: "Organisational Design",
    body: "Decision rights, structure and incentives arranged so the organisation can move without losing coherence.",
    href: "/practices/organisational-design",
  },
  {
    title: "Future Strategy",
    body: "Positioning the enterprise for markets that do not yet exist, with the optionality to commit when they do.",
    href: "/practices/future-strategy",
  },
];

/** Section 4 — methodology timeline. */
export interface MethodologyStage {
  title: string;
  body: string;
  outcome: string;
}

export const methodologyStages: MethodologyStage[] = [
  {
    title: "Discover",
    body: "Understand leadership, operations, technology and market position — and how decisions are genuinely made inside the organisation.",
    outcome: "A shared, unsentimental picture of where value is created and lost.",
  },
  {
    title: "Assess",
    body: "Test the organisation against the futures it is most exposed to, isolating the constraints that actually govern performance.",
    outcome: "The few structural issues worth solving, separated from the noise.",
  },
  {
    title: "Architect",
    body: "Design the operating model — decision rights, capabilities and incentives — that the strategy requires to hold.",
    outcome: "A blueprint the leadership team can commit to and defend.",
  },
  {
    title: "Transform",
    body: "Work alongside the team to implement the design, sequencing change so momentum builds rather than fractures.",
    outcome: "Change that takes root in how the organisation operates.",
  },
  {
    title: "Measure",
    body: "Instrument the outcomes that matter and adjust deliberately, leaving the organisation able to continue without us.",
    outcome: "Durable capability, and evidence it is compounding.",
  },
];

/** Section 5 — comparison. */
export interface ComparisonRow {
  traditional: string;
  agp: string;
}

export const comparisonRows: ComparisonRow[] = [
  {
    traditional: "Short-term recommendations",
    agp: "Long-term organisational capability",
  },
  { traditional: "Project delivery", agp: "Enterprise transformation" },
  { traditional: "Reports and decks", agp: "Operating systems that endure" },
  {
    traditional: "Advice handed over at the door",
    agp: "Partnership through implementation",
  },
];

/** Section 6 — insights. */
export interface InsightArticle {
  title: string;
  category: string;
  date: string;
  readingTime: string;
  href: string;
}

export const insightArticles: InsightArticle[] = [
  {
    title: "Why transformation programmes stall in the second year",
    category: "Organisational Design",
    date: "June 2026",
    readingTime: "8 min read",
    href: "/insights/transformation-second-year",
  },
  {
    title: "AI is an operating-model decision, not a technology one",
    category: "AI Transformation",
    date: "May 2026",
    readingTime: "6 min read",
    href: "/insights/ai-operating-model",
  },
  {
    title: "Designing enterprises that hold under more than one future",
    category: "Strategy",
    date: "April 2026",
    readingTime: "10 min read",
    href: "/insights/designing-for-many-futures",
  },
];

/** Section 7 — strategic principles. */
export interface Principle {
  title: string;
  body: string;
}

export const principles: Principle[] = [
  {
    title: "Think long-term",
    body: "We optimise for capability that compounds, not wins that fade with the engagement.",
  },
  {
    title: "Design before scale",
    body: "Structure the organisation deliberately before adding weight to it; scale amplifies whatever it finds.",
  },
  {
    title: "Technology enables strategy",
    body: "Tools follow intent. We decide what the enterprise must become before deciding what it should buy.",
  },
  {
    title: "Organisations must adapt",
    body: "The goal is not a plan but the capacity to keep making good decisions as the ground moves.",
  },
];

/** Section 8 — FAQ. */
export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "How does AGP engage with organisations?",
    answer:
      "Every relationship begins with a diagnostic period before any scope is proposed. We work as a partner to the leadership team through implementation, not as an outside adviser who leaves a report at the door.",
  },
  {
    question: "Do you work with startups or enterprises?",
    answer:
      "Our model is built for established organisations at the point where strategy meets execution — typically enterprises and scaled growth companies whose decisions carry structural consequences.",
  },
  {
    question: "How is Growth Architecture different from traditional consulting?",
    answer:
      "Traditional consulting delivers recommendations. Growth Architecture builds the operating capability — decision rights, structure, incentives and technology — that lets an organisation execute and keep adapting after we are gone.",
  },
  {
    question: "What industries do you support?",
    answer:
      "We work across sectors where enterprise readiness and AI transformation are consequential. The method is industry-agnostic; the engagement is always specific to the organisation in front of us.",
  },
];
