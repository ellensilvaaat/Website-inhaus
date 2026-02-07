import React, { useState, useMemo, useEffect } from 'react';
import './FeedbackSection.css';
import FeedbackModal from './FeedbackModal';
import ReviewViewModal from './ReviewViewModal';
import reviewsLocal from '../../../content/reviews/reviews.cleaned.json';

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

function parseRelativeDate(str) {
  if (!str) return new Date(0);
  const now = new Date();
  const match = str.match(/(\d+)\s+(second|minute|hour|day|week|month|year)s?\s+ago/i);
  if (match) {
    const value = parseInt(match[1], 10);
    const unit = match[2].toLowerCase();
    const multiplier = {
      second: 1000,
      minute: 60 * 1000,
      hour: 60 * 60 * 1000,
      day: 24 * 60 * 60 * 1000,
      week: 7 * 24 * 60 * 60 * 1000,
      month: 30 * 24 * 60 * 60 * 1000,
      year: 365 * 24 * 60 * 60 * 1000,
    };
    return new Date(now - value * (multiplier[unit] || 0));
  }
  const parsed = Date.parse(str);
  return isNaN(parsed) ? new Date(0) : new Date(parsed);
}

export default function FeedbackSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [viewReview, setViewReview] = useState(null);
  const [sortOrder, setSortOrder] = useState('recent');
  const [feedbacks, setFeedbacks] = useState([]);
  const BACKEND_URL = 'https://website-inhaus.onrender.com/api/feedbacks';

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch(BACKEND_URL);
        const data = await res.json();
        if (data.success) setFeedbacks(data.feedbacks);
      } catch (err) {
        console.error('❌ Error loading feedbacks (Server might be sleeping):', err);
      }
    };

    const timer = setTimeout(fetchFeedbacks, 500);
    return () => clearTimeout(timer);
  }, []);

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

  const handleDelete = async (id) => {
    const adminKey = import.meta.env.VITE_ADMIN_KEY;
    try {
      const res = await fetch(`${BACKEND_URL}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminKey}` },
      });
      const data = await res.json();
      if (data.success) {
        setFeedbacks((prev) => prev.filter((f) => f.id !== id));
      }
    } catch (err) {
      console.error('❌ Error deleting feedback:', err);
    }
  };

  const sortedReviews = useMemo(() => {
    const combined = [...feedbacks, ...reviewsLocal];
    return combined.sort((a, b) => {
      const dateA = parseRelativeDate(a.created_at || a.date);
      const dateB = parseRelativeDate(b.created_at || b.date);
      return sortOrder === 'recent' ? dateB - dateA : dateA - dateB;
    });
  }, [sortOrder, feedbacks]);

  return (
    <section className="feedback-section">
      <h2 className="feedback-section__title">What people say</h2>
      <p className="feedback-section__subtitle">
        Discover what our clients say about their experience with Inhaus Living.
      </p>

      <div className="feedback-section__filter">
        <label htmlFor="feedback-sort" className="sr-only">Sort reviews</label>
        <select
          id="feedback-sort"
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
          onClick={() => document.querySelector('.feedback-section__track').scrollBy({ left: -360, behavior: 'smooth' })}
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
                <p className="feedback-card__comment">{getShortText(fullText)}</p>

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
          onClick={() => document.querySelector('.feedback-section__track').scrollBy({ left: 360, behavior: 'smooth' })}
        >
          ›
        </button>
      </div>

      <button className="feedback-section__add-btn" onClick={() => setModalOpen(true)}>
        Add your review
      </button>

      {modalOpen && <FeedbackModal onClose={() => setModalOpen(false)} onSubmit={handleNewFeedback} />}
      {viewReview && <ReviewViewModal review={viewReview} onClose={() => setViewReview(null)} />}
    </section>
  );
}

