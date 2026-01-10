import React from 'react'
import { Link } from 'react-router-dom'
import './ProjectsCarousel.css'
import { projectsData } from '../../../content/projects/index'

function getShortDescription(content, max = 80) {
  if (!content) return ''
  const clean = content.replace(/\n+/g, ' ').trim()
  if (clean.length <= max) return clean
  return clean.slice(0, max).trim() + '…'
}

export default function ProjectsCarousel() {
  return (
    <section className="project-carousel">
      <h2 className="project-carousel__title">Recent Projects</h2>
      <div className="projects_underline"></div>

      <div className="project-carousel__container">
        {projectsData.map((project) => (
          <div className="project-card" key={project.slug}>
            <div
              className="project-card__image"
              style={{ backgroundImage: `url(${project.heroImage})` }}
            >
              <div className="project-card__overlay">
                <h3 className="project-card__title">
                  {project.title}
                </h3>

                <p className="project-card__description">
                  {getShortDescription(project.content)}
                </p>

                {/* 🔥 LINK CORRETO PARA PROJECT DETAIL */}
                <Link
                  to={`/projects/${project.slug}`}
                  className="project-card__button"
                >
                  View Project
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA FINAL */}
      <div className="bnt">
        <Link to="/contact" className="projects__cta">
          Start Your Renovation Journey
          <span className="corner corner--top-right"></span>
          <span className="corner corner--bottom-left"></span>
        </Link>
      </div>
    </section>
  )
}

