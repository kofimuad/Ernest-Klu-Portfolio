/**
 * Ernest Klu Portfolio: content data.
 * Single source of truth for site copy and project details.
 *
 * Project photos and videos come from Cloudinary via src/data/media.json,
 * which `npm run media:upload` generates. A project's `id` must match the
 * slug of its media folder (e.g. "Akwaaba Rooftop- Madina" -> akwaaba-rooftop-madina).
 * `image` is a fallback used until a project has media in Cloudinary.
 * Projects with neither are hidden.
 */

export const SITE = {
  name: 'Ernest Klu',
  tagline: 'Architect & Sound Engineer',
  location: 'Accra, Ghana',
  email: 'airnestklu@gmail.com',
  availability: 'Taking on new commissions',
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
    label: 'Work',
    path:  '/work',
    children: [
      { label: 'Architecture',      path: '/work?filter=Architecture' },
      { label: 'Sound Engineering', path: '/work?filter=Sound' },
    ],
  },
  { label: 'About',   path: '/about' },
  { label: 'Contact', path: '/contact' },
]

export const SERVICES = [
  {
    id: 'architecture',
    num: '01',
    title: 'Architecture',
    variant: 'dark',
    icon: 'house',
    items: [
      'Homes and apartments',
      'Commercial and hospitality buildings',
      'Schools, churches and civic buildings',
      'Farm buildings',
      'Interiors, renovations and extensions',
    ],
  },
  {
    id: 'sound',
    num: '02',
    title: 'Sound Engineering & Acoustics',
    variant: 'light',
    icon: 'sound',
    items: [
      'Recording and lecture studios',
      'Acoustic treatment for halls and churches',
      'Live sound systems',
      'Home theatres',
      'Audio consultation',
    ],
  },
]

/**
 * category: drives the filter chips on the Work page.
 * tags: discipline filters used by the nav (Architecture, Interiors, Sound).
 */
export const PROJECTS = [
  {
    id: 'grand-haven',
    title: 'The Grand Haven',
    category: 'Residential',
    location: 'East Legon',
    tags: ['Architecture'],
    description: 'A private residence in East Legon with open-plan living spaces arranged around the main family rooms.',
    image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/2f091f245060857.69a596117b0b2.jpg',
    behance: 'https://www.behance.net/gallery/245060857/THE-GRAND-HAVEN-EAST-LEGON',
    featured: true,
  },
  {
    id: 'akwaaba-rooftop-madina',
    title: 'Akwaaba Rooftop',
    category: 'Hospitality',
    location: 'Madina',
    tags: ['Architecture'],
    description: 'A rooftop restaurant in Madina with an open terrace looking out over the city. The photographs show the finished space.',
    image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/246d0c245063029.69a59eba15cd4.jpg',
    behance: 'https://www.behance.net/gallery/245063029/ROOF-TOP-RESTAURANT',
    featured: true,
  },
  {
    id: 'idl-centre-knust',
    title: 'IDL Centre',
    category: 'Educational',
    location: 'KNUST, Kumasi',
    tags: ['Architecture', 'Interiors', 'Sound'],
    description: 'Interior and acoustic design for a lecture recording studio at the Institute of Distance Learning, KNUST. Angled wall panels break up reflections so lectures record cleanly.',
    featured: true,
  },
  {
    id: 'regal-court',
    title: 'Regal Court',
    category: 'Residential',
    location: 'Tema',
    tags: ['Architecture'],
    description: 'A mid-rise apartment block with landscaped shared courtyards.',
    image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/b9c59d245061137.69a597165bf14.jpg',
    behance: 'https://www.behance.net/gallery/245061137/REGAL-COURT-(TEMA)',
  },
  {
    id: 'all-souls-baptist-church',
    title: 'All Souls Baptist Church',
    category: 'Religious',
    location: 'Ghana',
    tags: ['Architecture'],
    description: 'A new church building for the All Souls Baptist congregation.',
  },
  {
    id: 'farmhouse-sogakope',
    title: 'Farmhouse',
    category: 'Agricultural',
    location: 'Sogakope',
    tags: ['Architecture'],
    description: 'A single-storey farmhouse under a mono-pitch roof, with a strip of clerestory windows that lets light and air in above the rooms.',
  },
  {
    id: 'pig-sty-bortianor',
    title: 'Pig Sty',
    category: 'Agricultural',
    location: 'Bortianor',
    tags: ['Architecture'],
    description: 'Livestock housing for a working farm in Bortianor.',
  },
  {
    id: 'lakeview-manor',
    title: 'Lakeview Manor',
    category: 'Residential',
    location: 'Biriwaa',
    tags: ['Architecture'],
    description: 'A house on the water at Biriwaa, laid out to catch the breeze off the lake.',
    image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/cf7e8e245060857.69a596117b940.jpg',
    behance: 'https://www.behance.net/gallery/245060977/LAKEVIEW-MANOR-(BIRIWAA)',
  },
  {
    id: 'apartments-east-legon-hills',
    title: 'Apartments at East Legon Hills',
    category: 'Residential',
    location: 'East Legon Hills',
    tags: ['Architecture'],
    description: 'A multi-unit apartment building on a sloping site.',
    image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/bbd183245060323.69a593c36a3ad.jpg',
    behance: 'https://www.behance.net/gallery/245060323/APARTMENTS-AT-EAST-LEGON-HILLS',
  },
  {
    id: 'residence-amrahia',
    title: 'Residence at Amrahia',
    category: 'Residential',
    location: 'Amrahia',
    tags: ['Architecture'],
    description: 'A family house planned for cross ventilation, with living areas that open onto the garden.',
    image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/9863d1245060775.69a595b0d9bca.jpg',
    behance: 'https://www.behance.net/gallery/245060775/RESIDENCE-AT-AMRAHIA',
  },
  {
    id: 'residence-oyibi',
    title: 'Residence at Oyibi',
    category: 'Residential',
    location: 'Oyibi',
    tags: ['Architecture'],
    description: 'A contemporary family house with a strongly modelled front elevation.',
    image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/fe8723245059113.69a58e53e2376.jpg',
    behance: 'https://www.behance.net/gallery/245059113/RESIDENCE-AT-OYIBI',
  },
  {
    id: 'residence-pokuase',
    title: 'Residence at Pokuase',
    category: 'Residential',
    location: 'Pokuase',
    tags: ['Architecture'],
    description: 'A compact family house that fits a full programme onto a small plot.',
    image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/9afd67245059007.69a58dd5e9e90.jpg',
    behance: 'https://www.behance.net/gallery/245059007/RESIDENCE-AT-POKUASE',
  },
  {
    id: 'diagnostic-centre',
    title: 'Diagnostic Centre',
    category: 'Healthcare',
    location: 'Swedru',
    tags: ['Architecture', 'Sound'],
    description: 'A diagnostic clinic with sound separation between consulting rooms, so conversations stay private.',
    image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/33d535245060405.69a5942e8179d.jpg',
    behance: 'https://www.behance.net/gallery/245060405/DIAGNOSTIC-CENTRE-AT-SWEDRU',
  },
  {
    id: 'bar-east-legon',
    title: 'Bar at East Legon',
    category: 'Hospitality',
    location: 'East Legon',
    tags: ['Architecture', 'Interiors'],
    description: 'A small bar interior in warm, dark materials.',
    image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/aeb9e2245063029.69a59eba17811.jpg',
    behance: 'https://www.behance.net/gallery/245059079/BAR-AT-EAST-LEGON',
  },
  {
    id: 'lab-interiors-korle-bu',
    title: 'Lab Interiors at Korle Bu',
    category: 'Healthcare',
    location: 'Korle Bu',
    tags: ['Interiors'],
    description: 'A clinical laboratory fit-out planned around equipment, workflow and easy-clean finishes.',
    image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/3b9a8e245060567.69a594e244e68.jpg',
    behance: 'https://www.behance.net/gallery/245060567/LAB-INTERIORS-AT-KORLE-BU',
  },
  {
    id: 'lab-interiors',
    title: 'Lab Interiors',
    category: 'Healthcare',
    location: 'Accra',
    tags: ['Interiors'],
    description: 'A laboratory interior arranged so staff and visitors move through it without crossing paths.',
    image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/a7102a245060825.69a595e7512ef.jpg',
    behance: 'https://www.behance.net/gallery/245060825/LAB-INTERIORS',
  },
]

