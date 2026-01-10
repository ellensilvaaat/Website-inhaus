// src/components/Blog/BlogPost/BlogPost.jsx
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

  // 🔥 GARANTE QUE SEMPRE ABRE NO HERO
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [slug])

  if (!postMeta) {
    return <div className="blog-post__notfound">Article not found.</div>
  }

  useEffect(() => {
    const loadMarkdown = async () => {
      const path = `/src/content/posts/${postMeta.slug}.md`
      const importFn = markdownFiles[path]

      if (!importFn) {
        setContent('')
        return
      }

      const raw = await importFn()

      // 🔥 LIMPEZA GLOBAL DO CONTEÚDO
      const cleaned = raw
        // remove breadcrumbs tipo Home > Blog
        .replace(/\*\*\[Home\][\s\S]*?\n/g, '')
        // remove listas de âncoras internas
        .replace(/^- \[.*?\]\(#.*?\)\n/gm, '')
        // remove qualquer link markdown
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')

      setContent(cleaned)
    }

    loadMarkdown()
  }, [postMeta.slug])

  const handleAddComment = (newComment) => {
    setComments(prev => [newComment, ...prev].slice(0, 5))
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
              a: () => null, // remove links
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

        <CommentsSection
          comments={comments}
          onAddComment={handleAddComment}
        />
      </div>
    </section>
  )
}
