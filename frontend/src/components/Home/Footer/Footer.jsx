import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaLinkedin, FaPinterest, FaInstagram, FaFacebookF } from 'react-icons/fa';
import Typewriter from 'typewriter-effect';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__columns">

        {/* Coluna 1: Frase animada + Logo */}
        <div className="footer__column footer__typewriter">
          <h2 className="footer__typewriter-text">
  <strong className="footer__we">we</strong>{' '}
  <span className="footer__animated-word">
    <Typewriter
      options={{
        strings: ['build.', 'renovate.', 'design.', 'transform.'],
        autoStart: true,
        loop: true,
        pauseFor: 2000,
        deleteSpeed: 50,
      }}
    />
  </span>
</h2>
          <img
            src="https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/Logo%20(4).png"
            alt="Inhaus Logo"
            className="footer__logo"
          />
        </div>

        {/* Coluna 2: Quick Links */}
        <div className="footer__column footer__nav">
          <p className="footer__nav-title">Quick Links</p>
          <NavLink to="/" className="footer__link">Home</NavLink>
          <NavLink to="/about" className="footer__link">About Us</NavLink>
          <NavLink to="/services" className="footer__link">Services</NavLink>
          <NavLink to="/projects" className="footer__link">Projects</NavLink>
          <NavLink to="/blog" className="footer__link">Blog</NavLink>
          <NavLink to="/contact" className="footer__link">Contact Us</NavLink>
        </div>

        {/* Coluna 3: Contato + Redes Sociais */}
        <div className="footer__column footer__contact">
          <p className="footer__contact-title">Contact us</p>
          <p className="footer__contact-phone">(02) 9662 3509</p>
          <p className="footer__contact-email">info@inhausliving.com.au</p>
          <p className="footer__address-title">Address</p>
          <p className="footer__address">Shop 10/2A Todman Ave, Kensington, NSW</p>
          <p className="footer__address">Unit 2/175 Taren Point Rd, Caringbah, NSW</p>
          <p className="footer__address">Unit 2/58 Wollongong St, Fyshwick ACT</p>
          <div className="footer__social">
            <a href="https://www.linkedin.com/company/inhausliving" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
            <a href="https://au.pinterest.com/inhausliving" target="_blank" rel="noopener noreferrer" aria-label="Pinterest"><FaPinterest /></a>
            <a href="https://www.instagram.com/inhaus_living" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://www.facebook.com/inhausliving.com.au" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} INHAUS LIVING. ALL RIGHTS RESERVED.</span>
      </div>
    </footer>
  );
}




