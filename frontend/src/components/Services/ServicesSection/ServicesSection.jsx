import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './ServicesSection.css'

const services = [
  {
    id: 'apartments',
    title: 'Apartment Renovations',
    description:
      'At Inhaus Living, we specialize in transforming compact spaces into highly functional and stylish urban homes. Our apartment renovations are tailored to maximize space efficiency without compromising on design. From clever storage solutions to modern finishes, we bring your vision to life, all while respecting building constraints and strata requirements.',
    images: ['https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/apartment.png'],
  },
  {
    id: 'homes',
    title: 'Home Renovations',
    description:
      'Your home should evolve with your lifestyle. Our home renovations are crafted to blend comfort, functionality, and timeless aesthetics. Whether you are opening up living areas, upgrading interiors, or adding new extensions, our expert team ensures a seamless experience with minimal disruption and maximum impact.',
    images: ['https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/home.png'],
  },
  {
    id: 'kitchens',
    title: 'Kitchen Renovations',
    description:
      'The heart of the home deserves luxury. Our bespoke kitchen renovations combine premium materials with efficient layouts and custom cabinetry. From contemporary minimalism to classic elegance, we design spaces that serve and inspire.',
    images: ['https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/kitchen.png'],
  },
  {
    id: 'bathrooms',
    title: 'Bathroom Renovations',
    description:
      'Elevate your daily routine with a spa-like environment. We use high-end finishes, efficient lighting, and innovative layouts to transform even the smallest rooms into luxurious sanctuaries tailored for durability and lasting style.',
    images: ['https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/bathroom.png'],
  },
  {
    id: 'flooring',
    title: 'Flooring Services',
    description:
      'The perfect foundation for every room. We offer a curated selection of hybrid, engineered timber, parquetry, and plush carpeting. Professionally installed to set the tone for your entire home with warmth and durability.',
    images: ['https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/flooring.png'],
  },
  {
    id: 'construction',
    title: 'Construction and Additions',
    description:
      'Planning to expand? Our licensed team delivers extensions, second-storey additions, and custom new builds. We manage every phase, from permits to completion, with precision, transparency, and high standards.',
    images: ['https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/construction.png'],
  },
]

export default function ServicesSection() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    requestAnimationFrame(() => {
      const el = document.getElementById(hash.replace('#', ''))
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [hash])

  return (
    <section className="services-section" aria-label="Our Services">
      {services.map((svc) => (
        <article className="service" id={svc.id} key={svc.id}>
          <div className="service__images">
            {svc.images.map((src, i) => (
              <img
                src={`${src}?tr=w-800,f-webp`}
                alt={`Premium ${svc.title} by Inhaus Living`}
                key={i}
                className="service__img"
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
          <div className="service__content">
            <h3 className="services-section__title">
              <span className="highlight">{svc.title.split(' ')[0]}</span>{' '}
              {svc.title.split(' ').slice(1).join(' ')}
            </h3>
            <p className="services-section__description">
              {svc.description}
            </p>
          </div>
        </article>
      ))}
      <div className="services-section__cta">
        <button 
          className="services-section__button"
          aria-label="Navigate to our projects gallery"
        >
          Explore Projects
        </button>
      </div>
    </section>
  )
}