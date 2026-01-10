import React from 'react';
import './Hero.css';

export default function Hero() {
  return (
    <section className="services-hero">
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
  );
}

