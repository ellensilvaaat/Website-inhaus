import React, { useState } from 'react';
import './CommentsSection.css';

export default function CommentsSection({ comments, onAddComment }) {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !text) return;
    onAddComment({ name, text, date: new Date().toISOString() });
    setName('');
    setText('');
    setShowModal(false);
  };

  return (
    <div className="comments-section">
      <h3 className="comments-section__title">Recent Comments</h3>

      {comments.length === 0 ? (
        <p>No comments to show.</p>
      ) : (
        <ul className="comments-section__list">
          {comments.map((c, idx) => (
            <li key={idx} className="comments-section__item">
              <strong>{c.name}</strong> <span>({new Date(c.date).toLocaleString()})</span>
              <p>{c.text}</p>
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
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
