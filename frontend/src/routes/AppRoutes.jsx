import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import AboutUs from '../pages/AboutUs/AboutUs'
import Services from '../pages/Services/Services'
import Projects from '../pages/Projects/Projects'
import ContactUs from '../pages/ContactUs/ContactUs'
import Blog from '../pages/Blog/Blog'
import BlogPost from '../components/Blog/BlogPost/BlogPost'
import ProjectDetail from '../components/Projects/ProjectDetail/ProjectDetail'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/services" element={<Services />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:slug" element={<ProjectDetail />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/contact" element={<ContactUs />} />
    </Routes>
  )
}

