import React from 'react'
import Hero from '../../components/Home/Hero/Hero'
import CardsSection from '../../components/Home/CardsSection/CardsSection'
import OurProcess from '../../components/Home/Process/Process'
import ProjectCarouse from '../../components/Home/ProjectsCarousel/ProjectsCarousel'
import FeedbackSection from '../../components/Home/FeedbackSection/FeedbackSection'
import ReadySection from '../../components/Home/ReadySection/ReadySection'
import NewsletterPopup from '../../components/NewsletterPopup/NewsletterPopup'
export default function Home() {
  return (
    <main className="home">
      <Hero />
      <CardsSection />
      <OurProcess />
      <ProjectCarouse />
      <FeedbackSection />
      <ReadySection />
      <NewsletterPopup />
    </main>
  )
}
