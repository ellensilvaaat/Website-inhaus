import React from 'react'
import './Hero.css'

const imageUrl = 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/peter-muniz-4oRw53kmhy8-unsplash.jpg?tr=w-1600,f-webp,q-80,dpr-auto'

export default function Hero() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href={imageUrl}
        fetchpriority="high"
      />

      <section className="contact-hero">
        <div
          className="contact-hero__background"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        />
        <div className="contact-hero__overlay" />
        <div className="contact-hero__content">
          <h1 className="contact-hero__title">Contact Us</h1>
        </div>
        <div className="contact__bottom-text">
          <span>Design</span>
          <span className="contact__separator">|</span>
          <span>Renovate</span>
          <span className="contact__separator">|</span>
          <span className="contact__highlight">Build</span>
        </div>
      </section>
    </>
  )
}