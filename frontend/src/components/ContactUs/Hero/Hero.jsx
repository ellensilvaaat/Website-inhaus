import React from 'react';
import './Hero.css';

const imageUrl = 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/peter-muniz-4oRw53kmhy8-unsplash.jpg';

export default function Hero() {
  return (
    <>
      {/* Preload otimizado */}
      <link
        rel="preload"
        as="image"
        href={imageUrl}
        fetchpriority="high"
      />

      <section className="contact-hero">
        {/* Fundo com zoom */}
        <div
          className="contact-hero__background"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        />

        {/* Overlay escura */}
        <div className="contact-hero__overlay" />

        {/* Conteúdo */}
        <div className="contact-hero__content">
          <h1 className="contact-hero__title">Contact Us</h1>
        </div>

        {/* Texto inferior */}
        <div className="contact__bottom-text">
          <span>Design</span>
          <span className="contact__separator">|</span>
          <span>Renovate</span>
          <span className="contact__separator">|</span>
          <span className="contact__highlight">Build</span>
        </div>
      </section>
    </>
  );
}

