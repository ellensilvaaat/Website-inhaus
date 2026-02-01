import React from 'react'
import { Helmet } from 'react-helmet-async'
import Hero from '../../components/Home/Hero/Hero'
import CardsSection from '../../components/Home/CardsSection/CardsSection'
import OurProcess from '../../components/Home/Process/Process'
import ProjectCarousel from '../../components/Home/ProjectsCarousel/ProjectsCarousel'
import FeedbackSection from '../../components/Home/FeedbackSection/FeedbackSection'
import ReadySection from '../../components/Home/ReadySection/ReadySection'
import NewsletterPopup from '../../components/NewsletterPopup/NewsletterPopup'

export default function Home() {
  return (
    <main className="home">
      <Helmet>
        <title>Inhaus Living | Design-Led Home Renovations in Australia</title>
        <meta
          name="description"
          content="Discover Inhaus Living – your trusted partner in design-led renovations and construction across Australia. Transform your home with craftsmanship and care."
        />
        <meta name="robots" content="index, follow" />
        
        <meta property="og:title" content="Inhaus Living | Design-Led Home Renovations in Australia" />
        <meta
          property="og:description"
          content="Inhaus Living offers high-quality home, kitchen, and bathroom renovations with a personalized approach. Let’s bring your vision to life."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://inhausliving.com.au" />
        <meta
          property="og:image"
          content="https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/macro-jr-jfw8TSvSMp0-unsplash.jpg"
        />
        <link rel="canonical" href="https://inhausliving.com.au" />
      </Helmet>

      <Hero />
      <CardsSection />
      <OurProcess />
      <ProjectCarousel />
      <FeedbackSection />
      <ReadySection />
      <NewsletterPopup />
    </main>
  )
}

