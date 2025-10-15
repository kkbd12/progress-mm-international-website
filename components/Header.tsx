
import React, { useState } from 'react';
import { useTranslations } from '../hooks/useTranslations';
import LanguageSwitcher from './LanguageSwitcher';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, locale } = useTranslations();

  const navLinks = [
    { to: '/', text: t('navHome') },
    { to: '/portfolio', text: t('navAbout') },
    { to: '/jobs', text: t('navJobs') },
    { to: '/staff', text: t('navStaff') },
    { to: '/contact', text: t('navContact') },
  ];

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
                <Link key={link.to} to={link.to} className="text-white hover:text-yellow-400 transition duration-300 font-medium">
                  {link.text}
                </Link>
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
                <Link key={link.to} to={link.to} className="text-white hover:bg-sky-800 px-3 py-2 rounded-md font-medium" onClick={() => setIsMenuOpen(false)}>
                  {link.text}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
