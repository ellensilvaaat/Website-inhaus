import React from 'react';
import { motion } from 'framer-motion';
import './TrustedPartners.css';

const logos = [
  { id: 1, src: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/otti.png?updatedAt=1767743408425', alt: 'Blaupunkt' },
  { id: 2, src: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/geberit.png?updatedAt=1767743403761', alt: 'Geberit' },
  { id: 3, src: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/Laminex.jpg?updatedAt=1767743405062', alt: 'Laminex' },
  { id: 4, src: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/Nikpol.webp?updatedAt=1767743403969', alt: 'Nikpol' },
  { id: 5, src: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/everstone.jpg?updatedAt=1767743403547', alt: 'Everstone' },
  { id: 6, src: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/otti.png?updatedAt=1767743408425', alt: 'Otti Australia' },
  { id: 7, src: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/nero.svg?updatedAt=1767743403454', alt: 'Nero' },
  { id: 8, src: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/caesarstone.png?updatedAt=1767743404236', alt: 'Caesarstone' },
  { id: 9, src: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/meir.png?updatedAt=1767743404270', alt: 'Meir' },
  { id: 10, src: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/Laminex.jpg?updatedAt=1767743405062', alt: 'Laminex' },
  { id: 11, src: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/nero.svg?updatedAt=1767743403454', alt: 'Nero' },
  { id: 12, src: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/Nikpol.webp?updatedAt=1767743403969', alt: 'Nikpol' },
  { id: 13, src: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/otti.png?updatedAt=1767743408425', alt: 'Blaupunkt' },
  { id: 14, src: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/everstone.jpg?updatedAt=1767743403547', alt: 'Everstone' },
  { id: 15, src: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/meir.png?updatedAt=1767743404270', alt: 'Meir' }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
};

export default function TrustedPartners() {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 501;

  const displayedLogos = isMobile ? logos.slice(0, 14) : logos;

  return (
    <section className="trusted-partners">
      <div className="trusted-partners__container">

        <div className="trusted-partners__text">
          <h2 className="trusted-partners__title">Our Trusted Partners</h2>
          <div className="trusted-partners__underline"></div>

          <p className="trusted-partners__description">
            We collaborate with industry-leading suppliers and brands to ensure every project reflects the highest standards of quality and design.
          </p>
        </div>

        <motion.div
          className="trusted-partners__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {displayedLogos.map((logo, index) => (
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


