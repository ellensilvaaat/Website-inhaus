import React from 'react';
import { motion } from 'framer-motion';
import './TrustedPartners.css';

const logos = [
  { id: 1, src: '/Blaupunkt.jpg', alt: 'Blaupunkt' },
  { id: 2, src: '/geberit.png', alt: 'Geberit' },
  { id: 3, src: '/Laminex.jpg', alt: 'Laminex' },
  { id: 4, src: '/Nikpol.webp', alt: 'Nikpol' },
  { id: 5, src: '/everstone.jpg', alt: 'Everstone' },
  { id: 6, src: '/otti.png', alt: 'Otti Australia' },
  { id: 7, src: '/nero.svg', alt: 'Nero' },
  { id: 8, src: '/caesarstone.png', alt: 'Caesarstone' },
  { id: 9, src: '/meir.png', alt: 'Meir' },
  { id: 10, src: '/Laminex.jpg', alt: 'Laminex' },
  { id: 11, src: '/nero.svg', alt: 'Nero' },
  { id: 12, src: '/Nikpol.webp', alt: 'Nikpol' },
  { id: 13, src: '/Blaupunkt.jpg', alt: 'Blaupunkt' },
  { id: 14, src: '/everstone.jpg', alt: 'Everstone' },
  { id: 15, src: '/meir.png', alt: 'Meir' }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

export default function TrustedPartners() {
  return (
    <section className="trusted-partners">
      <div className="trusted-partners__container">
        <div className="trusted-partners__text">
          <h2 className="trusted-partners__title">Our Trusted Partners</h2>
          <div className="trusted-partners__underline"></div>
          <p className="trusted-partners__description">
            We collaborate with industry‑leading suppliers and brands to ensure every project reflects the highest standards of quality and design.
          </p>
        </div>

        <motion.div
          className="trusted-partners__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {logos.map((logo, index) => (
            <motion.div
              className="trusted-partners__card"
              key={logo.id}
              variants={itemVariants}
              transition={{ delay: index * 0.2 }}
            >
              <img src={logo.src} alt={logo.alt} className="trusted-partners__logo" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

