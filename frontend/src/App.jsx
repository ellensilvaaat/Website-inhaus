import React, { useState } from 'react'
import { BrowserRouter as Router, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import AppRoutes from './routes/AppRoutes'
import Footer from './components/Home/Footer/Footer'
import Preloader from './components/Preloader/Preloader'

function LayoutWrapper({ isLoading }) {
  const location = useLocation()
  const hideLayout = location.pathname === '/thank-you'

  return (
    <div className={`app-content ${isLoading ? 'is-loading' : 'is-loaded'}`}>
      {!hideLayout && <Navbar />}
      <main>
        <AppRoutes />
      </main>
      {!hideLayout && <Footer />}
    </div>
  )
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <Router>
      {isLoading && <Preloader finishLoading={() => setIsLoading(false)} />}
      <LayoutWrapper isLoading={isLoading} />
    </Router>
  )
}
