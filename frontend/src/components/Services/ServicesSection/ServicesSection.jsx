import React from 'react';
import './ServicesSection.css';

const services = [
  {
    id: 1,
    title: 'Apartment Renovations',
    description:
      'Inhaus Living are dedicated to providing quality apartment renovations at affordable prices. Our experienced team work hard at keeping the costs down, so that you can get the most out of your budget. In turn providing you with a breathtaking apartment renovation, with all the storage and functionality it deserves.',
    images: ['/apartment.png'],
  },
  {
    id: 2,
    title: 'Home Renovations',
    description:
      'Inhaus Living are dedicated to providing quality apartment renovations at affordable prices. Our experienced team work hard at keeping the costs down, so that you can get the most out of your budget. In turn providing you with a breathtaking apartment renovation, with all the storage and functionality it deserves.',
    images: ['/home.png'],
  },
  {
    id: 3,
    title: 'Kitchen Renovations',
    description:
      'Inhaus Living is committed to providing you with the very best kitchen renovation experience possible. We design our kitchen with a sense of luxury and function that will last for years to come. We offer leading European fixtures and fittings to provide you with products that are built for a lifetime of high-quality use.',
    images: ['/kitchen.png'],
  },
  {
    id: 4,
    title: 'Bathroom Renovations',
    description:
      'At Inhaus Living, we redefine luxury through exceptional craftsmanship and innovative design. Specialising in bespoke bathroom renovations, we bring your vision to life with unmatched elegance and functionality.',
    images: ['/bathroom.png'],
  },
  {
    id: 5,
    title: 'Flooring Services',
    description:
      'Inhaus Living offers a wide range of flooring services in Sydney like Hybrid Flooring, Timber Flooring, Parquetry, and Carpet. We understand that each home has its own unique style and aesthetic, which is why we offer customised solutions to suit your needs.',
    images: ['/flooring.png'],
  },
  {
    id: 6,
    title: 'Construction and Additions',
    description:
      'Inhaus Living is an innovative Sydney-based Design and Construct Building Company, offering a stress-free turnkey solution. As licensed builders we can design and build your new dream home, extend your current home, and even add another floor to your existing home.',
    images: ['/construction.png'],
  },
];

export default function ServicesSection() {
  return (
    <section className="services-section">
      {services.map((svc) => (
        <div className="service" key={svc.id}>
          <div className="service__images">
            {svc.images.map((src, i) => (
              <img src={src} alt={svc.title} key={i} className="service__img" />
            ))}
          </div>
          <div className="service__content">
            <h3 className="services-section__title">
              <span className="highlight">{svc.title.split(' ')[0]}</span>{' '}
              {svc.title.split(' ').slice(1).join(' ')}
            </h3>
            <p className="services-section__description">{svc.description}</p>
          </div>
        </div>
      ))}
      <div className="services-section__cta">
        <button className="services-section__button">Explore Projects</button>
      </div>
    </section>
  );
}
