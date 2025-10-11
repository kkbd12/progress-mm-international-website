import React, { useState, useMemo } from 'react';
import { COUNTRIES } from '../constants';
import { Job } from '../types';
import { useTranslations } from '../hooks/useTranslations';

const JobCard: React.FC<{ job: Job }> = ({ job }) => {
    const { t, locale } = useTranslations();
    const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute('href');
        if (!href) return;
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border-t-4 border-green-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden">
            <img src={job.imageUrl} alt={job.role[locale]} className="w-full h-48 object-cover" />
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-800">{job.role[locale]}</h3>
                {job.company && <p className="text-md font-semibold text-sky-700 mb-2">{job.company[locale]}</p>}
                
                <p className="text-gray-600 mb-1">{t('jobDestination')}: {job.destination[locale]}</p>
                <p className="text-gray-600 mb-4">{t('jobQuantity')}: {job.quantity} {t('jobPersonUnit')} | {t('jobSalary')}: {job.salary[locale]}</p>
                
                <div className="mt-auto pt-4 border-t border-gray-200">
                    <h4 className="font-bold text-gray-700 mb-2">{t('jobConditionsTitle')}</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        <li>{t('jobCondition1')}</li>
                        <li>{t('jobCondition2')}</li>
                        <li>{t('jobCondition3')}</li>
                        <li>{t('jobCondition4')}</li>
                    </ul>
                </div>

                <a href="#application" onClick={handleScrollClick} className="text-sm text-green-600 font-medium hover:underline mt-6 self-start">{t('jobApplyLink')} →</a>
            </div>
        </div>
    );
};

interface JobDemandsProps {
    jobs: Job[];
    isLoading: boolean;
    error: string | null;
}

const JobDemands: React.FC<JobDemandsProps> = ({ jobs, isLoading, error }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { t, locale } = useTranslations();

  const filteredJobs = useMemo(() => {
    let jobsByCountry = jobs;
    if (activeFilter !== 'all') {
      const selectedCountry = COUNTRIES.find(c => c.id === activeFilter);
      if (selectedCountry) {
        jobsByCountry = jobs.filter(job => job.destination.en === selectedCountry.name.en);
      }
    }

    if (!searchQuery.trim()) {
      return jobsByCountry;
    }

    const lowercasedQuery = searchQuery.toLowerCase();
    return jobsByCountry.filter(job =>
      job.role[locale].toLowerCase().includes(lowercasedQuery) ||
      job.destination[locale].toLowerCase().includes(lowercasedQuery) ||
      (job.company && job.company[locale].toLowerCase().includes(lowercasedQuery))
    );
  }, [activeFilter, jobs, searchQuery, locale]);

  const renderContent = () => {
      if (isLoading) {
          return <p className="text-center text-gray-600 md:col-span-2 lg:col-span-3">{t('jobLoading')}</p>;
      }
      if (error) {
          return <p className="text-center text-red-600 font-semibold md:col-span-2 lg:col-span-3">{error}</p>;
      }
      if (filteredJobs.length > 0) {
          return filteredJobs.map((job, index) => <JobCard key={index} job={job} />);
      }
      if (searchQuery) {
          return <p className="text-center text-gray-600 md:col-span-2 lg:col-span-3">{t('jobNoResults', { query: searchQuery })}</p>;
      }
      const selectedCountry = COUNTRIES.find(c => c.id === activeFilter);
      return <p className="text-center text-gray-600 md:col-span-2 lg:col-span-3">{t('jobNoJobs', { country: selectedCountry ? selectedCountry.name[locale] : '' })}</p>;
  };

  return (
    <section id="demands" className="py-16 bg-sky-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-sky-900 mb-4 text-center">{t('jobDemandsTitle')}</h2>
        
        <div className="max-w-xl mx-auto mb-10">
          <div className="relative">
            <div className="absolute inset-y-0 ltr:left-0 rtl:right-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('jobSearchPlaceholder')}
              className="w-full p-4 ltr:pl-10 rtl:pr-10 text-lg border border-gray-300 rounded-full shadow-sm focus:ring-sky-500 focus:border-sky-500"
              aria-label={t('jobSearchPlaceholder')}
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {COUNTRIES.map((country) => (
            <button
              key={country.id}
              onClick={() => setActiveFilter(country.id)}
              className={`px-6 py-2 rounded-full font-semibold shadow-md cursor-pointer transition-colors duration-300 ${
                activeFilter === country.id
                  ? 'bg-sky-900 text-white'
                  : 'bg-white text-sky-900 border border-sky-900 hover:bg-sky-100'
              }`}
            >
              {country.name[locale]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {renderContent()}
        </div>
      </div>
    </section>
  );
};

export default JobDemands;