import React, { useState } from 'react';
import { Mail, MapPin, Send } from 'lucide-react';
import { Github, Linkedin, Twitter } from './SocialIcons';
import { portfolioConfig } from '../portfolioConfig';

export default function Contact() {
  const { email, location } = portfolioConfig.personal;
  const { github, linkedin, twitter } = portfolioConfig.socials;

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // 'success', 'error', 'submitting'

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      return;
    }

    setStatus('submitting');

    // Simulate sending message
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success status after a few seconds
      setTimeout(() => setStatus(null), 5000);
    }, 1200);
  };

  return (
    <section id="contact" className="section">
      <h2 className="section-title">Get In Touch</h2>
      
      <div className="contact-grid">
        <div className="contact-info">
          <div>
            <p className="contact-desc">
              Have a project in mind, a job opportunity, or just want to chat? 
              Feel free to send a message. I'll get back to you as soon as possible.
            </p>
            
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon-wrapper">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="contact-label">Email Me</div>
                  <a href={`mailto:${email}`} className="contact-val">{email}</a>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon-wrapper">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="contact-label">Location</div>
                  <div className="contact-val">{location}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="social-tray">
            <a href={github} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href={twitter} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter">
              <Twitter size={20} />
            </a>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="contact-form glass-panel">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name</label>
            <input 
              type="text" 
              id="name"
              name="name" 
              value={formData.name}
              onChange={handleInputChange}
              className="form-input" 
              placeholder="Your Name"
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input 
              type="email" 
              id="email"
              name="email" 
              value={formData.email}
              onChange={handleInputChange}
              className="form-input" 
              placeholder="your@email.com"
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea 
              id="message"
              name="message" 
              value={formData.message}
              onChange={handleInputChange}
              className="form-input" 
              placeholder="How can I help you?"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary submit-btn" 
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Sending...' : (
              <>
                Send Message <Send size={16} />
              </>
            )}
          </button>

          {status === 'success' && (
            <div className="form-status success">
              Your message was sent successfully! I will reply shortly.
            </div>
          )}

          {status === 'error' && (
            <div className="form-status error">
              Please fill out all fields before sending.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
