import React from 'react';
import { portfolioConfig } from '../portfolioConfig';

export default function Skills() {
  const { frontend = [], backend = [], tools = [] } = portfolioConfig.skills || {};

  const categories = [
    { title: 'FRONTEND', skills: frontend },
    { title: 'PROGRAMMING LANGUAGES', skills: backend },
    { title: 'TOOLS & TECHNOLOGIES', skills: tools }
  ];

  return (
    <section id="skills" className="section">
      <h2 className="section-title left-align-title">Technical Arsenal</h2>
      
      <div className="skills-stack">
        {categories.map((cat, idx) => (
          <div key={idx} className="skills-panel glass-panel">
            <h3 className="skills-category-title">{cat.title}</h3>
            <div className="skills-badges-grid">
              {(cat.skills || []).map((skill, sIdx) => (
                <div key={sIdx} className="skill-badge">
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
