import React from 'react';
import { STAFF_MEMBERS } from '../constants';
import { StaffCard } from './StaffCard';
import { useTranslations } from '../hooks/useTranslations';

interface StaffProps {
    onNavigateToStaff: () => void;
}

const Staff: React.FC<StaffProps> = ({ onNavigateToStaff }) => {
    const { t } = useTranslations();
    const staffPreview = STAFF_MEMBERS.slice(0, 4);

    return (
        <section id="staff" className="py-16 bg-sky-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold mb-10 text-center">{t('staffTitle')}</h2>
                <p className="text-center text-lg mb-12 text-sky-200">
                    {t('staffSubtitle')}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {staffPreview.map((member, index) => (
                        <StaffCard key={index} member={member} />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <button
                        onClick={onNavigateToStaff}
                        className="bg-yellow-500 hover:bg-yellow-600 text-sky-900 font-bold py-3 px-8 rounded-lg shadow-xl transition duration-300 transform hover:scale-105"
                        aria-label={t('staffViewAllAria')}
                    >
                        {t('staffViewAll')}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Staff;
