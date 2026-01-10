import React from 'react';
import './Hero.css';

export default function Hero() {
  return (
    <section className="contact-hero">
      <div className="contact-hero__overlay" />
      <div className="contact-hero__content">
        <h1 className="contact-hero__title">Contact Us</h1>
      </div>
      <div className="contact__bottom-text">
        <span>Design</span>
        <span className="contact__separator">|</span>
        <span>Renovate</span>
        <span className="contact__separator">|</span>
        <span className="contact__highlight">Build</span>
      </div>
    </section>
  );
}
