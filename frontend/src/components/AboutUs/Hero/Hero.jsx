import React from 'react';
import './Hero.css';

export default function Hero() {
  return (
    <section className="about-hero">
      <div className="about-hero__overlay">
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
  );
}
