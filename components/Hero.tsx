import React from 'react';
import { useTranslations } from '../hooks/useTranslations';

interface HeroProps {
  onNavigateToJobs: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigateToJobs }) => {
  const { t } = useTranslations();
  
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavigateToJobs();
  };

  return (
    <section id="home" className="hero-bg h-[400px] sm:h-[500px] flex items-center justify-center text-center">
      <div className="z-10 p-4">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 text-shadow-custom">
          {t('heroTitle')}
        </h2>
        <p className="text-lg sm:text-xl text-yellow-300 mb-8 text-shadow-custom">
          {t('heroSubtitle')}
        </p>
        <a href="#jobs-page" onClick={handleNavClick} className="bg-yellow-500 hover:bg-yellow-600 text-sky-900 font-bold py-3 px-8 rounded-lg shadow-xl transition duration-300 transform hover:scale-105">
          {t('heroButton')}
        </a>
      </div>
    </section>
  );
};

export default Hero;
