import React from 'react';
import './Hero.css';

export default function Hero() {
  return (
    <section className="projects-hero">
      {/* IMAGEM OTIMIZADA */}
      <div className="projects-hero__image-wrapper">
        <img
          src="https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/lisa-anna-2g6aRZE9S8s-unsplash.jpg?updatedAt=1767744534201"
          alt="Projects Hero Background"
          className="projects-hero__image"
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
      </div>

      {/* OVERLAY */}
      <div className="projects-hero__overlay" />

      {/* CONTEÚDO */}
      <div className="projects-hero__content">
        <h1 className="projects-hero__title">Projects</h1>
      </div>

      {/* TEXTO INFERIOR */}
      <div className="projects__bottom-text">
        <span>Design</span>
        <span className="projects__separator">|</span>
        <span>Renovate</span>
        <span className="projects__separator">|</span>
        <span className="projects__highlight">Build</span>
      </div>
    </section>
  );
}

