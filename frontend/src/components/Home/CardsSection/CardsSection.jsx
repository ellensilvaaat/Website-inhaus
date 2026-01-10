import React from 'react'
import { Link } from 'react-router-dom'
import './CardsSection.css'
import arrowIcon from '../../../assets/arrow.svg'

const cardsData = [
  {
    title: 'Home Renovations',
    description:
      'Whole-home transformations planned, built and finished under one roof.',
    image: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/card1.jpg',
    anchor: 'homes',
  },
  {
    title: 'Apartment Renovations',
    description:
      'Clever space planning and strata-savvy builds for effortless apartment upgrades.',
    image: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/elena-popova-NYIDN7fBfkI-unsplash.jpg',
    anchor: 'apartments',
  },
  {
    title: 'Kitchen Renovations',
    description:
      'High-performance layouts, premium finishes, integrated appliances.',
    image: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/lisa-anna-2g6aRZE9S8s-unsplash.jpg',
    anchor: 'kitchens',
  },
  {
    title: 'Bathroom Renovations',
    description:
      'Spa-level details, quality waterproofing, lighting and fixtures.',
    image: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/card4.jpg',
    anchor: 'bathrooms',
  },
  {
    title: 'Flooring Services',
    description:
      'Hybrid, timber, parquetry and carpet; specified and installed.',
    image: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/card5.jpg',
    anchor: 'flooring',
  },
  {
    title: 'Construction & Additions',
    description:
      'Licensed builders for extensions, new builds and second-storey additions.',
    image: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/card6.jpg',
    anchor: 'construction',
  },
]

export default function CardsSection() {
  return (
    <section className="cards-section">
      <div className="cards-section__header">
        <h2 className="cards-section__title">
          Design–Build Quality, <br />End to End
        </h2>

        <p className="cards-section__subtitle">
          Spaces that welcome you home, delivered by a Class 2 (NCC)
          licensed team in Sydney.
        </p>
      </div>

      <div className="cards-section__scroll">
        {cardsData.map((card, index) => (
          <div className="cards-section__card" key={index}>
            <div className="cards-section__content">
              <div className="cards-section__white-box">
                <h3 className="cards-section__card-title">
                  {card.title}
                </h3>
              </div>

              <p className="cards-section__description">
                {card.description}
              </p>

              <Link
                to={`/services#${card.anchor}`}
                className="cards-section__btn"
              >
                <img src={arrowIcon} alt="arrow" />
              </Link>
            </div>

            <div
              className="cards-section__image"
              style={{ backgroundImage: `url(${card.image})` }}
            />
          </div>
        ))}
      </div>

      <Link to="/projects" className="sardssection__cta">
        Explore Projects
        <span className="corner corner--top-right"></span>
        <span className="corner corner--bottom-left"></span>
      </Link>
    </section>
  )
}
