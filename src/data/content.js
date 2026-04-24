/**
 * Ernest Klu Portfolio — Content Data
 * Single source of truth for all copy and project data.
 * Swap these values when real assets are ready.
 */

export const SITE = {
  name: 'Ernest Klu',
  tagline: 'Architect & Sound Engineer',
  location: 'Accra, Ghana',
  email: 'ernest@ernestklu.com',
  availability: 'Open for Freelance Commissions',
  responseTime: 'Within 24 hours on weekdays',
  social: {
    behance:   'https://www.behance.net/ernest_klu',
    instagram: '#',
    twitter:   '#',
  },
}

export const NAV_LINKS = [
  { label: 'Home',    path: '/' },
  {
    label: 'Portfolio',
    path:  '/work',
    children: [
      { label: 'Architecture',      path: '/work?filter=Architecture' },
      { label: 'Sound Engineering', path: '/work?filter=Sound' },
    ],
  },
  { label: 'About',   path: '/about' },
  { label: 'Contact', path: '/contact' },
]

export const STATS = [
  { value: '12',  label: 'Projects' },
  { value: '2',   label: 'Disciplines' },
  { value: '5+',  label: 'Years' },
]

export const TRUST_ITEMS = [
  { value: '12',  label: 'Completed Projects' },
  { value: '2',   label: 'Disciplines Combined' },
  { value: '5+',  label: 'Years of Practice' },
  { value: 'GH',  label: 'Based in Ghana' },
]

export const SERVICES = [
  {
    id: 'architecture',
    num: '01',
    title: 'Architecture & Spatial Logic',
    variant: 'dark',
    icon: 'house',
    items: [
      'Residential Design',
      'Commercial Buildings',
      'Interior Architecture',
      'Renovations & Extensions',
      'Concept Development',
    ],
  },
  {
    id: 'sound',
    num: '02',
    title: 'Sound Engineering & Acoustics',
    variant: 'light',
    icon: 'sound',
    items: [
      'Recording Studio Design',
      'Acoustic Planning & Analysis',
      'Live Sound Systems',
      'Home Theatre Acoustics',
      'Audio Consultation',
    ],
  },
]

