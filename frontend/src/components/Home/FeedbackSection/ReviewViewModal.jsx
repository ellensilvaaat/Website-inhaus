import React from 'react'
import './ReviewViewModal.css'

function normalizeStars(review) {
  if (review.stars) return review.stars
  if (review.rating) {
    const match = review.rating.match(/\d/)
    return match ? Number(match[0]) : 0
  }
  return 0
}

export default function ReviewViewModal({ review, onClose }) {
  if (!review) return null

  const stars = normalizeStars(review)
  const fullText = review.fullText || review.text || review.comment || ''

  return (
    <div className="review-modal-overlay" onClick={onClose}>
      <div className="review-modal" onClick={(e) => e.stopPropagation()}>
        <button className="review-modal__close" onClick={onClose}>
          ✕
        </button>

        <h3 className="review-modal__name">{review.name}</h3>

        <div className="review-modal__stars">
          {Array.from({ length: stars }).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>

        {review.date && (
          <p className="review-modal__date">{review.date}</p>
        )}

        <p className="review-modal__text">
          {fullText}
        </p>
      </div>
    </div>
  )
}

