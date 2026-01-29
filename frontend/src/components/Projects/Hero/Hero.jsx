import React from 'react';
import './Hero.css';

const imageUrl = 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/lisa-anna-2g6aRZE9S8s-unsplash.jpg?updatedAt=1767744534201';

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

      <section className="projects-hero">
        {/* Fundo com zoom */}
        <div
          className="projects-hero__background"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        />

        {/* Overlay escura */}
        <div className="projects-hero__overlay" />

        {/* Conteúdo */}
        <div className="projects-hero__content">
          <h1 className="projects-hero__title">Projects</h1>
        </div>

        {/* Texto inferior */}
        <div className="projects__bottom-text">
          <span>Design</span>
          <span className="projects__separator">|</span>
          <span>Renovate</span>
          <span className="projects__separator">|</span>
          <span className="projects__highlight">Build</span>
        </div>
      </section>
    </>
  );
}


