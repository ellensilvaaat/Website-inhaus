import React, { useState, useEffect } from 'react';
import './CommentsSection.css';

export default function CommentsSection({ comments, onAddComment }) {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [loadedComments, setLoadedComments] = useState([]);

  const BACKEND_URL = 'http://localhost:4000/api/comments';

  // 🔹 Carrega comentários reais do backend (para o post atual)
  useEffect(() => {
    const path = window.location.pathname; // pega o slug do post
    const slug = path.split('/').pop();

    const fetchComments = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/${slug}`);
        const data = await res.json();
        if (data.success) {
          setLoadedComments(data.comments);
        }
      } catch (err) {
        console.error('❌ Error loading comments:', err);
      }
    };

    fetchComments();
  }, []);

// Evita duplicações (usa o id como referência única)
const combined = [...loadedComments, ...comments];
const unique = combined.filter(
  (c, index, self) =>
    index === self.findIndex((x) => (x.id || x.date) === (c.id || c.date))
);

// Ordena os mais novos primeiro
const allComments = unique.sort(
  (a, b) => new Date(b.created_at || b.date) - new Date(a.created_at || a.date)
);


  // 🔹 Envia novo comentário pro backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !text) return;

    const path = window.location.pathname;
    const slug = path.split('/').pop();

    const newComment = {
      name,
      text,
      date: new Date().toISOString(),
      post_slug: slug,
    };

    try {
      const res = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment),
      });

      const data = await res.json();
      if (data.success) {
        setLoadedComments((prev) => [data.comment, ...prev]);
      }
    } catch (err) {
      console.error('❌ Error saving comment:', err);
    }

    setName('');
    setText('');
    setShowModal(false);
  };

  // 🔹 Deleta comentário (só você — ambiente dev)
  const handleDelete = async (id) => {
    const adminKey = import.meta.env.VITE_ADMIN_KEY;
    try {
      const res = await fetch(`${BACKEND_URL}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminKey}` },
      });
      const data = await res.json();
      if (data.success) {
        setLoadedComments((prev) => prev.filter((c) => c.id !== id));
      } else {
        alert('Unauthorized');
      }
    } catch (err) {
      console.error('❌ Error deleting comment:', err);
    }
  };

  return (
    <div className="comments-section">
      <h3 className="comments-section__title">Recent Comments</h3>

      {allComments.length === 0 ? (
        <p>No comments to show.</p>
      ) : (
        <ul className="comments-section__list">
          {allComments.map((c, idx) => (
            <li key={c.id || idx} className="comments-section__item">
              <strong>{c.name}</strong>{' '}
              <span>
                ({new Date(c.created_at || c.date).toLocaleString()})
              </span>
              <p>{c.text}</p>

              {/* 🔹 botão de apagar visível só pra você localmente */}
              {import.meta.env.MODE === 'development' && (
                <button
                  className="comment__delete"
                  onClick={() => handleDelete(c.id)}
                >
                  🗑
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      <button
        className="comments-section__add-btn"
        onClick={() => setShowModal(true)}
      >
        Add Comment
      </button>

      {showModal && (
        <div className="comments-section__modal-overlay">
          <div className="comments-section__modal">
            <h4>Add your comment</h4>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
              <label>
                Comment:
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  required
                />
              </label>
              <div className="comments-section__modal-actions">
                <button type="submit">Submit</button>
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

