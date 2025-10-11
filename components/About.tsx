import React from 'react';
import { useTranslations } from '../hooks/useTranslations';

const About: React.FC = () => {
  const { t } = useTranslations();

  return (
    <section id="about" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-sky-900 mb-8 border-b-4 border-yellow-500 inline-block pb-2">{t('aboutTitle')}</h2>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <p className="text-lg text-gray-700 leading-relaxed mb-4 text-justify">
               <strong>{t('companyName')} ({t('rlNumberShort')})</strong> {t('aboutPara1')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed text-justify">
              {t('aboutPara2')} <strong>{t('aboutMotto')}</strong>
            </p>
          </div>
          <div className="md:w-1/2">
            <img src="https://i.imgur.com/QYipDn0.jpeg" alt={t('aboutImageAlt')} className="rounded-xl shadow-2xl object-cover w-full h-80" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;