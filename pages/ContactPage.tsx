import React from 'react';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import { useTranslations } from '../hooks/useTranslations';



import { Link } from 'react-router-dom';
const ContactPageHeader: React.FC = () => {
    const { t, locale } = useTranslations();
    return (
        <header className="bg-sky-900 shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center">
                <h1 className="text-xl md:text-2xl font-bold text-white tracking-wider">{t('companyName')}</h1>
                 <span className={`px-3 py-1 bg-yellow-400 text-sky-900 text-xs font-semibold rounded-full hidden sm:inline-block ${locale === 'ar' ? 'mr-4' : 'ml-4'}`}>{t('rlNumberShort')}</span>
              </div>
              <nav>
                <Link to="/" className="text-white hover:text-yellow-400 transition duration-300 font-medium px-4 py-2 rounded-md hover:bg-sky-800">
                  {t('navHome')}
                </Link>
              </nav>
            </div>
          </div>
        </header>
    );
};

const ContactPage: React.FC = () => {
  const { t } = useTranslations();
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
  <ContactPageHeader />
      <main className="flex-grow">
        <div className="bg-sky-800 text-white py-16 text-center">
             <h1 className="text-5xl font-extrabold">{t('contactTitle')}</h1>
             <p className="mt-4 text-xl text-sky-200 max-w-3xl mx-auto px-4">{t('contactSubtitle')}</p>
        </div>
        <Contact />
         <div className="text-center pb-16">
            <Link to="/" className="bg-sky-700 hover:bg-sky-800 text-white font-bold py-3 px-8 rounded-lg shadow-xl transition duration-300 transform hover:scale-105">
              {t('staffBackHome')}
            </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
