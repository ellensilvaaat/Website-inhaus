// src/components/Projects/ProjectDetail/ProjectDetail.jsx
import React, { useMemo, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './ProjectDetail.css'
import { projectsData } from '../../../content/projects'

function getProjectService(slug) {
  if (!slug) return 'Renovation'

  if (slug.includes('bathroom')) return 'Bathroom Renovation'
  if (slug.includes('kitchen')) return 'Kitchen Renovation'
  if (slug.includes('apartment')) return 'Apartment Renovation'
  if (slug.includes('full-home')) return 'Full Home Renovation'
  if (slug.includes('terrace')) return 'Terrace Renovation'
  if (slug.includes('duplex')) return 'Duplex Construction'

  return 'Renovation'
}

function getProjectQuote(slug) {
  if (!slug) return '“Design is about feeling at home.”'

  if (slug.includes('bathroom'))
    return '“Luxury is when comfort meets intention — even in the smallest spaces.”'

  if (slug.includes('kitchen'))
    return '“The kitchen is where design, function and daily life truly connect.”'

  if (slug.includes('apartment'))
    return '“Great apartment design is about flow, light and effortless living.”'

  if (slug.includes('full-home'))
    return '“A full renovation is not about change — it’s about evolution.”'

  if (slug.includes('duplex'))
    return '“Smart construction balances design ambition with structural clarity.”'

  return '“Great design is built on purpose, not trends.”'
}

// limpa rodapé institucional + whitespace
function cleanContent(raw = '') {
  return raw
    .replace(/Make an enquiry today[\s\S]*/i, '')
    .replace(/Homes \| Apartments[\s\S]*/i, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

export default function ProjectDetail() {
  const { slug } = useParams()

  // 🔥 GARANTE ABERTURA SEMPRE NO HERO
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [slug])

  const project = useMemo(() => {
    return projectsData.find(p => p.slug === slug)
  }, [slug])

  if (!project) {
    return (
      <section className="project-detail">
        <div className="project-detail__notfound">
          <h2>Project not found.</h2>
          <Link to="/projects" className="project-detail__back">
            Back to Projects
          </Link>
        </div>
      </section>
    )
  }

  const serviceTitle = getProjectService(project.slug)
  const quote = getProjectQuote(project.slug)

  const safeGallery = Array.isArray(project.gallery) ? project.gallery : []
  const hero = project.heroImage || safeGallery[0] || ''

  const paragraphs = cleanContent(project.content || '')
    .split('\n\n')
    .filter(Boolean)

  const intro = paragraphs[0] || ''
  const secondary = paragraphs[1] || paragraphs[0] || ''

  // fallback seguro para imagens
  const img0 = safeGallery[0] || hero
  const img1 = safeGallery[1] || safeGallery[0] || hero
  const img2 = safeGallery[2] || img1
  const img3 = safeGallery[3] || img2
  const img4 = safeGallery[4] || img3
  const tail = safeGallery.slice(5)

  return (
    <section className="project-detail">
      {/* HERO */}
      <div className="project-detail__hero">
        <motion.div
          className="project-detail__hero-bg"
          style={{ backgroundImage: hero ? `url(${hero})` : 'none' }}
          initial={{ scale: 1 }}
          animate={{ scale: 1.08 }}
          transition={{ duration: 10, ease: 'easeOut' }}
        />

        <div className="project-detail__hero-overlay" />

        <div className="project-detail__hero-content">
          <span className="project-detail__service">{serviceTitle}</span>
          <h1 className="project-detail__title">{project.title}</h1>
          <p className="project-detail__sub">
            A curated transformation by Inhaus Living designed to feel timeless,
            effortless and deeply personal.
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="project-detail__container">
        <div className="project-layout">
          {/* BLOCO 1 */}
          <section className="project-block">
            <p className="project-text">{intro}</p>

            <div className="project-images two-equal">
              <motion.img
                src={img0}
                alt={project.title}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.35 }}
                loading="lazy"
              />
              <motion.img
                src={img1}
                alt={project.title}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.35 }}
                loading="lazy"
              />
            </div>
          </section>

          {/* BLOCO 2 */}
          <section className="project-block">
            <p className="project-text">{secondary}</p>

            <p className="project-quote">{quote}</p>

            <div className="project-images two-asymmetric">
              <motion.img
                src={img2}
                alt={project.title}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.35 }}
                loading="lazy"
              />
              <motion.img
                src={img3}
                alt={project.title}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.35 }}
                loading="lazy"
              />
            </div>
          </section>

          {/* BLOCO 3 */}
          <section className="project-block">
            <div className="project-image-wide">
              <motion.img
                src={img4}
                alt={project.title}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.35 }}
                loading="lazy"
              />
            </div>
          </section>

          {/* GALERIA FINAL */}
          {tail.length > 0 && (
            <section className="project-gallery">
              {tail.map((img, i) => (
                <motion.img
                  key={img + i}
                  src={img}
                  alt={`${project.title} ${i + 1}`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.35 }}
                  loading="lazy"
                />
              ))}
            </section>
          )}

          {/* CTA FINAL */}
          <section className="project-cta">
            <div className="project-cta__inner">
              <h3>Ready to create a home that feels like you?</h3>
              <p>
                Let’s shape a space that looks beautiful and lives even better.
                Book a consultation and we’ll guide you from vision to finish.
              </p>
              <Link to="/contact" className="project-cta__btn">
                Book a consultation
              </Link>
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}



