import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import './BlogPost.css'
import CommentsSection from '../CommentsSection/CommentsSection'
import postsMeta from '../../../content/posts/postsMeta.json'
import { markdownFiles } from '../../../utils/loadMarkdownPosts'

export default function BlogPost() {
  const { slug } = useParams()
  const [content, setContent] = useState('')
  const [comments, setComments] = useState([])

  const postMeta = postsMeta.find(p => p.slug === slug)
  const BACKEND_URL = 'http://localhost:4000/api/comments'

  // 🔥 GARANTE QUE SEMPRE ABRE NO HERO
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [slug])

  if (!postMeta) {
    return <div className="blog-post__notfound">Article not found.</div>
  }

  // 🔹 Carrega o conteúdo Markdown
  useEffect(() => {
    const loadMarkdown = async () => {
      const path = `/src/content/posts/${postMeta.slug}.md`
      const importFn = markdownFiles[path]

      if (!importFn) {
        setContent('')
        return
      }

      const raw = await importFn()

      const cleaned = raw
        .replace(/\*\*\[Home\][\s\S]*?\n/g, '')
        .replace(/^- \[.*?\]\(#.*?\)\n/gm, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')

      setContent(cleaned)
    }

    loadMarkdown()
  }, [postMeta.slug])

  // 🔹 Carrega comentários reais do backend
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/${slug}`)
        const data = await res.json()
        if (data.success) setComments(data.comments)
      } catch (err) {
        console.error('❌ Error loading comments:', err)
      }
    }
    fetchComments()
  }, [slug])

  // 🔹 Adiciona novo comentário
  const handleAddComment = async (newComment) => {
    const payload = {
      name: newComment.name,
      text: newComment.text,
      post_slug: slug,
    }

    try {
      const res = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (data.success) {
        setComments((prev) => [data.comment, ...prev])
      }
    } catch (err) {
      console.error('❌ Error submitting comment:', err)
    }
  }

  // 🔹 Apaga comentário (só dev/admin)
  const handleDelete = async (id) => {
    const adminKey = import.meta.env.VITE_ADMIN_KEY
    try {
      const res = await fetch(`${BACKEND_URL}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminKey}` },
      })
      const data = await res.json()
      if (data.success) {
        setComments((prev) => prev.filter((c) => c.id !== id))
      } else {
        alert('Unauthorized')
      }
    } catch (err) {
      console.error('❌ Error deleting comment:', err)
    }
  }

  return (
    <section className="blog-post">
      {/* HERO */}
      <div
        className="blog-post__hero"
        style={{ backgroundImage: `url(${postMeta.heroImage})` }}
      >
        <div className="blog-post__overlay"></div>
        <h1 className="blog-post__title">{postMeta.title}</h1>
      </div>

      {/* CONTENT */}
      <div className="blog-post__container">
        <p className="blog-post__date">{postMeta.date}</p>

        <div className="blog-post__content">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1
                  className="blog-post__h1"
                  style={{
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 700,
                    fontSize: '3.2rem',
                    lineHeight: '1.25',
                    margin: '3rem 0 1.5rem',
                  }}
                >
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2
                  className="blog-post__h2"
                  style={{
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 700,
                    fontSize: '2.4rem',
                    lineHeight: '1.3',
                    margin: '2.5rem 0 1.2rem',
                  }}
                >
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3
                  className="blog-post__h3"
                  style={{
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 700,
                    fontSize: '1.9rem',
                    lineHeight: '1.35',
                    margin: '2rem 0 1rem',
                  }}
                >
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p
                  className="blog-post__p"
                  style={{
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontSize: '1.6rem',
                    lineHeight: '1.8',
                  }}
                >
                  {children}
                </p>
              ),
              strong: ({ children }) => (
                <strong style={{ fontWeight: 700 }}>{children}</strong>
              ),
              a: () => null,
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

        <CommentsSection
          comments={comments}
          onAddComment={handleAddComment}
          onDeleteComment={handleDelete}
        />
      </div>
    </section>
  )
}
