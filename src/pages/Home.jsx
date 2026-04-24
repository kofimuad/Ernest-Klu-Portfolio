import Hero            from '@/components/sections/home/Hero'
import Marquee         from '@/components/sections/home/Marquee'
import Services        from '@/components/sections/home/Services'
import FeaturedProjects from '@/components/sections/home/FeaturedProjects'
import ProjectStrip    from '@/components/sections/home/ProjectStrip'
import QuoteRow        from '@/components/sections/home/QuoteRow'
import TrustBar        from '@/components/sections/home/TrustBar'
import Process         from '@/components/sections/home/Process'
import Testimonials    from '@/components/sections/home/Testimonials'
import FullbleedCTA    from '@/components/sections/home/FullbleedCTA'
import Footer          from '@/components/layout/Footer'

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <FeaturedProjects />
      <ProjectStrip />
      <QuoteRow />
      <TrustBar />
      <Process />
      <Testimonials />
      <FullbleedCTA />
      <Footer />
    </>
  )
}
