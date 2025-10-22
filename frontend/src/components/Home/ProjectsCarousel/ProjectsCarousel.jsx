import React from 'react'
import './ProjectsCarousel.css'

const projects = [
  {
    id: 1,
    title: 'Illume House',
    image: '/project1.jpg',
    scope:
      'Northcote Avenue, Caringbah South – kitchen + bathroom updates, joinery, approvals, scheduling.',
  },
  {
    id: 2,
    title: 'Coastal Villa Retreat',
    image: '/project2.jpg',
    scope:
      'Palm Beach – luxury villa transform, indoor/outdoor flow, pool extension and smart home systems.',
  },
  {
    id: 3,
    title: 'Modern Bungalow',
    image: '/project3.jpg',
    scope:
      'Bondi – full remodel, floor replacement, and minimal interior design.',
  },
  {
    id: 4,
    title: 'Heritage Revival',
    image: '/project4.jpg',
    scope:
      'Newtown – heritage compliance, bathroom rebuild, facade restoration.',
  },
  {
    id: 5,
    title: 'Skyline Apartment',
    image: '/project5.jpg',
    scope:
      'Sydney CBD – full fit-out, acoustic upgrades, lighting automation.',
  },
  {
    id: 6,
    title: 'Urban Loft',
    image: '/project1.jpg',
    scope: 'Surry Hills – open-plan design, new kitchen, timber finishes.',
  },
  {
    id: 7,
    title: 'Garden Oasis',
    image: '/project2.jpg',
    scope: 'Rose Bay – outdoor kitchen, pergola, pool area rework.',
  },
  {
    id: 8,
    title: 'Family Residence',
    image: '/project3.jpg',
    scope:
      'Parramatta – garage conversion, new master suite, kids’ playroom.',
  },
  {
    id: 9,
    title: 'Minimal Studio',
    image: '/project4.jpg',
    scope: 'Redfern – compact design, new bathroom, smart storage.',
  },
  {
    id: 10,
    title: 'Luxury Penthouse',
    image: '/project5.jpg',
    scope:
      'Darlinghurst – full custom fit-out, joinery, lighting and AV integration.',
  },
]

export default function ProjectsCarousel() {
  return (
    <section className="project-carousel">
      <h2 className="project-carousel__title">Recent Projects</h2>
      <div className="projects_underline"></div>
      <div className="project-carousel__container">
        {projects.map((project) => (
          <div className="project-card" key={project.id}>
            <div
              className="project-card__image"
              style={{ backgroundImage: `url(${project.image})` }}
            >
              <div className="project-card__overlay">
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__description">{project.scope}</p>
                <button className="project-card__button">View Project</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bnt">
            <button className="projects__cta">
              Start Your Renovation Journey
              <span className="corner corner--top-right"></span>
              <span className="corner corner--bottom-left"></span>
            </button>
            </div>
    </section>
  )
}


