import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import './ProjectsPage.css'
import arrowIcon from '../../../assets/arrow.svg'
import { projectsData } from '../../../content/projects'
import ProjectsMap from '../../Map/ProjectsMap'


const filters = ['All', 'Kitchen', 'Bathroom', 'Renovation', 'Full house', 'Building works']

function getExcerpt(content, maxLength = 220) {
  if (!content) return ''

  return (
    content
      .replace(/Homes \| Apartments[\s\S]*/i, '')
      .replace(/\n+/g, ' ')
      .trim()
      .slice(0, maxLength) + '…'
  )
}

function getProjectType(slug) {
  if (!slug) return 'Renovation'

  if (slug.includes('kitchen')) return 'Kitchen'
  if (slug.includes('bathroom')) return 'Bathroom'
  if (slug.includes('apartment')) return 'Renovation'
  if (slug.includes('full-home')) return 'Full house'
  if (slug.includes('duplex')) return 'Building works'

  return 'Renovation'
}

export default function ProjectsPage() {
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 5

  const { pathname } = useLocation()

  // 🔥 GARANTE QUE ABRE NO TOPO / HERO
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  const filteredProjects =
    selectedFilter === 'All'
      ? projectsData
      : projectsData.filter(
          (project) => getProjectType(project.slug) === selectedFilter
        )

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)
  const startIndex = (currentPage - 1) * projectsPerPage
  const currentProjects = filteredProjects.slice(
    startIndex,
    startIndex + projectsPerPage
  )

  return (
    <section className="project-page">
      {/* HERO / TITLE */}
      <h2 className="project-page__title">Our Projects</h2>

      {/* FILTERS */}
      <div className="project-page__filters">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`project-page__filter-btn ${
              selectedFilter === filter ? 'active' : ''
            }`}
            onClick={() => {
              setSelectedFilter(filter)
              setCurrentPage(1)
            }}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* PROJECT LIST */}
      <div className="project-page__list">
        {currentProjects.map((project) => (
          <div key={project.slug} className="projects-card">
            <div className="projects-card__text">
              <h3 className="projects-card__title">{project.title}</h3>
              <p className="projects-card__description">
                {getExcerpt(project.content)}
              </p>
            </div>

            <div className="projects-card__image-wrapper">
              <img
                src={project.listCover}
                onError={(e) => {
                  e.currentTarget.src = project.heroImage
                }}
                alt={project.title}
                className="project-cards__image"
                loading="lazy"
              />

              <motion.div className="projects-card__btn-wrapper">
                <Link
                  to={`/projects/${project.slug}`}
                  className="card-section__btnn"
                >
                  <img src={arrowIcon} alt="arrow" />
                </Link>
              </motion.div>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="project-page__pagination">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className="project-page__page-btn"
        >
          {'<'}
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setCurrentPage(pageNum)}
            className={`project-page__page-btn ${
              currentPage === pageNum ? 'active' : ''
            }`}
          >
            {pageNum}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          className="project-page__page-btn"
        >
          {'>'}
        </button>
      </div>
      <ProjectsMap />
    </section>
  )
}
