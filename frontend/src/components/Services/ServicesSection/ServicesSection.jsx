import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './ServicesSection.css'

const services = [
  {
    id: 'apartments',
    title: 'Apartment Renovations',
    description:
      'Inhaus Living are dedicated to providing quality apartment renovations at affordable prices. Our experienced team work hard at keeping the costs down, so that you can get the most out of your budget.',
    images: ['https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/apartment.png'],
  },
  {
    id: 'homes',
    title: 'Home Renovations',
    description:
      'Inhaus Living are dedicated to providing quality home renovations planned and delivered with clarity, craftsmanship and care.',
    images: ['https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/home.png'],
  },
  {
    id: 'kitchens',
    title: 'Kitchen Renovations',
    description:
      'High-performance kitchens designed with a balance of luxury, function and longevity.',
    images: ['https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/kitchen.png'],
  },
  {
    id: 'bathrooms',
    title: 'Bathroom Renovations',
    description:
      'Bespoke bathroom renovations crafted with premium finishes, lighting and detailing.',
    images: ['https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/bathroom.png'],
  },
  {
    id: 'flooring',
    title: 'Flooring Services',
    description:
      'Hybrid, timber, parquetry and carpet flooring solutions, supplied and installed.',
    images: ['https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/flooring.png'],
  },
  {
    id: 'construction',
    title: 'Construction and Additions',
    description:
      'Licensed builders delivering extensions, new builds and second-storey additions.',
    images: ['https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/construction.png'],
  },
]

export default function ServicesSection() {
  const { hash } = useLocation()

  // 🔥 SCROLL CORRETO PARA ÂNCORA
  useEffect(() => {
    if (!hash) return

    const id = hash.replace('#', '')
    const el = document.getElementById(id)

    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }, [hash])

  return (
    <section className="services-section">
      {services.map((svc) => (
        <div className="service" id={svc.id} key={svc.id}>
          <div className="service__images">
            {svc.images.map((src, i) => (
              <img
                src={src}
                alt={svc.title}
                key={i}
                className="service__img"
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
        </div>
      ))}

      <div className="services-section__cta">
        <button className="services-section__button">
          Explore Projects
        </button>
      </div>
    </section>
  )
}


