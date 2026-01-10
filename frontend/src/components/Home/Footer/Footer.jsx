import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaLinkedin, FaPinterest, FaInstagram, FaFacebookF } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <img src="https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/footer-bg.png" alt="Footer Background" className="footer__image" />

      <div className="footer__overlay">
        <div className="footer__top">
          <div className="footer__social">
            <a href="https://www.linkedin.com/company/inhausliving" target="_blank" rel="noopener noreferrer" className="footer__social-icon" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://au.pinterest.com/inhausliving" target="_blank" rel="noopener noreferrer" className="footer__social-icon" aria-label="Pinterest">
              <FaPinterest />
            </a>
            <a href="https://www.instagram.com/inhaus_living" target="_blank" rel="noopener noreferrer" className="footer__social-icon" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com/inhausliving.com.au" target="_blank" rel="noopener noreferrer" className="footer__social-icon" aria-label="Facebook">
              <FaFacebookF />
            </a>
          </div>

          <nav className="footer__nav">
            <NavLink to="/" className="footer__link">Home</NavLink>
            <NavLink to="/about" className="footer__link">About Us</NavLink>
            <NavLink to="/services" className="footer__link">Services</NavLink>
            <NavLink to="/process" className="footer__link">Process</NavLink>
            <NavLink to="/projects" className="footer__link">Projects</NavLink>
            <NavLink to="/contact" className="footer__link">Contact Us</NavLink>
          </nav>

          <div className="footer__contact-info">
            <p className="footer__contact-title">Contact us</p>
            <p className="footer__contact-phone">(02) 9662 3509</p>
            <p>Shop 10/2A Todman Ave, Kensington NSW 2033</p>
            <p>Unit 2/175 Taren Point Rd, Caringbah NSW 2229</p>
            <p>Unit 2/58 Wollongong St, Fyshwick ACT 2609</p>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} INHAUS LIVING. ALL RIGHTS RESERVED.</span>
        </div>
      </div>
    </footer>
  );
}


