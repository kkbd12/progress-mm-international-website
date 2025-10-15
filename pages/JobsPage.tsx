
import React from 'react';
import JobDemands from '../components/JobDemands';
import JobApplicationForm from '../components/JobApplicationForm';
import Footer from '../components/Footer';
import { useTranslations } from '../hooks/useTranslations';
import { Job } from '../types';
import { JOB_DEMANDS } from '../constants';



import { Link } from 'react-router-dom';
const JobsPageHeader: React.FC = () => {
    const { t, locale } = useTranslations();
    return (
        <header className="bg-sky-900 shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center">
                <h1 className="text-xl md:text-2xl font-bold text-white tracking-wider">{t('companyName')}</h1>
                 <span className={`ml-4 px-3 py-1 bg-yellow-400 text-sky-900 text-xs font-semibold rounded-full hidden sm:inline-block ${locale === 'ar' ? 'mr-4' : 'ml-4'}`}>{t('rlNumberShort')}</span>
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


const JobsPage: React.FC = () => {
  const jobs: Job[] = JOB_DEMANDS;

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <JobsPageHeader />
      <main>
        <JobDemands jobs={jobs} isLoading={false} error={null} />
        <JobApplicationForm jobs={jobs} />
      </main>
      <Footer />
    </div>
  );
};

export default JobsPage;
