import React from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { portfolioConfig } from '../portfolioConfig';
import Typewriter from './Typewriter';

export default function Hero() {
  const { name, tagline, roles, bio, resumeUrl } = portfolioConfig.personal;

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="section hero-section">
      {/* Liquid Glass Orbs (Floating Morphing Blobs, Bokeh, and Depth-of-Field Particles) */}
      <div className="hero-orbs-container">
        <div className="hero-orb orb-1"></div>
        <div className="hero-orb orb-2"></div>
        <div className="hero-orb orb-3"></div>
        <div className="hero-orb orb-4"></div>
      </div>

      <div className="hero-content">
        <div className="hero-greeting">{tagline}</div>
        <h1 className="hero-name">
          Hi, I'm <span className="gradient-text">{name}</span>
        </h1>
        <div className="hero-role-wrapper">
          I am a <Typewriter words={roles} typingSpeed={80} deletingSpeed={40} delayBetweenWords={2500} />
        </div>
        <p className="hero-bio">{bio}</p>
        <div className="hero-cta">
          <button onClick={scrollToContact} className="btn btn-primary">
            Get In Touch <ArrowRight size={18} />
          </button>
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            Download CV <Download size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
