import React from 'react'
import { Helmet } from 'react-helmet-async'
import Hero from '../../components/Blog/Hero/Hero'
import BlogPage from '../../components/Blog/BlogPage/BlogPage'

export default function Blog() {
  return (
    <main className="blog">
      <Helmet>
        <title>Blog | Inhaus Living</title>
        <meta
          name="description"
          content="Explore the Inhaus Living blog for expert insights on home renovations, design trends, construction tips, and inspiration for transforming your space."
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="Blog | Inhaus Living" />
        <meta
          property="og:description"
          content="Renovation insights, design inspiration, and expert advice from the Inhaus Living team."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://inhausliving.com.au/blog" />
        <meta
          property="og:image"
          content="https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/prydumano-design-vXMbcO1mRBY-unsplash.jpg"
        />

        {/* Canonical */}
        <link rel="canonical" href="https://inhausliving.com.au/blog" />
      </Helmet>

      <Hero />
      <BlogPage />
    </main>
  )
}
