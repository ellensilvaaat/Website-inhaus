import React from 'react';
import './Hero.css';

const desktopUrl = 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/prydumano-design-vXMbcO1mRBY-unsplash.jpg?tr=w-1600,f-webp,q-80';
const mobileUrl = 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/prydumano-design-vXMbcO1mRBY-unsplash.jpg?tr=w-800,f-webp,q-70';

export default function Hero() {
  return (
    <section className="blog-hero">
      {/* Preload invisível para o navegador não perder tempo */}
      <picture style={{ display: 'none' }}>
        <source media="(max-width: 600px)" srcSet={mobileUrl} />
        <img src={desktopUrl} alt="preload" />
      </picture>

      <div className="blog-hero__background-container">
        <div
          className="blog-hero__background"
          style={{ '--bg-desktop': `url(${desktopUrl})`, '--bg-mobile': `url(${mobileUrl})` }}
        />
      </div>

      {/* ✅ O Overlay (deixa a imagem escura para o texto brilhar) */}
      <div className="blog-hero__overlay" />

      {/* ✅ Conteúdo Central (Título) */}
      <div className="blog-hero__content">
        <h1 className="blog-hero__title">Blog</h1>
      </div>

      {/* Texto de baixo */}
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