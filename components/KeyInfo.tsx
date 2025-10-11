
import React from 'react';
import { useTranslations } from '../hooks/useTranslations';

const KeyInfo: React.FC = () => {
  const { t } = useTranslations();

  const infoItems = [
    { value: 'RL-1008', label: t('keyInfoLicense') },
    { value: 'BAIRA', label: t('keyInfoMembership') },
    { value: '15+', label: t('keyInfoExperience') },
    { value: 'Saudi Arabia', label: t('keyInfoEmbassy') },
  ];

  return (
    <section className="py-12 bg-white shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {infoItems.map((item, index) => (
            <div key={index} className="p-6 bg-sky-50 rounded-xl shadow-md border-b-4 border-sky-600 transform hover:-translate-y-2 transition-transform duration-300 h-full flex flex-col justify-center">
              <p className="text-4xl font-extrabold text-sky-900">{item.value}</p>
              <p className="mt-2 text-gray-600">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyInfo;