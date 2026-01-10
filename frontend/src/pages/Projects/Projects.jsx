import React from 'react'
import Hero from '../../components/Projects/Hero/Hero'
import ProjectsPage from '../../components/Projects/ProjectsPage/ProjectsPage'
import ReadySection from '../../components/Home/ReadySection/ReadySection'

export default function Services() {
  return (
    <main className="services">
      <Hero />
      <ProjectsPage />
      <ReadySection />
    </main>
  )
}
