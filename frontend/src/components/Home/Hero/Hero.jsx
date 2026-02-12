import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'

const slides = [
  {
    desktop: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/le-quan-fPVWpK85oLk-unsplash.jpg?tr=w-1920,f-webp,q-90',
    mobile: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/hero1.jpg?tr=w-1080,f-webp,q-80,pr-true',
    alt: 'Custom interior renovation',
    subtitle:
      'From concept to completion, we design and build spaces that reflect your lifestyle, personality, and vision.',
  },
  {
    desktop: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/jonathan-borba-COzqEKjaxqo-unsplash.jpg?tr=w-1920,f-webp,q-85',
    mobile: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/bilal-mansuri-bWfP4W8Pb9c-unsplash.jpg?tr=w-1080,f-webp,q-80,pr-true',
    alt: 'Modern kitchen design',
    subtitle:
      'High-performance kitchens designed for how you cook, gather, and live.',
  },
  {
    desktop: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/lisa-anna-gYsjkPCsCfU-unsplash.jpg?tr=w-1920,f-webp,q-85',
    mobile: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/hero3.jpg?tr=w-1080,f-webp,q-80,pr-true',
    alt: 'Premium custom joinery',
    subtitle:
      'Custom joinery and premium finishes, tailored to your space and style.',
  },
  {
    desktop: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/lisa-anna-varhNULWOBE-unsplash.jpg?tr=w-1920,f-webp,q-85',
    mobile: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/lisa-anna-varhNULWOBE-unsplash.jpg?tr=w-1080,f-webp,q-80,pr-true',
    alt: 'Spa-like bathroom renovation',
    subtitle:
      'Spa-worthy bathrooms that elevate daily rituals with calm, crafted detail.',
  },
]

const AUTO_CHANGE_DELAY = 8000

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600)
  const timeoutRef = useRef(null)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, AUTO_CHANGE_DELAY)

    return () => clearTimeout(timeoutRef.current)
  }, [current])

  return (
    <section className="hero">
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`hero__slide ${
            idx === current ? 'hero__slide--active' : ''
          }`}
        >
          <img
            src={isMobile ? slide.mobile : slide.desktop}
            alt={slide.alt}
            className="hero__img"
            loading={idx === 0 ? 'eager' : 'lazy'}
            fetchpriority={idx === 0 ? 'high' : 'low'}
            decoding={idx === 0 ? 'sync' : 'async'}
          />

          <div className="hero__overlay">
            <h1 className="hero__title">
              We Transform Houses into Homes
            </h1>

            <p className="hero__subtitle">{slide.subtitle}</p>

            <div className="h-cta-wrapper">
              <Link to="/contact" className="h-cta-main">
                Start Your Renovation Journey
                <span className="h-cta-line h-cta-line--tr" />
                <span className="h-cta-line h-cta-line--bl" />
              </Link>
            </div>
          </div>
        </div>
      ))}

      <div className="hero__arrows">
        <button
          className="hero__arrow"
          onClick={() =>
            setCurrent((prev) =>
              prev === 0 ? slides.length - 1 : prev - 1
            )
          }
        >
          ‹
        </button>
        <button
          className="hero__arrow"
          onClick={() =>
            setCurrent((prev) =>
              prev === slides.length - 1 ? 0 : prev + 1
            )
          }
        >
          ›
        </button>
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
