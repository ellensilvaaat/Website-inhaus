import React from 'react'
import './CardsSection.css'
import arrowIcon from '../../../assets/arrow.svg'

const cardsData = [
  {
    title: 'Home Renovations',
    description:
      'Whole-home transformations planned, built and finished under one roof.',
    image: '/card1.jpg',
  },
  {
    title: 'Apartment Renovations',
    description:
      'Clever space planning and strata-savvy builds for effortless apartment upgrades.',
    image: '/card2.jpg',
  },
  {
    title: 'Kitchen Renovations',
    description:
      'High-performance layouts, premium finishes, integrated appliances.',
    image: '/card3.jpg',
  },
  {
    title: 'Bathroom Renovations',
    description:
      'Spa-level details, quality waterproofing, lighting and fixtures.',
    image: '/card4.jpg',
  },
  {
    title: 'Flooring Services',
    description:
      'Hybrid, timber, parquetry and carpet; specified and installed.',
    image: '/card5.jpg',
  },
  {
    title: 'Construction & Additions',
    description:
      'Licensed builders for extensions, new builds and second-storey additions.',
    image: '/card6.jpg',
  },
]

export default function CardsSection() {
  return (
    <section className="cards-section">
      <div className="cards-section__header">
        <div>
          <h2 className="cards-section__title">Design–Build Quality, <br />End to End</h2>
        </div>
        <div>
          <p className="cards-section__subtitle">
            Spaces that welcome you home, delivered by a Class 3 (NCC)
            licensed team in Sydney.
          </p>
        </div>
      </div>

      <div className="cards-section__scroll">
        {cardsData.map((card, index) => (
          <div className="cards-section__card" key={index}>
            <div className="cards-section__content">
              <div className="cards-section__white-box">
                <h3 className="cards-section__card-title">{card.title}</h3>
              </div>
              <p className="cards-section__description">{card.description}</p>
              <button className="cards-section__btn">
                <img src={arrowIcon} alt="arrow" />
              </button>
            </div>
            <div
              className="cards-section__image"
              style={{ backgroundImage: `url(${card.image})` }}
            />
          </div>
        ))}
      </div>
      <button className="sardssection__cta">
              Explore Projects 
              <span className="corner corner--top-right"></span>
              <span className="corner corner--bottom-left"></span>
            </button>
    </section>
  )
}
