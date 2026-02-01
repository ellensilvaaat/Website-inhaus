import React from 'react'
import { Helmet } from 'react-helmet-async'
import Hero from '../../components/Services/Hero/Hero'
import ServicesSection from '../../components/Services/ServicesSection/ServicesSection'
import HowItWorks from '../../components/Services/HowItWorks/HowItWorks'
import ReadySection from '../../components/Home/ReadySection/ReadySection'

export default function Services() {
  return (
    <main className="services">
      <Helmet>
        <title>Services | Inhaus Living</title>
        <meta
          name="description"
          content="Explore our full range of renovation and construction services, including kitchens, bathrooms, flooring, and custom home additions. Discover how Inhaus Living brings your vision to life."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Services | Inhaus Living" />
        <meta
          property="og:description"
          content="Discover premium home renovation and construction services tailored to your lifestyle. From kitchens to full home transformations."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://inhausliving.com.au/services" />
        <meta property="og:image" content="https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/macro-jr-jfw8TSvSMp0-unsplash.jpg" />
        <link rel="canonical" href="https://inhausliving.com.au/services" />
      </Helmet>

      <Hero />
      <ServicesSection />
      <HowItWorks />
      <ReadySection />
    </main>
  )
}
