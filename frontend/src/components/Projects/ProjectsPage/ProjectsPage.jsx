import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import ProjectsMapImpact from '../ProjectsMapImpact/ProjectsMapImpact'
import './ProjectsPage.css'
import { projectsData } from '../../../content/projects'

const filters = [
  'All',
  'Kitchen',
  'Bathroom',
  'Renovation',
  'Full house',
  'Building works',
]

function getExcerpt(content, maxLength = 160) {
  if (!content) return ''
  return (
    content
      .replace(/\n+/g, ' ')
      .trim()
      .slice(0, maxLength) + '…'
  )
}

function getProjectType(slug) {
  if (!slug) return 'Renovation'
  if (slug.includes('kitchen')) return 'Kitchen'
  if (slug.includes('bathroom')) return 'Bathroom'
  if (slug.includes('full')) return 'Full house'
  if (slug.includes('build')) return 'Building works'
  return 'Renovation'
}

export default function ProjectsPage() {
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 5
  const { pathname } = useLocation()

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
            {/* GALERIA */}
            <div className="projects-card__image-wrapper">
              <Swiper
                modules={[Navigation]}
                navigation
                loop
                slidesPerView={1}
              >
                {(project.listGallery?.length
                  ? project.listGallery
                  : project.gallery?.length
                  ? project.gallery
                  : [project.heroImage]
                ).map((img, index) => (
                  <SwiperSlide key={index}>
                    <img
                     src={`${img}?tr=w-900,h-563,fo=center,q=100,format=webp`}
                     alt={`${project.title} ${index + 1}`}
                     className="project-cards__image"
                     loading="lazy"
                     decoding="async"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* TEXTO */}
            <div className="projects-card__text">
              <h3 className="projects-card__title">{project.title}</h3>
              <p className="projects-card__description">
                {getExcerpt(project.content)}
              </p>

              <Link
                to={`/projects/${project.slug}`}
                className="projects-card__read-more"
              >
                Read more
              </Link>
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
          ‹
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
          ›
        </button>
      </div>

      {/* MAP */}
      <div className="map-preview-section">
        <h2 className="map-preview-title">
          See where Inhaus Living is present
        </h2>
        <ProjectsMapImpact />
      </div>
    </section>
  )
}


