import React from 'react';
import './DifferentialSection.css';
import { Link } from 'react-router-dom';

export default function WhyChooseUs() {
  return (
    <section className="why‑choose‑us">
      <h2 className="why‑choose‑us__title">Why choose us?</h2>
      <div className="why‑choose‑us__underline"></div>

      <div className="why‑choose‑us__content">
        {/* Left column */}
        <div className="why‑choose‑us__column why‑choose‑us__column--left">
          <div className="why‑choose‑us__item">
            <span className="why‑choose‑us__number">01</span>
            <h3 className="why‑choose‑us__heading">One team, <strong>end‑to‑end</strong></h3>
            <p className="why‑choose‑us__text">Design, selections, approvals, build, and handover under one roof.</p>
          </div>
          <div className="why‑choose‑us__item">
            <span className="why‑choose‑us__number">02</span>
            <h3 className="why‑choose‑us__heading">Dedicated project <strong>management</strong></h3>
            <p className="why‑choose‑us__text">A single point of contact coordinating schedule, budget, and trades.</p>
          </div>
        </div>

        {/* Center image */}
        <div className="why‑choose‑us__image‑wrapper">
          <img
            src="https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/why_choose_us_house.png?updatedAt=1767743409864"
            alt="Modern house illustration"
            className="why‑choose‑us__image"
          />
        </div>

        {/* Right column */}
        <div className="why‑choose‑us__column why‑choose‑us__column--right">
          <div className="why‑choose‑us__item">
            <span className="why‑choose‑us__number">03</span>
            <h3 className="why‑choose‑us__heading">Licensed & <br/> <strong>insured (Class 2)</strong></h3>
            <p className="why‑choose‑us__text">Compliance, safety, and workmanship you can rely on.</p>
          </div>
          <div className="why‑choose‑us__item">
            <span className="why‑choose‑us__number">04</span>
            <h3 className="why‑choose‑us__heading">Transparent<br/> <strong>scope & timeline</strong></h3>
            <p className="why‑choose‑us__text">Fixed proposals with clear milestones.</p>
          </div>
        </div>
      </div>

      <div className="why‑choose‑us__cta‑wrapper">
        <Link to="/contact">
        <button className="why‑choose‑us__cta‑button">Book Your Consultation</button>
        </Link>
      </div>
    </section>
  );
}
