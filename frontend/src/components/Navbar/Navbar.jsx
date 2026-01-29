import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const links = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Projects', path: '/projects' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact Us', path: '/contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <>
      <header className="navbar">
        <div className="navbar__container">
          <img
            src="https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/Logo%20(4).png"
            alt="Inhaus Living Logo"
            className="navbar__logo-img"
          />

          <nav className="navbar__nav">
            <ul className="navbar__list">
              {links.map(link => (
                <li key={link.name} className="navbar__item">
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive
                        ? 'navbar__link navbar__link--active'
                        : 'navbar__link'
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <button
            className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--hidden' : ''}`}
            onClick={toggleMenu}
            aria-label="Open menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu__overlay">
          <div className="mobile-menu">
            <button className="mobile-menu__close" onClick={closeMenu} aria-label="Close menu">
              &times;
            </button>
            <ul className="mobile-menu__list">
              {links.map(link => (
                <li key={link.name} className="mobile-menu__item">
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive
                        ? 'mobile-menu__link mobile-menu__link--active'
                        : 'mobile-menu__link'
                    }
                    onClick={closeMenu}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}


