import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Github } from './SocialIcons';
import { portfolioConfig } from '../portfolioConfig';

export default function Projects() {
  const projects = portfolioConfig.projects;
  const [filter, setFilter] = useState('All');

  // Extract unique categories dynamically
  const categories = ['All', ...new Set(projects.map(p => p.category))];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="section">
      <h2 className="section-title">Selected Projects</h2>
      
      <div className="projects-filter">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            className={`filter-btn ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      
      <div className="projects-grid">
        {filteredProjects.map((project, index) => (
          <div key={index} className="project-card glass-panel" style={{ animation: 'fadeIn 0.5s ease' }}>
            <div className="project-content">
              <span className="project-category">{project.category}</span>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>
              
              <div className="project-tech">
                {project.tech.map((t, idx) => (
                  <span key={idx} className="tech-badge">
                    {t}
                  </span>
                ))}
              </div>
              
              <div className="project-links">
                <a 
                  href={project.githubLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="project-link"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <Github size={18} /> Code
                </a>
                <a 
                  href={project.liveLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="project-link"
                  aria-label={`View live demo of ${project.title}`}
                >
                  <ExternalLink size={18} /> Demo
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
