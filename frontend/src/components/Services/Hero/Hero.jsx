import React from 'react';
import './Hero.css';

// Versão ultra-leve para pintura imediata
// O segredo aqui é o dpr-2 para telas de alta resolução (Retina)
const mobileImageUrl = 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/macro-jr-jfw8TSvSMp0-unsplash.jpg?tr=w-800,q-80,f-webp';
const imageUrl = 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/macro-jr-jfw8TSvSMp0-unsplash.jpg?tr=w-1600,q-80,f-webp';

export default function Hero() {
  return (
    <>
      <style>
        {`
          .services-hero { background: #1a1a1a; }
          .services-hero__background { will-change: transform, opacity; }
        `}
      </style>
      
      <link rel="preload" as="image" href={mobileImageUrl} media="(max-width: 500px)" fetchpriority="high" />

      <section className="services-hero">
        <div
          className="services-hero__background"
          style={{ 
            '--bg-desktop': `url('${imageUrl}')`, 
            '--bg-mobile': `url('${mobileImageUrl}')` 
          }}
        />
        <div className="services-hero__overlay" />
        <div className="services-hero__content">
          <h1 className="services-hero__title">Services</h1>
        </div>

        <div className="services__bottom-text">
          <span>Design</span>
          <span className="services__separator">|</span>
          <span>Renovate</span>
          <span className="services__separator">|</span>
          <span className="services__highlight">Build</span>
        </div>
      </section>
    </>
  );
}


