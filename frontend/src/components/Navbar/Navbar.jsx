import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '/logo-inhaus.svg'
import './Navbar.css'


const links = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Projects', path: '/projects' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact Us', path: '/contact' },
]

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__container">
        <img src={logo} alt="Inhaus Living Logo" className="navbar__logo-img" />
        <nav className="navbar__nav">
          <ul className="navbar__list">
            {links.map((link) => (
              <li key={link.name} className="navbar__item">
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}