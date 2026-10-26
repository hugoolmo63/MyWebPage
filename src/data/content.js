export const personalInfo = {
  name: "HUGO OLMO",
  badge: "Student & Builder",
  socials: {
    github: "https://github.com/hugoolmo63",
    linkedin: "https://www.linkedin.com/in/hugo-olmo-764874392?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    instagram: "https://instagram.com/hugoolmoo._"
  }
}

export const projects = [
  {
    id: "01",
    number: '01 / 04',
    category: 'P2P MARKETPLACE',
    title: 'Toolyo',
    description: 'Production-ready P2P rental platform built with spatial queries and robust CI/CD.',
    fullDescription: "Toolyo started as a collaborative team effort to build a peer-to-peer equipment rental marketplace. We kicked off the architecture using SpecKit to write clear, structured specifications before writing code. Later on, I took the lead on finalizing the technical implementation.\n\nThroughout the journey, I worked on:\n• Spatial Search & DB: Setting up PostgreSQL and PostGIS to handle geographic radius filtering.\n• Search Mechanics: Designing a tokenized, multi-field search algorithm across titles, descriptions, and categories.\n• Testing & Reliability: Building a suite of 326 unit and integration tests using Vitest, Testcontainers, and GitHub Actions CI/CD pipelines.\n• Product & Compliance: Implementing GDPR account anonymization, infinite scrolling, interactive Leaflet maps, and Capacitor support for mobile.\n\nWhy we paused:\nAfter building a fully functional product with end-to-end features, legal compliance, and solid testing, we faced the harsh reality of P2P marketplaces: the operational complexity of insurance, liability risks, and user acquisition. We made the conscious decision to pause the business launch and open-source the codebase as a portfolio project, showcasing production-grade software engineering.",    tags: ['Next.js', 'PostgreSQL', 'PostGIS', 'Prisma', 'TypeScript', 'Docker'],
    link: 'https://github.com/hugoolmo63/Toolyo',
  },
  {
    id: "02",
    number: '02 / 04',
    category: 'SaaS',
    title: 'Supaform',
    description: 'Simple forms for teams that want to listen better to their users.',
    fullDescription: '',
    tags: ['React', 'Node.js', 'OpenAI'],
    link: 'https://github.com/',
  },
  {
    id: "03",
    number: '03 / 04',
    category: 'APP',
    title: 'Linear Notes',
    description: 'A quiet space to capture ideas and turn them into action.',
    fullDescription: '',
    tags: ['Next.js', 'Postgres', 'Tailwind'],
    link: 'https://github.com/',
  },
  {
    id: "04",
    number: '04 / 04',
    category: 'AI',
    title: 'Open Metrics',
    description: 'Accessible metrics for teams just starting to measure what matters.',
    fullDescription: '',
    tags: ['TypeScript', 'D3.js', 'Vercel'],
    link: 'https://github.com/',
  },
]

export const posts = [
  { date: '18.09.24', category: 'PRODUCT', title: 'Designing for clarity', readTime: '7 min' },
  { date: '06.09.24', category: 'AI', title: 'A copilot people actually use', readTime: '9 min' },
  { date: '29.08.24', category: 'ENGINEERING', title: 'From prototype to product', readTime: '6 min' },
  { date: '14.08.24', category: 'NOTES', title: 'Building in public', readTime: '5 min' },
]