import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'

const slides = [
  {
    image: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/hero1.jpg?updatedAt=1767743464607',
    subtitle:
      'From concept to completion, we design and build spaces that reflect your lifestyle, personality, and vision.',
  },
  {
    image: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/bilal-mansuri-bWfP4W8Pb9c-unsplash.jpg?updatedAt=1767842591758',
    subtitle:
      'High-performance kitchens designed for how you cook, gather, and live.',
  },
  {
    image: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/hero3.jpg?updatedAt=1767743420365',
    subtitle:
      'Custom joinery and premium finishes, tailored to your space and style.',
  },
  {
    image: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/lisa-anna-varhNULWOBE-unsplash.jpg',
    subtitle:
      'Spa-worthy bathrooms that elevate daily rituals with calm, crafted detail.',
  },
]

const AUTO_CHANGE_DELAY = 8000

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const timeoutRef = useRef(null)

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  useEffect(() => {
    resetTimeout()
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, AUTO_CHANGE_DELAY)

    return () => resetTimeout()
  }, [current])

  const prevSlide = () => {
    resetTimeout()
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const nextSlide = () => {
    resetTimeout()
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className="hero">
      {slides.map((slide, idx) => (
  <div
    key={idx}
    className={`hero__slide ${
      idx === current ? 'hero__slide--active' : ''
    }`}
  >
    <div className="hero__image-wrapper">
      <img
        src={slide.image}
        alt={`Hero Slide ${idx + 1}`}
        className="hero__background-image"
        loading={idx === 0 ? 'eager' : 'lazy'}
        fetchpriority={idx === 0 ? 'high' : 'auto'}
        decoding="async"
      />
    </div>

    <div className="hero__overlay">
      <h1 className="hero__title">We Transform Houses into Homes</h1>
      <p className="hero__subtitle">{slide.subtitle}</p>

      <Link to="/contact" className="hero__cta">
        Start Your Renovation Journey
        <span className="corner corner--top-right"></span>
        <span className="corner corner--bottom-left"></span>
      </Link>
    </div>
  </div>
))}
      <div className="hero__arrows">
        <button
          className="hero__arrow hero__arrow--left"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          className="hero__arrow hero__arrow--right"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          ›
        </button>
      </div>

      <div className="hero__bottom-text">
        <span>Design</span>
        <span className="hero__separator">|</span>
        <span>Renovate</span>
        <span className="hero__separator">|</span>
        <span className="hero__highlight">Build</span>
      </div>
    </section>
  )
}

