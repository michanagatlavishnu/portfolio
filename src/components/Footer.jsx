import React from 'react';
import { portfolioConfig } from '../portfolioConfig';

export default function Footer() {
  const { name } = portfolioConfig.personal;

  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} {name}. Built with care & precision.</p>
    </footer>
  );
}
