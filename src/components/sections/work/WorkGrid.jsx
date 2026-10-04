import ProjectCard from '@/components/ui/ProjectCard'
import Reveal from '@/components/ui/Reveal'
import styles from './WorkGrid.module.css'

/*
 * Editorial rhythm on a 12-column grid: a wide/narrow pair, a row of three,
 * then a narrow/wide pair. Aspect ratios are chosen so each row lines up.
 */
const PATTERN = [
  { span: 7, ar: '7 / 5' },
  { span: 5, ar: '1 / 1' },
  { span: 4, ar: '4 / 5' },
  { span: 4, ar: '4 / 5' },
  { span: 4, ar: '4 / 5' },
  { span: 5, ar: '1 / 1' },
  { span: 7, ar: '7 / 5' },
]

const SIZES = { 7: '(max-width: 768px) 100vw, 58vw', 5: '(max-width: 768px) 100vw, 42vw', 4: '(max-width: 768px) 100vw, 33vw' }

export default function WorkGrid({ projects }) {
  if (!projects.length) return <p className={styles.empty}>No projects in this category yet.</p>
  return (
    <div className={styles.grid}>
      {projects.map((p, i) => {
        const { span, ar } = PATTERN[i % PATTERN.length]
        return (
          <Reveal key={p.id} className={styles[`s${span}`]} delay={(i % 3) * 90}>
            <ProjectCard project={p} sizes={SIZES[span]} style={{ '--ar': ar }} />
          </Reveal>
        )
      })}
    </div>
  )
}
