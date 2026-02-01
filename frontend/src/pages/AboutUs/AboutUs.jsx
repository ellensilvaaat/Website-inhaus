import React from 'react'
import { Helmet } from 'react-helmet-async'
import Hero from '../../components/AboutUs/Hero/Hero'
import AboutUsSection from '../../components/AboutUs/AboutUsSection/AboutUsSection'
import CounterSection from '../../components/AboutUs/CounterSection/CounterSection'
import TeamCarousel from '../../components/AboutUs/TeamCarousel/TeamCarousel'
import WhyChooseUs from '../../components/AboutUs/DifferentialSection/DifferentialSection'
import TrustedPartners from '../../components/AboutUs/TrustedPartners/TrustedPartners'

export default function AboutUs() {
  return (
    <main className="about-us">
      <Helmet>
        <title>About Us | Inhaus Living</title>
        <meta
          name="description"
          content="Learn more about Inhaus Living. With over 20 years of experience, we transform houses into homes through design-led renovations, craftsmanship, and trusted partnerships."
        />
        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="About Us | Inhaus Living" />
        <meta
          property="og:description"
          content="Discover the story behind Inhaus Living and our design-led approach to home renovations."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://inhausliving.com.au/about" />
        <meta
          property="og:image"
          content="https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/michael-alake-Ys1Yo1kxxCE-unsplash.jpg"
        />

        <link rel="canonical" href="https://inhausliving.com.au/about" />
      </Helmet>

      <Hero />
      <AboutUsSection />
      <CounterSection />
      <TeamCarousel />
      <WhyChooseUs />
      <TrustedPartners />
    </main>
  )
}

