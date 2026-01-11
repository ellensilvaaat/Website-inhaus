import React from 'react';
import './Hero.css';

export default function Hero() {
  return (
    <section className="about-hero">
      <div className="about-hero__image-wrapper">
        <img
          src="https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/michael-alake-Ys1Yo1kxxCE-unsplash.jpg"
          alt="Modern renovation background"
          className="about-hero__image"
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
      </div>

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
  );
}
