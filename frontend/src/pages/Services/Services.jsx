import React from 'react'
import Hero from '../../components/Services/Hero/Hero'
import ServicesSection from '../../components/Services/ServicesSection/ServicesSection'
import HowItWorks from '../../components/Services/HowItWorks/HowItWorks'
import ReadySection from '../../components/Home/ReadySection/ReadySection'

export default function Services() {
  return (
    <main className="services">
      <Hero />
      <ServicesSection />
      <HowItWorks />
      <ReadySection />
    </main>
  )
}