/** Order of category chips on the Work page. Categories with no projects are hidden. */
export const CATEGORY_ORDER = [
  'Residential', 'Commercial', 'Hospitality', 'Healthcare',
  'Educational', 'Religious', 'Agricultural',
]

/** Discipline filters, matched against project tags. */
export const DISCIPLINE_FILTERS = ['Architecture', 'Interiors', 'Sound']

export const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Consultation',
    desc: 'A first conversation about the site, the brief, the budget and the timeline. There is no charge for this.',
  },
  {
    num: '02',
    title: 'Concept',
    desc: 'Sketches, floor plans and 3D views, plus acoustic studies where the space needs them.',
  },
  {
    num: '03',
    title: 'Design development',
    desc: 'The design is revised with you until the plans are ready for permits and pricing.',
  },
  {
    num: '04',
    title: 'Construction',
    desc: 'Construction drawings, work with the contractor and site visits through to handover.',
  },
]

/**
 * Client testimonials: { id, quote, name, role }.
 * Only add real quotes with the client's permission; the section is hidden while this is empty.
 */
export const TESTIMONIALS = []

export const MARQUEE_ITEMS = [
  'Residential', 'Commercial', 'Hospitality', 'Healthcare', 'Educational',
  'Religious', 'Agricultural', 'Acoustics', 'Interiors',
  'Accra', 'Tema', 'Kumasi', 'Sogakope',
]

export const ABOUT_TAGS = [
  { label: 'Architecture',      accent: true },
  { label: 'Sound Engineering', accent: true },
  { label: 'Interior Design',   accent: false },
  { label: 'Acoustic Design',   accent: false },
  { label: '3D Visualisation',  accent: false },
  { label: 'Site Planning',     accent: false },
]

export const CONTACT_PROJECT_TYPES = [
  'House or apartment',
  'Commercial or hospitality',
  'Interior design',
  'Healthcare facility',
  'School or church',
  'Farm building',
  'Recording studio or acoustics',
  'Renovation',
  'Other',
]
