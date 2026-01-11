import React from 'react';
import './Hero.css';

export default function Hero() {
  return (
    <section className="contact-hero">
      {/* IMAGEM OTIMIZADA */}
      <div className="contact-hero__image-wrapper">
        <img
          src="https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/peter-muniz-4oRw53kmhy8-unsplash.jpg"
          alt="Contact Hero Background"
          className="contact-hero__image"
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
      </div>

      {/* OVERLAY */}
      <div className="contact-hero__overlay" />

      {/* CONTEÚDO */}
      <div className="contact-hero__content">
        <h1 className="contact-hero__title">Contact Us</h1>
      </div>

      {/* TEXTO INFERIOR */}
      <div className="contact__bottom-text">
        <span>Design</span>
        <span className="contact__separator">|</span>
        <span>Renovate</span>
        <span className="contact__separator">|</span>
        <span className="contact__highlight">Build</span>
      </div>
    </section>
  );
}
