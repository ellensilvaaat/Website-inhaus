import React from 'react';
import './Hero.css';

const imageUrl = 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/prydumano-design-vXMbcO1mRBY-unsplash.jpg';

export default function Hero() {
  return (
    <>
      {/* Preload da imagem */}
      <link
        rel="preload"
        as="image"
        href={imageUrl}
        fetchpriority="high"
      />

      <section className="blog-hero">
        {/* Fundo com zoom */}
        <div
          className="blog-hero__background"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        />

        {/* Overlay */}
        <div className="blog-hero__overlay" />

        {/* Conteúdo */}
        <div className="blog-hero__content">
          <h1 className="blog-hero__title">Blog</h1>
        </div>

        {/* Texto inferior */}
        <div className="blog__bottom-text">
          <span>Design</span>
          <span className="blog__separator">|</span>
          <span>Renovate</span>
          <span className="blog__separator">|</span>
          <span className="blog__highlight">Build</span>
        </div>
      </section>
    </>
  );
}
