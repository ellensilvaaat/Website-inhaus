import React from 'react';
import './Hero.css';

// URL Desktop (1600px)
const imageUrl = 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/lisa-anna-2g6aRZE9S8s-unsplash.jpg?tr=w-1600,f-webp,q-80,dpr-auto';
// URL Mobile (600px) - Leve para performance máxima
const mobileImageUrl = 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/lisa-anna-2g6aRZE9S8s-unsplash.jpg?tr=w-600,f-webp,q-60';

export default function Hero() {
  return (
    <>
      {/* Preload condicional para evitar atraso no carregamento da Hero */}
      <link rel="preload" as="image" href={mobileImageUrl} media="(max-width: 500px)" fetchpriority="high" />
      <link rel="preload" as="image" href={imageUrl} media="(min-width: 501px)" fetchpriority="high" />

      <section className="projects-hero">
        <div
          className="projects-hero__background"
          style={{ 
            '--bg-desktop': `url('${imageUrl}')`, 
            '--bg-mobile': `url('${mobileImageUrl}')` 
          }}
        />

        <div className="projects-hero__overlay" />

        <div className="projects-hero__content">
          <h1 className="projects-hero__title">Projects</h1>
        </div>

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

