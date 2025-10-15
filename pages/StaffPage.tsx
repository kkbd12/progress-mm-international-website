import React from 'react';
import { STAFF_MEMBERS } from '../constants';
import Footer from '../components/Footer';
import { StaffCard } from '../components/StaffCard';
import { useTranslations } from '../hooks/useTranslations';

interface StaffPageProps {
  onNavigateHome: () => void;
}

import { Link } from 'react-router-dom';
const StaffPageHeader: React.FC = () => {
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
}


const StaffPage: React.FC<StaffPageProps> = ({ onNavigateHome }) => {
  const { t } = useTranslations();
  const [managingDirector, ...otherStaff] = STAFF_MEMBERS;

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <StaffPageHeader onNavigateHome={onNavigateHome} />
      <main className="flex-grow">
        <div 
          className="relative bg-cover bg-center h-80 flex items-center justify-center text-center" 
          style={{ backgroundImage: "url('https://i.imgur.com/ttvTVes.jpeg')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative z-10 p-4">
            <h1 className="text-5xl font-extrabold text-white text-shadow-custom">{t('staffPageTitle')}</h1>
          </div>
        </div>

        <div className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
                    {t('staffSubtitle')}
                </p>
                
                {/* Managing Director Section */}
                {managingDirector && (
                    <div className="mb-16 flex justify-center">
                        <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
                             <StaffCard member={managingDirector} />
                        </div>
                    </div>
                )}
                
                {/* Other Staff Section */}
                {otherStaff.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {otherStaff.map((member, index) => (
                            <StaffCard key={index} member={member} />
                        ))}
                    </div>
                )}

                <div className="text-center mt-16">
                    <button
                    onClick={onNavigateHome}
                    className="bg-sky-700 hover:bg-sky-800 text-white font-bold py-3 px-8 rounded-lg shadow-xl transition duration-300 transform hover:scale-105"
                    >
                    {t('staffBackHome')}
                    </button>
                </div>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StaffPage;
