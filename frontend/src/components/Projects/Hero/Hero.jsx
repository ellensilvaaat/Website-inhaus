import React from 'react';
import './Hero.css';

export default function Hero() {
  return (
    <section className="projects-hero">
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
  );
}