export const PROJECTS = [
  {
    id: 'grand-haven',
    title: 'The Grand Haven',
    category: 'Residential',
    location: 'East Legon',
    tags: ['Architecture', 'Residential'],
    description: 'Luxury residence with open-plan interiors and a considered material palette responding to the East Legon context.',
    image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/2f091f245060857.69a596117b0b2.jpg',
    behance: 'https://www.behance.net/gallery/245060857/THE-GRAND-HAVEN-EAST-LEGON',
    featured: true,
    num: '01',
  },
  {
    id: 'rooftop-restaurant',
    title: 'Roof Top Restaurant',
    category: 'Hospitality',
    location: 'Accra',
    tags: ['Architecture', 'Commercial'],
    description: 'Elevated dining experience with panoramic city views, deliberate acoustic planning, and outdoor terrace design.',
    image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/246d0c245063029.69a59eba15cd4.jpg',
    behance: 'https://www.behance.net/gallery/245063029/ROOF-TOP-RESTAURANT',
    featured: true,
    num: '02',
  },
  {
    id: 'regal-court',
    title: 'Regal Court',
    category: 'Residential',
    location: 'Tema',
    tags: ['Architecture', 'Residential'],
    description: 'Mid-rise residential development with landscaped communal courtyards and generous natural light strategy.',
    image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/b9c59d245061137.69a597165bf14.jpg',
    behance: 'https://www.behance.net/gallery/245061137/REGAL-COURT-(TEMA)',
    featured: true,
    num: '03',
  },
  {
    id: 'lakeview-manor',
    title: 'Lakeview Manor',
    category: 'Residential',
    location: 'Biriwaa',
    tags: ['Architecture', 'Residential'],
    description: 'Waterfront residence carefully composed to respond to its lakeside setting and maximise natural ventilation.',
    image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/cf7e8e245060857.69a596117b940.jpg',
    behance: 'https://www.behance.net/gallery/245060977/LAKEVIEW-MANOR-(BIRIWAA)',
    num: '04',
  },
  {
    id: 'apartments-east-legon-hills',
    title: 'Apartments at East Legon Hills',
    category: 'Residential',
    location: 'East Legon Hills',
    tags: ['Architecture', 'Residential', 'Commercial'],
    description: 'Multi-unit residential complex blending contemporary massing with contextual sensitivity on a hillside site.',
    image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/bbd183245060323.69a593c36a3ad.jpg',
    behance: 'https://www.behance.net/gallery/245060323/APARTMENTS-AT-EAST-LEGON-HILLS',
    num: '05',
  },
  {
    id: 'residence-amrahia',
    title: 'Residence at Amrahia',
    category: 'Residential',
    location: 'Amrahia',
    tags: ['Architecture', 'Residential'],
    description: 'Suburban residence designed with a passive ventilation strategy and strong indoor–outdoor connection.',
    image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/9863d1245060775.69a595b0d9bca.jpg',
    behance: 'https://www.behance.net/gallery/245060775/RESIDENCE-AT-AMRAHIA',
    num: '06',
  },
  {
    id: 'residence-oyibi',
    title: 'Residence at Oyibi',
    category: 'Residential',
    location: 'Oyibi',
    tags: ['Architecture', 'Residential'],
    description: 'Contemporary family residence with bold facade articulation and efficient spatial organisation.',
    image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/fe8723245059113.69a58e53e2376.jpg',
    behance: 'https://www.behance.net/gallery/245059113/RESIDENCE-AT-OYIBI',
    num: '07',
  },
  {
    id: 'residence-pokuase',
    title: 'Residence at Pokuase',
    category: 'Residential',
    location: 'Pokuase',
    tags: ['Architecture', 'Residential'],
    description: 'Compact family home with a considered plan that maximises liveable area within a modest footprint.',
    image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/9afd67245059007.69a58dd5e9e90.jpg',
    behance: 'https://www.behance.net/gallery/245059007/RESIDENCE-AT-POKUASE',
    num: '08',
  },
  {
    id: 'diagnostic-centre',
    title: 'Diagnostic Centre',
    category: 'Healthcare',
    location: 'Swedru',
    tags: ['Architecture', 'Commercial'],
    description: 'Medical facility with rigorous acoustic separation between consultation rooms and a calm patient environment.',
    image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/33d535245060405.69a5942e8179d.jpg',
    behance: 'https://www.behance.net/gallery/245060405/DIAGNOSTIC-CENTRE-AT-SWEDRU',
    num: '09',
  },
  {
    id: 'bar-east-legon',
    title: 'Bar at East Legon',
    category: 'Hospitality',
    location: 'East Legon',
    tags: ['Architecture', 'Commercial', 'Interiors'],
    description: 'Intimate bar interior balancing warmth and edge — material richness meets a curated acoustic atmosphere.',
    image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/aeb9e2245063029.69a59eba17811.jpg',
    behance: 'https://www.behance.net/gallery/245059079/BAR-AT-EAST-LEGON',
    num: '10',
  },
  {
    id: 'lab-interiors-korle-bu',
    title: 'Lab Interiors at Korle Bu',
    category: 'Interiors',
    location: 'Korle Bu',
    tags: ['Interiors'],
    description: 'Clinical laboratory interior with compliance-first spatial planning and carefully controlled surface materials.',
    image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/3b9a8e245060567.69a594e244e68.jpg',
    behance: 'https://www.behance.net/gallery/245060567/LAB-INTERIORS-AT-KORLE-BU',
    num: '11',
  },
  {
    id: 'lab-interiors',
    title: 'Lab Interiors',
    category: 'Interiors',
    location: 'Accra',
    tags: ['Interiors'],
    description: 'Laboratory interior combining functional rigour with a considered spatial sequence for staff and visitors.',
    image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/a7102a245060825.69a595e7512ef.jpg',
    behance: 'https://www.behance.net/gallery/245060825/LAB-INTERIORS',
    num: '12',
  },
  {
    id: 'recording-studio',
    title: 'Recording Studio Design',
    category: 'Acoustic Design',
    location: 'Accra',
    tags: ['Sound'],
    description: 'Professional recording environment designed from acoustic first-principles — isolation, diffusion, and absorption balanced for studio-grade fidelity.',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1400&q=85',
    num: '13',
  },
  {
    id: 'home-theatre',
    title: 'Home Theatre & Acoustics',
    category: 'Acoustic Design',
    location: 'East Legon',
    tags: ['Sound'],
    description: 'Residential home theatre with full acoustic treatment — room-mode analysis, panel placement, and speaker calibration for reference-quality playback.',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=1400&q=85',
    num: '14',
  },
]

