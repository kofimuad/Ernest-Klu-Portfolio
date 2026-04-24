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
      { label: 'Architecture',      path: '/work' },
      { label: 'Sound Engineering', path: '/work' },
    ],
  },
  { label: 'About',   path: '/about' },
  { label: 'Contact', path: '/contact' },
]

export const STATS = [
  { value: '12+', label: 'Projects' },
  { value: '2',   label: 'Disciplines' },
  { value: '5+',  label: 'Years' },
]

export const TRUST_ITEMS = [
  { value: '12+', label: 'Completed Projects' },
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
    description: 'Luxury residence with open-plan interiors and contextual material palette.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=80',
    featured: true,
    num: '01',
  },
  {
    id: 'rooftop-restaurant',
    title: 'Rooftop Restaurant',
    category: 'Hospitality',
    location: 'Accra',
    tags: ['Architecture', 'Commercial'],
    description: 'Elevated dining with panoramic city views and deliberate acoustic design.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80',
    featured: true,
  },
  {
    id: 'recording-studio',
    title: 'Recording Studio Design',
    category: 'Acoustic Design',
    location: 'Studio',
    tags: ['Sound'],
    description: 'Professional acoustic environment designed from first principles.',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=900&q=80',
    featured: true,
  },
  {
    id: 'regal-court',
    title: 'Regal Court',
    category: 'Residential',
    location: 'Tema',
    tags: ['Architecture', 'Residential'],
    description: 'Mid-rise residential development with landscaped communal spaces.',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80',
  },
  {
    id: 'lakeview-manor',
    title: 'Lakeview Manor',
    category: 'Residential',
    location: 'Biriwaa',
    tags: ['Architecture', 'Residential'],
    description: 'Waterfront residence responding to site and natural light.',
    image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=900&q=80',
  },
  {
    id: 'diagnostic-centre',
    title: 'Diagnostic Centre',
    category: 'Healthcare',
    location: 'Swedru',
    tags: ['Architecture', 'Commercial'],
    description: 'Medical facility with rigorous acoustic separation between consultation rooms.',
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=900&q=80',
  },
  {
    id: 'lab-interiors',
    title: 'Lab Interiors',
    category: 'Interiors',
    location: 'Korle Bu',
    tags: ['Interiors'],
    description: 'Clinical laboratory interior with compliance-first spatial planning.',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=900&q=80',
  },
  {
    id: 'residence-amrahia',
    title: 'Residence at Amrahia',
    category: 'Residential',
    location: 'Amrahia',
    tags: ['Architecture', 'Residential'],
    description: 'Suburban residence with passive ventilation strategy.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&q=80',
  },
]

export const WORK_FILTERS = ['All Work', 'Architecture', 'Residential', 'Commercial', 'Interiors', 'Sound']

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
