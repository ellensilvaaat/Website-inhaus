import React from 'react'
import './Hero.css'

// URL Desktop Original (Mantida intacta)
const imageUrl = 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/peter-muniz-4oRw53kmhy8-unsplash.jpg?tr=w-1600,f-webp,q-80,dpr-auto'
// URL Mobile Otimizada (Apenas 600px e compressão maior)
const mobileImageUrl = 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/peter-muniz-4oRw53kmhy8-unsplash.jpg?tr=w-600,f-webp,q-60'

export default function Hero() {
  return (
    <>
      {/* Preload condicional: O navegador escolhe qual baixar antes mesmo do JS rodar */}
      <link rel="preload" as="image" href={mobileImageUrl} media="(max-width: 600px)" fetchpriority="high" />
      <link rel="preload" as="image" href={imageUrl} media="(min-width: 601px)" fetchpriority="high" />

      <section className="contact-hero">
        {/* Usamos uma variável CSS para trocar a imagem sem alterar a estrutura do Desktop */}
        <div
          className="contact-hero__background hero-bg-variable"
          style={{ '--bg-desktop': `url('${imageUrl}')`, '--bg-mobile': `url('${mobileImageUrl}')` }}
        />
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
    </>
  )
}