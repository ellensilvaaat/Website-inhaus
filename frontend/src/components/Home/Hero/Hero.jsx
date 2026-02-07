import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'

const slides = [
  {
    image: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/hero1.jpg?tr=w-1600,f-webp,q-90',
    alt: 'Custom interior renovation',
    subtitle: 'From concept to completion, we design and build spaces that reflect your lifestyle, personality, and vision.',
  },
  {
    image: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/bilal-mansuri-bWfP4W8Pb9c-unsplash.jpg?tr=w-1600,f-webp,q-85',
    alt: 'Modern kitchen design',
    subtitle: 'High-performance kitchens designed for how you cook, gather, and live.',
  },
  {
    image: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/hero3.jpg?tr=w-1600,f-webp,q-85',
    alt: 'Premium custom joinery',
    subtitle: 'Custom joinery and premium finishes, tailored to your space and style.',
  },
  {
    image: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/lisa-anna-varhNULWOBE-unsplash.jpg?tr=w-1600,f-webp,q-85',
    alt: 'Spa-like bathroom renovation',
    subtitle: 'Spa-worthy bathrooms that elevate daily rituals with calm, crafted detail.',
  },
]

const AUTO_CHANGE_DELAY = 8000

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const timeoutRef = useRef(null)

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }

  useEffect(() => {
    resetTimeout()
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, AUTO_CHANGE_DELAY)
    return () => resetTimeout()
  }, [current])

  return (
    <section className="hero">
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`hero__slide ${idx === current ? 'hero__slide--active' : ''}`}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            className="hero__img"
            loading={idx === 0 ? "eager" : "lazy"}
            fetchpriority={idx === 0 ? "high" : "low"}
            decoding="async"
          />

          <div className="hero__overlay">
            <h1 className="hero__title">We Transform Houses into Homes</h1>
            <p className="hero__subtitle">{slide.subtitle}</p>
            
            <div className="h-cta-wrapper">
              <Link to="/contact" className="h-cta-main">
                Start Your Renovation Journey
                <span className="h-cta-line h-cta-line--tr"></span>
                <span className="h-cta-line h-cta-line--bl"></span>
              </Link>
            </div>
          </div>
        </div>
      ))}

      <div className="hero__arrows">
        <button className="hero__arrow hero__arrow--left" onClick={() => setCurrent(prev => prev === 0 ? slides.length - 1 : prev - 1)}>‹</button>
        <button className="hero__arrow hero__arrow--right" onClick={() => setCurrent(prev => prev === slides.length - 1 ? 0 : prev + 1)}>›</button>
      </div>

      <div className="blog__bottom-text">
        <span>Design</span>
        <span className="blog__separator">|</span>
        <span>Renovate</span>
        <span className="blog__separator">|</span>
        <span>Build</span>
      </div>
    </section>
  )
}

