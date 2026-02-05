import React, { useEffect, useState } from 'react';
import './NewsletterPopup.css';

export default function NewsletterPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE || '';

  useEffect(() => {
    // 1. Verifica se o usuário já fechou ou assinou o popup anteriormente
    const hasSeenPopup = localStorage.getItem('inhaus_popup_closed');
    
    if (hasSeenPopup) return;

    // 2. Função para detectar o scroll de 50%
    const handleScroll = () => {
      const scrollTop = window.scrollY; // O quanto rolou
      const docHeight = document.documentElement.scrollHeight - window.innerHeight; // Altura total rolável
      const scrollPercent = (scrollTop / docHeight) * 100;

      if (scrollPercent >= 50) {
        setShowPopup(true);
        // Remove o evento após disparar a primeira vez para performance
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Limpeza ao desmontar o componente
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closePopup = () => {
    setShowPopup(false);
    setSubmitted(false);
    setFormData({ name: '', email: '' });
    // 3. Salva no navegador que ele não quer mais ver o popup nesta sessão/visita
    localStorage.setItem('inhaus_popup_closed', 'true');
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
      // Também marca como fechado após sucesso
      localStorage.setItem('inhaus_popup_closed', 'true');
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

