import React, { useState, useEffect, useRef } from 'react'
import './Hero.css'

const slides = [
  {
    image: '/hero1.jpg',
    subtitle:
      'From concept to completion, we design and build spaces that reflect your lifestyle, personality, and vision.',
  },
  {
    image: '/hero2.jpg',
    subtitle:
      'High-performance kitchens designed for how you cook, gather, and live.',
  },
  {
    image: '/hero3.jpg',
    subtitle:
      'Custom joinery and premium finishes, tailored to your space and style.',
  },
  {
    image: '/hero4.jpg',
    subtitle:
      'Spa-worthy bathrooms that elevate daily rituals with calm, crafted detail.',
  },
]

const AUTO_CHANGE_DELAY = 8000  // mais lento

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

    return () => {
      resetTimeout()
    }
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
          className={`hero__slide ${idx === current ? 'hero__slide--active' : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="hero__overlay">
            <h1 className="hero__title">We Transform Houses into Homes</h1>
            <p className="hero__subtitle">{slide.subtitle}</p>
            <button className="hero__cta">
              Start Your Renovation Journey
              <span className="corner corner--top-right"></span>
              <span className="corner corner--bottom-left"></span>
            </button>
          </div>
        </div>
      ))}
      <div className="hero__arrows">
        <button className="hero__arrow hero__arrow--left" onClick={prevSlide}>
          ‹
        </button>
        <button className="hero__arrow hero__arrow--right" onClick={nextSlide}>
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
