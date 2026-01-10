import React from 'react'
import { Link } from 'react-router-dom'
import './ReadySection.css'

export default function ReadySection() {
  return (
    <section className="ready-section">
      <div className="ready-section__inner">
        <h2 className="ready-section__title">Ready to begin?</h2>

        <p className="ready-section__text">
          Affordable luxury, thoughtfully built. Tell us how you live and what
          matters most, we’ll guide you from first ideas to a finish that feels
          unmistakably yours. Our Class 2 (NCC) licensed team aligns design,
          documentation, and build with transparent scope, realistic timelines,
          and selections you can see and touch in our showrooms.
        </p>

        <div className="bntt">
          <Link to="/contact" className="projects__cta">
            Request a Proposal
            <span className="corner corner--top-right"></span>
            <span className="corner corner--bottom-left"></span>
          </Link>
        </div>
      </div>
    </section>
  )
}

