import React from 'react';
import './Hero.css';

export default function Hero() {
  return (
    <section className="services-hero">
      {/* IMAGEM OTIMIZADA */}
      <div className="services-hero__image-wrapper">
        <img
          src="https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/macro-jr-jfw8TSvSMp0-unsplash.jpg"
          alt="Services Hero Background"
          className="services-hero__image"
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
      </div>

      {/* OVERLAY */}
      <div className="services-hero__overlay" />

      {/* CONTEÚDO */}
      <div className="services-hero__content">
        <h1 className="services-hero__title">Services</h1>
      </div>

      {/* TEXTO INFERIOR */}
      <div className="services__bottom-text">
        <span>Design</span>
        <span className="services__separator">|</span>
        <span>Renovate</span>
        <span className="services__separator">|</span>
        <span className="services__highlight">Build</span>
      </div>
    </section>
  );
}


