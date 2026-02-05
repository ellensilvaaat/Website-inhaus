import React from 'react';
import './Hero.css';

// URL Desktop (1600px)
const imageUrl = 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/michael-alake-Ys1Yo1kxxCE-unsplash.jpg?tr=w-1600,f-webp,q-80,dpr-auto';
// URL Mobile (600px) - Leve e rápida
const mobileImageUrl = 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/michael-alake-Ys1Yo1kxxCE-unsplash.jpg?tr=w-600,f-webp,q-60';

export default function AboutHero() {
  return (
    <>
      {/* Preload inteligente para priorizar a imagem correta */}
      <link rel="preload" as="image" href={mobileImageUrl} media="(max-width: 501px)" fetchpriority="high" />
      <link rel="preload" as="image" href={imageUrl} media="(min-width: 502px)" fetchpriority="high" />

      <section className="about-hero">
        <div
          className="about-hero__background"
          style={{ 
            '--bg-desktop': `url('${imageUrl}')`, 
            '--bg-mobile': `url('${mobileImageUrl}')` 
          }}
        />
        <div className="about-hero__overlay" />
        <div className="about-hero__content">
          <h1 className="about-hero__title">About Us</h1>
        </div>
        <div className="blog__bottom-text">
          <span>Design</span>
          <span className="blog__separator">|</span>
          <span>Renovate</span>
          <span className="blog__separator">|</span>
          <span>Build</span>
        </div>
      </section>
    </>
  );
}