import React from 'react';
import Footer from '../components/Footer';
import { useTranslations } from '../hooks/useTranslations';

// A generic header component for sub-pages
import { Link } from 'react-router-dom';
const PortfolioPageHeader: React.FC = () => {
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

const Section: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = '' }) => (
    <section className={`py-12 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-sky-900 mb-8 border-b-4 border-yellow-500 inline-block pb-2">{title}</h2>
            {children}
        </div>
    </section>
);


const PortfolioPage: React.FC = () => {
  const { t } = useTranslations();
  
  const services = [
    { title: t('service1Title'), description: t('service1Desc'), icon: "🔧" },
    { title: t('service2Title'), description: t('service2Desc'), icon: "📄" },
    { title: t('service3Title'), description: t('service3Desc'), icon: "✈️" },
    { title: t('service4Title'), description: t('service4Desc'), icon: "🤝" },
  ];

  const achievements = [
      { value: '15+', label: t('achievement1Label') },
      { value: '12,500+', label: t('achievement2Label') },
      { value: '20+', label: t('achievement3Label') },
      { value: '98%', label: t('achievement4Label') },
  ];

  const galleryImages = [
      'https://picsum.photos/seed/gallery1/600/400',
      'https://picsum.photos/seed/gallery2/600/400',
      'https://picsum.photos/seed/gallery3/600/400',
      'https://picsum.photos/seed/gallery4/600/400',
      'https://picsum.photos/seed/gallery5/600/400',
      'https://picsum.photos/seed/gallery6/600/400',
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
        <PortfolioPageHeader />
        <main>
            <div className="bg-sky-800 text-white py-16 text-center">
                 <h1 className="text-5xl font-extrabold">{t('portfolioTitle')}</h1>
                 <p className="mt-4 text-xl text-sky-200">{t('portfolioSubtitle')}</p>
            </div>
            
            <Section title={t('portfolioAboutSectionTitle')}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div className="text-lg text-gray-700 leading-relaxed space-y-4 text-justify">
                        <p className="text-justify"><strong>{t('companyName')} ({t('rlNumberShort')})</strong> {t('portfolioAboutPara')}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-sky-500">
                               <h3 className="text-2xl font-bold text-sky-800 mb-2">{t('portfolioMissionTitle')}</h3>
                               <p className="text-justify">{t('portfolioMissionDesc')}</p>
                            </div>
                             <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                               <h3 className="text-2xl font-bold text-green-800 mb-2">{t('portfolioVisionTitle')}</h3>
                               <p className="text-justify">{t('portfolioVisionDesc')}</p>
                            </div>
                        </div>
                    </div>
                     <div className="space-y-8">
                        <div className="bg-white p-4 rounded-lg shadow-lg">
                            <img src="https://i.imgur.com/yC0Eopd.jpeg" alt={t('portfolioLicense1Alt')} className="rounded-md w-full" />
                            <p className="text-center text-sm text-gray-600 mt-2 font-medium">{t('portfolioLicense1Alt')}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-lg">
                            <img src="https://i.imgur.com/EWrnC9Y.jpeg" alt={t('portfolioLicense2Alt')} className="rounded-md w-full" />
                            <p className="text-center text-sm text-gray-600 mt-2 font-medium">{t('portfolioLicense2Alt')}</p>
                        </div>
                    </div>
                </div>
            </Section>
            
            <Section title={t('portfolioBangladeshSectionTitle')} className='bg-white'>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="order-2 lg:order-1">
                        <p className="text-lg text-gray-700 leading-relaxed text-justify">{t('portfolioBangladeshPara')}</p>
                    </div>
                    <div className="order-1 lg:order-2">
                        <img src="https://i.imgur.com/XZFWGCX.jpeg" alt={t('portfolioBangladeshImageAlt')} className="rounded-lg shadow-xl w-full h-80 object-cover" />
                    </div>
                </div>
            </Section>

            <Section title={t('portfolioManpowerSectionTitle')}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                         <img src="https://i.imgur.com/eF8Z1zV.jpeg" alt={t('portfolioManpowerImageAlt')} className="rounded-lg shadow-xl w-full h-80 object-cover" />
                    </div>
                    <div>
                        <p className="text-lg text-gray-700 leading-relaxed text-justify">{t('portfolioManpowerPara')}</p>
                    </div>
                </div>
            </Section>

            <Section title={t('portfolioTrainingSectionTitle')} className='bg-white'>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                     <div className="order-2 lg:order-1">
                        <p className="text-lg text-gray-700 leading-relaxed text-justify">{t('portfolioTrainingPara')}</p>
                    </div>
                    <div className="order-1 lg:order-2">
                         <img src="https://i.imgur.com/NpU8VpI.jpeg" alt={t('portfolioTrainingImageAlt')} className="rounded-lg shadow-xl w-full h-80 object-cover" />
                    </div>
                </div>
            </Section>

            <Section title={t('portfolioServicesSectionTitle')}>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map(service => (
                        <div key={service.title} className="bg-sky-50 p-6 rounded-xl text-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <div className="text-4xl mb-4">{service.icon}</div>
                            <h3 className="text-xl font-bold text-sky-900 mb-2">{service.title}</h3>
                            <p className="text-gray-600">{service.description}</p>
                        </div>
                    ))}
                 </div>
            </Section>

            <Section title={t('portfolioAchievementsSectionTitle')} className="bg-white">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                  {achievements.map((item, index) => (
                    <div key={index} className="p-6 bg-sky-50 rounded-xl shadow-md border-b-4 border-yellow-500">
                      <p className="text-5xl font-extrabold text-sky-900">{item.value}</p>
                      <p className="mt-2 text-lg text-gray-600">{item.label}</p>
                    </div>
                  ))}
                </div>
            </Section>
            
            <Section title={t('portfolioGallerySectionTitle')}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryImages.map((src, index) => (
                        <div key={index} className="overflow-hidden rounded-lg shadow-lg">
                           <img src={src} alt={`${t('portfolioGalleryImageAlt')} ${index + 1}`} className="w-full h-64 object-cover transform hover:scale-110 transition-transform duration-500" />
                        </div>
                    ))}
                </div>
            </Section>

        </main>
        <Footer />
    </div>
  );
};

export default PortfolioPage;