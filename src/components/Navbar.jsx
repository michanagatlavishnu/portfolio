import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { portfolioConfig } from '../portfolioConfig';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Darken navbar backdrop on scroll
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Track active section to highlight active link in navigation
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Education & Credentials' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <span 
        className="nav-logo" 
        style={{ cursor: 'pointer' }}
        onClick={() => handleNavClick('home')}
      >
        {portfolioConfig.personal.name}.dev
      </span>

      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <li key={link.id}>
            <span
              className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
              onClick={() => handleNavClick(link.id)}
            >
              {link.label}
            </span>
          </li>
        ))}
      </ul>

      <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Navigation Menu">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </nav>
  );
}