export const WORK_FILTERS = ['All Work', 'Architecture', 'Residential', 'Commercial', 'Hospitality', 'Interiors', 'Healthcare', 'Sound']

export const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Consultation',
    desc: 'We discuss your vision, site, budget, and timeline. No commitment required at this stage.',
  },
  {
    num: '02',
    title: 'Concept & Design',
    desc: 'Initial concepts, floor plans, 3D renders, and acoustic studies presented for your review.',
  },
  {
    num: '03',
    title: 'Refinement & Approval',
    desc: 'We iterate based on your feedback until the design is exactly right.',
  },
  {
    num: '04',
    title: 'Delivery & Execution',
    desc: 'Construction documentation, contractor coordination, and site oversight to completion.',
  },
]

export const TESTIMONIALS = [
  {
    id: 1,
    quote: "Ernest understood what we wanted before we could fully articulate it. The Grand Haven exceeded everything we imagined — both in design and in how the spaces feel to live in.",
    name: 'Kwame Asante',
    role: 'Residential Client · East Legon',
  },
  {
    id: 2,
    quote: "Working with Ernest on our rooftop restaurant was exceptional. He brought a level of spatial thinking we hadn't encountered before — and the acoustics on the terrace are perfect.",
    name: 'Akua Mensah',
    role: 'Hospitality Owner · Accra',
  },
  {
    id: 3,
    quote: "The diagnostic centre was delivered on time, within budget. The acoustic separation between consultation rooms is exactly what a medical facility demands.",
    name: 'Dr. Emmanuel Ofori',
    role: 'Clinic Director · Swedru',
  },
]

export const DISCIPLINES = [
  {
    id: 'arch',
    icon: 'house',
    title: 'Architecture & Spatial Logic',
    sub: 'Residential · Commercial · Healthcare · Hospitality',
  },
  {
    id: 'sound',
    icon: 'sound',
    title: 'Sound Engineering & Acoustics',
    sub: 'Studios · Events · Hospitality · Acoustic Interiors',
  },
]

export const MARQUEE_ITEMS = [
  'Residential', 'Commercial', 'Hospitality', 'Healthcare',
  'Acoustic Design', 'Studio Design', 'Interiors', 'East Legon',
  'Tema', 'Accra',
]

export const ABOUT_TAGS = [
  { label: 'Architecture',    accent: true },
  { label: 'Sound Engineering', accent: true },
  { label: 'Interior Design',   accent: false },
  { label: 'Acoustic Design',   accent: false },
  { label: '3D Visualisation',  accent: false },
  { label: 'Spatial Planning',  accent: false },
]

export const CONTACT_PROJECT_TYPES = [
  'Residential Architecture',
  'Commercial Architecture',
  'Interior Design',
  'Hospitality Design',
  'Healthcare Facility',
  'Recording Studio / Acoustic Design',
  'Renovation',
  'Other',
]
