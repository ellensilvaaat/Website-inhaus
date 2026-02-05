import React, { useMemo, useEffect, useState, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './ProjectDetail.css'
import { projectsData } from '../../../content/projects'

// ✅ Configuração de Imagem: Mesma URL para Preload e Popup garante Cache
const getOptimizedUrl = (url, width = 1400, quality = 90) => {
  if (!url) return '';
  const baseUrl = url.split('?')[0];
  return `${baseUrl}?tr=w-${width},q-${quality},f-auto,dpr-auto,us-2`;
};

// --- Funções Auxiliares de Texto ---
function getProjectService(slug) {
  if (!slug) return 'Renovation';
  const s = slug.toLowerCase();
  if (s.includes('bathroom')) return 'Bathroom Renovation';
  if (s.includes('kitchen')) return 'Kitchen Renovation';
  if (s.includes('apartment')) return 'Apartment Renovation';
  if (s.includes('full-home')) return 'Full Home Renovation';
  return 'Renovation';
}

function getProjectQuote(slug) {
  if (!slug) return '“Design is about feeling at home.”';
  const s = slug.toLowerCase();
  if (s.includes('bathroom')) return '“Luxury is when comfort meets intention.”';
  if (s.includes('kitchen')) return '“The kitchen is where daily life truly connects.”';
  return '“Great design is built on purpose, not trends.”';
}

function cleanContent(raw = '') {
  return raw.replace(/Make an enquiry today[\s\S]*/i, '').replace(/\n{3,}/g, '\n\n').trim();
}

function autoParagraphs(text, maxLength = 500) {
  if (!text) return [];
  const sentences = text.split(/(?<=[.?!])\s+(?=[A-Z])/g);
  const paragraphs = [];
  let current = '';
  for (const sentence of sentences) {
    if ((current + sentence).length > maxLength) {
      paragraphs.push(current.trim()); current = sentence + ' ';
    } else { current += sentence + ' '; }
  }
  if (current.trim()) paragraphs.push(current.trim());
  return paragraphs;
}

function highlightKeywords(text, project) {
  const keywords = [project.title, 'Kitchen Renovation', 'Bathroom Renovation', 'Apartment Renovation'];
  let result = text;
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b(${keyword})\\b`, 'gi');
    result = result.replace(regex, '<strong>$1</strong>');
  });
  return result;
}

// --- Componente Principal ---
export default function ProjectDetail() {
  const { slug } = useParams();
  const [currentIndex, setCurrentIndex] = useState(null);

  const project = useMemo(() => projectsData.find(p => p.slug === slug), [slug]);
  const allImages = useMemo(() => project ? (Array.isArray(project.gallery) ? project.gallery : []) : [], [project]);

  // 🔥 TURBO CACHE: Força o download das imagens HD em background
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (allImages.length > 0) {
      allImages.forEach((imgUrl) => {
        const img = new Image();
        // Usamos exatamente 1600px e q-85 para o cache casar com o popup
        img.src = getOptimizedUrl(imgUrl, 1600, 85);
      });
    }
  }, [allImages]);

  // Navegação
  const nextImg = useCallback((e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
  }, [allImages]);

  const prevImg = useCallback((e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  }, [allImages]);

  // Atalhos Teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (currentIndex === null) return;
      if (e.key === 'ArrowRight') nextImg();
      if (e.key === 'ArrowLeft') prevImg();
      if (e.key === 'Escape') setCurrentIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, nextImg, prevImg]);

  if (!project) return null;

  const paragraphs = autoParagraphs(cleanContent(project.content || ''));

  return (
    <section className="project-detail">
      {/* LIGHTBOX POPUP */}
      <AnimatePresence>
        {currentIndex !== null && (
          <motion.div 
            className="lightbox-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setCurrentIndex(null)}
          >
            <button className="lightbox-close">×</button>
            <button className="nav-btn prev" onClick={prevImg}>‹</button>
            
            <div className="lightbox-container">
              <motion.img 
                key={allImages[currentIndex]}
                src={getOptimizedUrl(allImages[currentIndex], 1600, 85)} 
                className="lightbox-main"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            <button className="nav-btn next" onClick={nextImg}>›</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <div className="project-detail__hero">
        <div className="project-detail__hero-bg" 
             style={{ backgroundImage: `url(${getOptimizedUrl(project.heroImage || allImages[0], 1920, 80)})` }} />
        <div className="project-detail__hero-overlay" />
        <div className="project-detail__hero-content">
          <span className="project-detail__service">{getProjectService(project.slug)}</span>
          <h1 className="project-detail__title">{project.title}</h1>
        </div>
      </div>

      <div className="project-detail__container">
        <div className="project-layout">
          
          <section className="project-block">
            {paragraphs.slice(0, 2).map((text, i) => (
              <p key={i} className="project-text" dangerouslySetInnerHTML={{ __html: highlightKeywords(text, project) }} />
            ))}
            <div className="project-images two-equal">
              {allImages.slice(0, 2).map((img, i) => (
                <div key={i} className="img-wrapper" onClick={() => setCurrentIndex(i)}>
                  <img src={getOptimizedUrl(img, 1000, 75)} alt={project.title} />
                </div>
              ))}
            </div>
          </section>

          <section className="project-block">
            <p className="project-quote">{getProjectQuote(project.slug)}</p>
            <div className="project-images two-asymmetric">
              <div className="img-wrapper" onClick={() => setCurrentIndex(2)}>
                <img src={getOptimizedUrl(allImages[2], 1000, 75)} alt={project.title} />
              </div>
              <div className="img-wrapper" onClick={() => setCurrentIndex(3)}>
                <img src={getOptimizedUrl(allImages[3], 1000, 75)} alt={project.title} />
              </div>
            </div>
          </section>

          <section className="project-block">
            <div className="project-image-wide" onClick={() => setCurrentIndex(4)}>
              <img src={getOptimizedUrl(allImages[4], 1600, 80)} alt={project.title} style={{ width: '100%' }} />
            </div>
          </section>

          {allImages.length > 5 && (
            <section className="project-gallery">
              {allImages.slice(5).map((img, i) => (
                <div key={i} className="img-wrapper" onClick={() => setCurrentIndex(i + 5)}>
                  <img src={getOptimizedUrl(img, 400, 70)} alt={project.title} />
                </div>
              ))}
            </section>
          )}

          <section className="project-cta">
            <div className="project-cta__inner">
              <h3>Ready to create a home that feels like you?</h3>
              <p>Let’s shape a space that looks beautiful and lives even better.</p>
              <Link to="/contact" className="project-cta__btn">Book a consultation</Link>
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}