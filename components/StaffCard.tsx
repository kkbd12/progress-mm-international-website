import React from 'react';
import { StaffMember } from '../types';
import { useTranslations } from '../hooks/useTranslations';

export const StaffCard: React.FC<{ member: StaffMember }> = ({ member }) => {
    const { t, locale } = useTranslations();
    const imageUrl = member.imageUrl || `https://placehold.co/100x100/fec31a/0c4a6e?text=${member.imgPlaceholder}`;
    return (
        <div className="bg-white text-gray-900 p-6 rounded-xl shadow-2xl text-center transform hover:-translate-y-2 transition-transform duration-300 h-full flex flex-col justify-start">
            <img 
                src={imageUrl} 
                alt={member.name[locale]}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-yellow-400"
            />
            <h3 className="text-xl font-bold">{member.name[locale]}</h3>
            <p className="text-sky-700 font-semibold">
                {member.position[locale]}
                {locale !== 'en' && ` (${member.position.en})`}
            </p>
            <p className="text-sm mt-2 text-gray-600 flex-grow">{t('staffResponsibility')}: {member.responsibility[locale]}</p>
        </div>
    );
};