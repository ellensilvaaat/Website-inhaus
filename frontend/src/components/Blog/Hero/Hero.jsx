import React from 'react';
import './Hero.css';

export default function Hero() {
  return (
    <section className="blog-hero">
      <div className="blog-hero__overlay" />
      <div className="blog-hero__content">
        <h1 className="blog-hero__title">Blog</h1>
      </div>
      <div className="blog__bottom-text">
        <span>Design</span>
        <span className="blog__separator">|</span>
        <span>Renovate</span>
        <span className="blog__separator">|</span>
        <span className="blog__highlight">Build</span>
      </div>
    </section>
  );
}
