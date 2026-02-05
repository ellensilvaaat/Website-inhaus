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
          <NavLink to="/" className="navbar__logo" aria-label="Home" onClick={closeMenu}>
            <img
              // ✅ Otimizado: pedindo largura de 200px (suficiente para o que é exibido) e formato WebP
              src="https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/Logo%20(4).png?tr=w-200,f-webp"
              alt="Inhaus Living Logo"
              className="navbar__logo-img"
              // ✅ Prioridade alta para o logo não "piscar" ao carregar
              fetchpriority="high"
              width="150" 
              height="35"
            />
          </NavLink>

          <nav className="navbar__nav">
            <ul className="navbar__list">
              {links.map(link => (
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
        <div className="mobile-menu__overlay" onClick={closeMenu}>
          {/* stopPropagation evita fechar o menu ao clicar dentro dele */}
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <button className="mobile-menu__close" onClick={closeMenu} aria-label="Close menu">
              &times;
            </button>
            <ul className="mobile-menu__list">
              {links.map(link => (
                <li key={link.name} className="mobile-menu__item">
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive ? 'mobile-menu__link mobile-menu__link--active' : 'mobile-menu__link'
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


