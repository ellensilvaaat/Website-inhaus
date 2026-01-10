import React from 'react'
import { Link } from 'react-router-dom'
import './AboutUsSection.css'

export default function AboutUsSection() {
  return (
    <section className="aboutus-section-wrapper">
      <img
        src="https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/about-us-bg.png?updatedAt=1767743415356"
        alt="Modern house sketch"
        className="aboutus-bg-image"
      />

      <div className="aboutus-section-content">
        <h2 className="aboutus-heading">
          Over <em>20 Years of Transforming Spaces</em>
        </h2>
        <p className="aboutus-subheading">into Lasting Legacies.</p>

        <div className="aboutus-mission-vision">
          <div className="aboutus-block">
            <h3>Mission</h3>
            <p>
              At <span className="highlight-orange">Inhaus Living</span>, we believe a home is more than just walls and a roof; it’s where life truly happens.
            </p>
            <p>
              For years, we’ve specialized in <span className="highlight-orange">transforming houses into unique homes</span> that reflect personality, comfort, and timeless design.
            </p>
          </div>

          <div className="aboutus-block">
            <h3>Vision</h3>
            <p>
              <span className="highlight-orange">Our mission</span> is to create spaces that inspire, connect, and tell stories: <span className="highlight-orange">your story.</span>
            </p>
            <p>
              Every project we design is built around the people who will live in it, making sure each detail reflects their lifestyle and aspirations.
            </p>
          </div>
        </div>

        <div className="aboutus-button">
          <Link to="/services#process">
            <button>Explore our process</button>
          </Link>
        </div>
      </div>
    </section>
  )
}

