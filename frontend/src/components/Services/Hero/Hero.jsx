import React from 'react';
import './Hero.css';

const imageUrl = 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/macro-jr-jfw8TSvSMp0-unsplash.jpg?tr=w-1600,f-webp,q-80,dpr-auto';

export default function Hero() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href={imageUrl}
        fetchpriority="high"
      />

      <section className="services-hero">
        <div
          className={`services-hero__background`}
          style={{ backgroundImage: `url('${imageUrl}')` }}
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


