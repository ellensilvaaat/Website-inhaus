import React, { useState, useMemo, useEffect } from 'react';
import './FeedbackSection.css';
import FeedbackModal from './FeedbackModal';
import ReviewViewModal from './ReviewViewModal';
import reviews from '../../../content/reviews/reviews.cleaned.json';

function normalizeStars(review) {
  if (review.stars) return review.stars;
  if (review.rating) {
    const match = review.rating.match(/\d/);
    return match ? Number(match[0]) : 0;
  }
  return 0;
}

function getShortText(text, max = 160) {
  if (!text) return '';
  if (text.length <= max) return text;
  return text.slice(0, max) + '…';
}

export default function FeedbackSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [viewReview, setViewReview] = useState(null);
  const [sortOrder, setSortOrder] = useState('recent');

  // 👇 adicionados
  const [feedbacks, setFeedbacks] = useState([]);
  const BACKEND_URL = 'https://website-inhaus.onrender.com/api/feedbacks';

  // 🔹 Buscar feedbacks salvos no backend
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch(BACKEND_URL);
        const data = await res.json();
        if (data.success) setFeedbacks(data.feedbacks);
      } catch (err) {
        console.error('❌ Error loading feedbacks:', err);
      }
    };
    fetchFeedbacks();
  }, []);

  // 🔹 Enviar novo feedback
  const handleNewFeedback = async (feedback) => {
    try {
      const res = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedback),
      });
      const data = await res.json();
      if (data.success) {
        setFeedbacks((prev) => [data.feedback, ...prev]);
        setModalOpen(false);
      }
    } catch (err) {
      console.error('❌ Error submitting feedback:', err);
    }
  };

  // 🔹 Apagar feedback (somente dev/admin)
  const handleDelete = async (id) => {
    const adminKey = import.meta.env.VITE_ADMIN_KEY; // sua chave no .env
    try {
      const res = await fetch(`${BACKEND_URL}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminKey}` },
      });
      const data = await res.json();
      if (data.success) {
        setFeedbacks((prev) => prev.filter((f) => f.id !== id));
      } else {
        alert('Unauthorized');
      }
    } catch (err) {
      console.error('❌ Error deleting feedback:', err);
    }
  };

  /* 🔥 SORT */
  const sortedReviews = useMemo(() => {
    const combined = [...feedbacks, ...reviews];
    if (sortOrder === 'recent') {
      return combined.sort(
        (a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0)
      );
    }
    return combined.sort(
      (a, b) => new Date(a.created_at || 0) - new Date(b.created_at || 0)
    );
  }, [sortOrder, feedbacks]);

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
            const stars = normalizeStars(f);
            const fullText = f.text || f.comment || '';

            return (
              <div
                key={f.id || index}
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

                {/* botão de deletar (visível só em dev) */}
                {import.meta.env.MODE === 'development' && (
                  <button
                    className="feedback-card__delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(f.id);
                    }}
                  >
                    🗑
                  </button>
                )}
              </div>
            );
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
        <FeedbackModal
          onClose={() => setModalOpen(false)}
          onSubmit={handleNewFeedback}
        />
      )}

      {viewReview && (
        <ReviewViewModal
          review={viewReview}
          onClose={() => setViewReview(null)}
        />
      )}
    </section>
  );
}
