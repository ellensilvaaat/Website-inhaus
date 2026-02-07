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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [slug])

  useEffect(() => {
    const loadMarkdown = async () => {
      const path = `/src/content/posts/${postMeta?.slug}.md`
      const importFn = markdownFiles[path]
      if (!importFn) return;
      
      const raw = await importFn()
      const cleaned = raw
          .replace(/\*\*\[Home\][\s\S]*?\n/g, '')
          .replace(/^- \[.*?\]\(#.*?\)\n/gm, '')
          .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      
      setContent(cleaned)
    }
    if (postMeta) loadMarkdown()
  }, [postMeta?.slug])

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

  const seoDescription = useMemo(() => {
    return content.replace(/[#>*_]/g, '').slice(0, 160).trim() + '…'
  }, [content])

  if (!postMeta) return <div className="blog-post__notfound">Article not found.</div>

  return (
    <>
      <Helmet>
        <title>{postMeta.title} | Inhaus Living</title>
        <meta name="description" content={seoDescription} />
        <meta property="og:image" content={`${postMeta.heroImage}?tr=w-1200,q-80`} />
      </Helmet>

      <section className="blog-post">
        <div
          className="blog-post__hero"
          style={{ backgroundImage: `url(${postMeta.heroImage}?tr=w-1600,q-85,f-webp)` }}
        >
          <div className="blog-post__overlay"></div>
          <h1 className="blog-post__title">{postMeta.title}</h1>
        </div>

        <div className="blog-post__container">
          <p className="blog-post__date">{postMeta.date}</p>
          <div className="blog-post__content">
            <ReactMarkdown
              components={{
                strong: ({ children }) => <strong style={{ color: 'var(--color-accent)', fontWeight: 700 }}>{children}</strong>,
                a: () => null
              }}
            >
              {content}
            </ReactMarkdown>
          </div>

          <CommentsSection
            comments={comments}
            postSlug={slug}
            setComments={setComments} 
          />
        </div>
      </section>
    </>
  )
}
