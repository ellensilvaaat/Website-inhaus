import React from 'react';
import './Hero.css';

// ✅ URL otimizada: WebP + Compressão + Auto-DPR
const imageUrl = 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/prydumano-design-vXMbcO1mRBY-unsplash.jpg?tr=w-1600,f-webp,q-80,dpr-auto';

export default function Hero() {
  return (
    <>
      {/* ✅ Preload de alta prioridade para o navegador baixar antes de renderizar o JS */}
      <link
        rel="preload"
        as="image"
        href={imageUrl}
        fetchpriority="high"
      />

      <section className="blog-hero">
        <div
          className="blog-hero__background"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        />

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
    </>
  );
}
