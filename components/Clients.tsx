import React from 'react';
import { CLIENT_LOGOS } from '../constants';
import { useTranslations } from '../hooks/useTranslations';

const Clients: React.FC = () => {
  const { t } = useTranslations();

  return (
    <section id="clients" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-sky-900 mb-10 text-center">
          {t('clientsTitle')}
        </h2>
        <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
          {t('clientsSubtitle')}
        </p>
        <div className="flex flex-wrap justify-center items-start gap-x-16 sm:gap-x-20 gap-y-16">
          {CLIENT_LOGOS.map((client, index) => (
            <div key={index} className="group flex flex-col items-center gap-4 text-center w-40 transition-transform duration-300 hover:scale-105" title={client.name}>
              <img 
                src={client.logoUrl} 
                alt={client.name} 
                className="h-20 sm:h-24 object-contain transition-all duration-300" 
              />
              <p className="text-base font-medium text-gray-700 group-hover:text-sky-800 transition-colors duration-300">
                {client.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;