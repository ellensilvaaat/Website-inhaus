import React, { useState, useMemo } from 'react'
import './FeedbackSection.css'
import FeedbackModal from './FeedbackModal'
import ReviewViewModal from './ReviewViewModal'
import reviews from '../../../content/reviews/reviews.cleaned.json'

function normalizeStars(review) {
  if (review.stars) return review.stars
  if (review.rating) {
    const match = review.rating.match(/\d/)
    return match ? Number(match[0]) : 0
  }
  return 0
}

function getShortText(text, max = 160) {
  if (!text) return ''
  if (text.length <= max) return text
  return text.slice(0, max) + '…'
}

export default function FeedbackSection() {
  const [modalOpen, setModalOpen] = useState(false)
  const [viewReview, setViewReview] = useState(null)
  const [sortOrder, setSortOrder] = useState('recent')

  /* 🔥 SORT */
  const sortedReviews = useMemo(() => {
    const copy = [...reviews]

    if (sortOrder === 'recent') {
      return copy.reverse()
    }

    return copy
  }, [sortOrder])

  return (
    <section className="feedback-section">
      <h2 className="feedback-section__title">What people say</h2>
      <p className="feedback-section__subtitle">
        Discover what our clients say about their experience with Inhaus Living.
      </p>

      {/* 🔽 FILTER */}
      <div className="feedback-section__filter">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="recent">Most recent</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>

      <div className="feedback-section__carousel">
        <button
          className="feedback-section__arrow feedback-section__arrow--left"
          onClick={() =>
            document
              .querySelector('.feedback-section__track')
              .scrollBy({ left: -360, behavior: 'smooth' })
          }
        >
          ‹
        </button>

        <div className="feedback-section__track">
          {sortedReviews.map((f, index) => {
            const stars = normalizeStars(f)
            const fullText = f.text || f.comment || ''

            return (
              <div
                key={index}
                className="feedback-card"
                onClick={() => setViewReview(f)}
              >
                <h3 className="feedback-card__name">{f.name}</h3>

                <div className="feedback-card__stars">
                  {Array.from({ length: stars }).map((_, i) => (
                    <span key={i} className="star">★</span>
                  ))}
                </div>

                <p className="feedback-card__comment">
                  {getShortText(fullText)}
                </p>
              </div>
            )
          })}
        </div>

        <button
          className="feedback-section__arrow feedback-section__arrow--right"
          onClick={() =>
            document
              .querySelector('.feedback-section__track')
              .scrollBy({ left: 360, behavior: 'smooth' })
          }
        >
          ›
        </button>
      </div>

      <button
        className="feedback-section__add-btn"
        onClick={() => setModalOpen(true)}
      >
        Add your review
      </button>

      {modalOpen && (
        <FeedbackModal onClose={() => setModalOpen(false)} />
      )}

      {viewReview && (
        <ReviewViewModal
          review={viewReview}
          onClose={() => setViewReview(null)}
        />
      )}
    </section>
  )
}


