import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BlogPage.css';
import postsMeta from '../../../content/posts/postsMeta.json';

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [recentComments, setRecentComments] = useState([]);
  const postsPerPage = 10;

  useEffect(() => {
    const saved = localStorage.getItem('comments');
    if (saved) {
      setRecentComments(JSON.parse(saved).slice(0, 5));
    }
  }, []);

  const sortedPosts = useMemo(() => {
    return [...postsMeta].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  }, []);

  const filteredPosts = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    return sortedPosts.filter(p =>
      p.title.toLowerCase().includes(q)
    );
  }, [searchTerm, sortedPosts]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  return (
    <section className="blog-page">
      <div className="blog-page__container">
        <div className="blog-page__grid">
          {currentPosts.map(post => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="blog-card"
            >
              <div className="blog-card__image-wrapper">
                <img
                  src={post.heroImage}
                  alt={post.title}
                  className="blog-card__image"
                />
              </div>

              <div className="blog-card__text">
                <h3 className="blog-card__title">{post.title}</h3>
                <p className="blog-card__excerpt">{post.date}</p>
              </div>
            </Link>
          ))}
        </div>

        <aside className="blog-page__sidebar">
          <div className="sidebar__search">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <button>SEARCH</button>
          </div>

          <div className="sidebar__recent">
            <h3>Recent Posts</h3>
            <ul>
              {sortedPosts.slice(0, 5).map(post => (
                <li key={post.slug}>
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar__comments">
            <h3>Recent Comments</h3>
            {recentComments.length === 0 ? (
              <p><strong>No comments yet.</strong></p>
            ) : (
              <ul>
                {recentComments.map((c, i) => (
                  <li key={i}>
                    <div className="sidebar__comment-meta">
                      <strong>{c.name}</strong> ({c.date})
                    </div>
                    <div className="sidebar__comment-text">"{c.text}"</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>

      {totalPages > 1 && (
        <div className="blog-page__pagination">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
