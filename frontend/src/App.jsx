import React from 'react'
import { BrowserRouter as Router, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import AppRoutes from './routes/AppRoutes'
import Footer from './components/Home/Footer/Footer'

function LayoutWrapper() {
  const location = useLocation()
  const hideLayout = location.pathname === '/thank-you'

  return (
    <>
      {!hideLayout && <Navbar />}
      <AppRoutes />
      {!hideLayout && <Footer />}
    </>
  )
}

export default function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  )
}

