
import React from 'react';
import { useTranslations } from '../hooks/useTranslations';

const Transparency: React.FC = () => {
  const { t } = useTranslations();
  
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-sky-900 mb-10 text-center">{t('transparencyTitle')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white p-8 rounded-xl shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('transparencyStatsTitle')}</h3>
            <ul className="space-y-3 text-lg text-gray-700">
              <li className="flex justify-between items-center border-b pb-2">
                <span>{t('transparencyTotalSent')}:</span>
                <span className="font-bold text-sky-700">12,500+ {t('jobPersonUnit')}</span>
              </li>
              <li className="flex justify-between items-center border-b pb-2">
                <span>{t('countrySaudi')}:</span>
                <span className="font-bold">7,000 {t('jobPersonUnit')}</span>
              </li>
              <li className="flex justify-between items-center border-b pb-2">
                <span>{t('countryGCC')}:</span>
                <span className="font-bold">4,000 {t('jobPersonUnit')}</span>
              </li>
              <li className="flex justify-between items-center pb-2">
                <span>{t('countryEuropeAsia')}:</span>
                <span className="font-bold">1,500 {t('jobPersonUnit')}</span>
              </li>
              <li className="pt-4 text-sm text-red-500 font-medium">
                <strong>{t('transparencyNoteTitle')}:</strong> {t('transparencyNoteText')}
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('transparencySubAgentTitle')}</h3>
            <ul className="space-y-3 text-lg text-gray-700">
              <li className="border-b pb-2">
                <span className="font-bold block text-sky-700">1. {t('transparencySubAgent1Name')}</span>
                <span className="text-sm block">{t('transparencySubAgent1Details')}</span>
              </li>
              <li className="border-b pb-2">
                <span className="font-bold block text-sky-700">2. {t('transparencySubAgent2Name')}</span>
                <span className="text-sm block">{t('transparencySubAgent2Details')}</span>
              </li>
              <li className="pt-4 text-green-600 font-medium">
                <strong>{t('transparencySubAgentNote')}</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Transparency;