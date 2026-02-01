import React, { useState, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { Helmet } from 'react-helmet-async'
import './BlogPost.css'
import CommentsSection from '../CommentsSection/CommentsSection'
import postsMeta from '../../../content/posts/postsMeta.json'
import { markdownFiles } from '../../../utils/loadMarkdownPosts'

export default function BlogPost() {
  const { slug } = useParams()
  const [content, setContent] = useState('')
  const [comments, setComments] = useState([])

  const postMeta = postsMeta.find(p => p.slug === slug)
  const BACKEND_URL = 'https://website-inhaus.onrender.com/api/comments'

  /* 🔥 Sempre abre no topo */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [slug])

  if (!postMeta) {
    return <div className="blog-post__notfound">Article not found.</div>
  }

  /* 🔹 Função para destacar palavras-chave */
  const highlightKeywords = (text) => {
    const keywords = [
      'renovations',
      'projects',
      'design',
      'home',
      'home builder',
    ]

    const regex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'gi')
    return text.replace(regex, '**$1**')
  }

  /* 🔹 Carrega Markdown */
  useEffect(() => {
    const loadMarkdown = async () => {
      const path = `/src/content/posts/${postMeta.slug}.md`
      const importFn = markdownFiles[path]

      if (!importFn) {
        setContent('')
        return
      }

      const raw = await importFn()

      const cleaned = highlightKeywords(
        raw
          .replace(/\*\*\[Home\][\s\S]*?\n/g, '')
          .replace(/^- \[.*?\]\(#.*?\)\n/gm, '')
          .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      )

      setContent(cleaned)
    }

    loadMarkdown()
  }, [postMeta.slug])

  /* 🔹 SEO: description automática */
  const seoDescription = useMemo(() => {
    if (!content) return ''
    return (
      content
        .replace(/\n+/g, ' ')
        .replace(/[#>*_]/g, '')
        .slice(0, 160)
        .trim() + '…'
    )
  }, [content])

  /* 🔹 Comentários */
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

  const handleAddComment = async (newComment) => {
    try {
      const res = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newComment.name,
          text: newComment.text,
          post_slug: slug,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setComments(prev => [data.comment, ...prev])
      }
    } catch (err) {
      console.error('❌ Error submitting comment:', err)
    }
  }

  const handleDelete = async (id) => {
    const adminKey = import.meta.env.VITE_ADMIN_KEY
    try {
      const res = await fetch(`${BACKEND_URL}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminKey}` },
      })
      const data = await res.json()
      if (data.success) {
        setComments(prev => prev.filter(c => c.id !== id))
      }
    } catch (err) {
      console.error('❌ Error deleting comment:', err)
    }
  }

  return (
    <>
      {/* ================= SEO ================= */}
      <Helmet>
        <title>{postMeta.title} | Inhaus Living</title>
        <meta name="description" content={seoDescription} />

        <meta property="og:title" content={postMeta.title} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={postMeta.heroImage} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://website-inhaus.vercel.app/blog/${postMeta.slug}`}
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={postMeta.title} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={postMeta.heroImage} />
      </Helmet>

      {/* ================= PAGE ================= */}
      <section className="blog-post">
        <div
          className="blog-post__hero"
          style={{ backgroundImage: `url(${postMeta.heroImage})` }}
        >
          <div className="blog-post__overlay"></div>
          <h1 className="blog-post__title">{postMeta.title}</h1>
        </div>

        <div className="blog-post__container">
          <p className="blog-post__date">{postMeta.date}</p>

          <div className="blog-post__content">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="blog-post__h1">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="blog-post__h2">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="blog-post__h3">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="blog-post__p">{children}</p>
                ),
                strong: ({ children }) => (
                  <strong
                    style={{
                      color: 'var(--color-accent)',
                      fontWeight: 700,
                    }}
                  >
                    {children}
                  </strong>
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
    </>
  )
}

