import React from 'react';
import Hero from '../../components/AboutUs/Hero/Hero';
import AboutUsSection from '../../components/AboutUs/AboutUsSection/AboutUsSection';
import CounterSection from '../../components/AboutUs/CounterSection/CounterSection';
import TeamCarousel from '../../components/AboutUs/TeamCarousel/TeamCarousel';
import WhyChooseUs from '../../components/AboutUs/DifferentialSection/DifferentialSection';
import TrustedPartners from '../../components/AboutUs/TrustedPartners/TrustedPartners';

export default function AboutUs() {
  return (
    <main className="about-us">
      <Hero />
      <AboutUsSection />
      <CounterSection />
      <TeamCarousel />
      <WhyChooseUs />
      <TrustedPartners />
    </main>
  );
}