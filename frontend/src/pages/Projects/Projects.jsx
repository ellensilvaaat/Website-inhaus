import React from 'react'
import { Helmet } from 'react-helmet-async'
import Hero from '../../components/Projects/Hero/Hero'
import ProjectsPage from '../../components/Projects/ProjectsPage/ProjectsPage'
import ReadySection from '../../components/Home/ReadySection/ReadySection'

export default function Projects() {
  return (
    <main className="projects">
      <Helmet>
        <title>Our Projects | Inhaus Living</title>
        <meta
          name="description"
          content="Explore our portfolio of stunning renovations and construction projects. Inhaus Living delivers high-quality, design-driven transformations tailored to each client."
        />
        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="Our Projects | Inhaus Living" />
        <meta
          property="og:description"
          content="Browse our recent kitchen, bathroom, and full home renovations. See how Inhaus Living turns ideas into beautifully built spaces."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://inhausliving.com.au/projects" />
        <meta
          property="og:image"
          content="https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/lisa-anna-2g6aRZE9S8s-unsplash.jpg?updatedAt=1767744534201"
        />
        <link rel="canonical" href="https://inhausliving.com.au/projects" />
      </Helmet>

      <Hero />
      <ProjectsPage />
      <ReadySection />
    </main>
  )
}
