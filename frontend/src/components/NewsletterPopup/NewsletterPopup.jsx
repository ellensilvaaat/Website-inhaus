import React, { useEffect, useState } from 'react';
import './NewsletterPopup.css';

export default function NewsletterPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE || '';

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setShowPopup(false);
    setSubmitted(false);
    setFormData({ name: '', email: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const err = await response.json();
        alert(`Erro: ${err.message || 'Algo deu errado.'}`);
        return;
      }

      setSubmitted(true);
      setFormData({ name: '', email: '' });
    } catch (error) {
      console.error('Erro ao enviar newsletter:', error);
      alert('Erro ao enviar. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  if (!showPopup) return null;

  return (
    <div className="newsletter-popup-overlay">
      <div className="newsletter-popup show">
        <button className="close-btn" onClick={closePopup}>×</button>

        {submitted ? (
          <div className="thank-you-message fade-in">
            <h2>Thank you!</h2>
            <p>
              You're now part of the <strong>Inhaus Living</strong> crew and will receive
              exclusive updates, inspirations, and smart renovation insights.
            </p>
          </div>
        ) : (
          <div className="popup-content">
            <h2><span>Transform</span> your home with confidence</h2>
            <p>
              Subscribe for smart ideas, trends, quick guides, and real project
              stories to help transform your home.
            </p>
            <form className="popup-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="example@domain.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? 'Sending...' : 'Subscribe'}
              </button>
            </form>
          </div>
        )}

        {!submitted && (
          <small className="popup-disclaimer">
            By subscribing, you agree to receive communications from Inhaus Living.
            You can unsubscribe at any time.
          </small>
        )}
      </div>
    </div>
  );
}

