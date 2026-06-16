import React from 'react';
import { portfolioConfig } from '../portfolioConfig';

export default function About() {
  const { bio, location } = portfolioConfig.personal;
  const stats = portfolioConfig.stats;

  return (
    <section id="about" className="section">
      <h2 className="section-title">About Me</h2>
      
      <div className="about-grid">
        <div className="about-text">
          <p>{bio}</p>
          <p>
            Based in <strong>{location}</strong>, I thrive on collaborative engineering challenges and enjoy 
            building rich visual experiences that solve real-world problems. Let's build something exceptional together.
          </p>
        </div>
        
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card glass-panel">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
