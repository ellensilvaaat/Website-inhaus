import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

const Home = lazy(() => import('../pages/Home/Home'))
const AboutUs = lazy(() => import('../pages/AboutUs/AboutUs'))
const Services = lazy(() => import('../pages/Services/Services'))
const Projects = lazy(() => import('../pages/Projects/Projects'))
const ContactUs = lazy(() => import('../pages/ContactUs/ContactUs'))
const Blog = lazy(() => import('../pages/Blog/Blog'))
const BlogPost = lazy(() => import('../components/Blog/BlogPost/BlogPost'))
const ProjectDetail = lazy(() => import('../components/Projects/ProjectDetail/ProjectDetail'))
const ThankYou = lazy(() => import('../components/ThankYou/ThankYou'))
const NotFound = lazy(() => import('../components/NotFound/NotFound'))

const PageLoader = () => (
  <div className="route-loader-container">
    <div className="route-loader-bar"></div>
  </div>
);

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}