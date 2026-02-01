import React from 'react';
import './Hero.css';

const imageUrl = 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/michael-alake-Ys1Yo1kxxCE-unsplash.jpg?tr=w-1600,h-1200,fo-center,auto-format,pr-true';

export default function Hero() {
  return (
    <>
      {/* Preload da imagem otimizada */}
      <link
        rel="preload"
        as="image"
        href={imageUrl}
        fetchpriority="high"
        type="image/webp"
      />

      <section className="about-hero">
        <div
          className="about-hero__background"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        />

        <div className="about-hero__overlay" />

        <div className="about-hero__content">
          <h1 className="about-hero__title">About Us</h1>
        </div>

        <div className="hero__bottom-text">
          <span>Design</span>
          <span className="hero__separator">|</span>
          <span>Renovate</span>
          <span className="hero__separator">|</span>
          <span className="hero__highlight">Build</span>
        </div>
      </section>
    </>
  );
}

