import React, { useState } from 'react';
import { useTranslations } from '../hooks/useTranslations';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
    onNavigateToStaff: () => void;
    onNavigateToJobs: () => void;
    onNavigateToPortfolio: () => void;
    onNavigateToContact: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigateToStaff, onNavigateToJobs, onNavigateToPortfolio, onNavigateToContact }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, locale } = useTranslations();

  const navLinks = [
    { href: '#home', text: t('navHome') },
    { href: '#portfolio-page', text: t('navAbout') },
    { href: '#jobs-page', text: t('navJobs') },
    { href: '#staff-page', text: t('navStaff') },
    { href: '#contact-page', text: t('navContact') },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (!href) return;

    if (href === '#staff-page') {
        onNavigateToStaff();
    } else if (href === '#jobs-page') {
        onNavigateToJobs();
    } else if (href === '#portfolio-page') {
        onNavigateToPortfolio();
    } else if (href === '#contact-page') {
        onNavigateToContact();
    } else {
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
    
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="bg-sky-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-wider">{t('companyName')}</h1>
            <span className={`px-3 py-1 bg-yellow-400 text-sky-900 text-xs font-semibold rounded-full hidden sm:inline-block ${locale === 'ar' ? 'mr-4' : 'ml-4'}`}>{t('rlNumberShort')}</span>
          </div>
          <div className="flex items-center">
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={handleNavClick} className="text-white hover:text-yellow-400 transition duration-300 font-medium">
                  {link.text}
                </a>
              ))}
            </nav>
            <LanguageSwitcher />
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none" aria-label="Toggle menu">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={handleNavClick} className="text-white hover:bg-sky-800 px-3 py-2 rounded-md font-medium">
                  {link.text}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
