import React from 'react';
import { portfolioConfig } from '../portfolioConfig';

export default function Experience() {
  const experiences = portfolioConfig.experience;

  // Split into Education and Certifications
  const educationItems = experiences.filter(exp => exp.duration !== "Credential");
  const certificationItems = experiences.filter(exp => exp.duration === "Credential");

  const renderTimeline = (items) => (
    <div className="experience-timeline">
      {items.map((exp, index) => (
        <div key={index} className="timeline-item">
          <div className="timeline-dot" />
          <div className="timeline-content glass-panel">
            <div className="timeline-header">
              <div>
                <h3 className="timeline-role">{exp.role}</h3>
                <span className="timeline-company">{exp.company}</span>
              </div>
              <span className="timeline-duration">{exp.duration}</span>
            </div>
            <p className="timeline-desc">{exp.description}</p>
            <div className="timeline-tech">
              {exp.tech.map((t, idx) => (
                <span key={idx} className="tech-badge">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section id="experience" className="section">
      <h2 className="section-title">Education</h2>
      {renderTimeline(educationItems)}
      
      <div style={{ height: '80px' }} /> {/* Spacious separator */}
      
      <h2 className="section-title">Certifications</h2>
      {renderTimeline(certificationItems)}
    </section>
  );
}
