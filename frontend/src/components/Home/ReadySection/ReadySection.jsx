import React from 'react'
import { Link } from 'react-router-dom'
import './ReadySection.css'

export default function ReadySection() {
  return (
    <section className="ready-section">
      <div className="ready-section__inner">
        <h2 className="ready-section__title">Ready to begin?</h2>

        <p className="ready-section__text">
          Design that starts with how you live.
          We take the time to understand what matters most to you, guiding your project from early concepts through to a refined, well-executed outcome. Our Class 2 (NCC) licensed team brings design, documentation and build together under one clear process, supported by transparent scopes, realistic timelines and carefully selected finishes available to view in our showrooms.
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

