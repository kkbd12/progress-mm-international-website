import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { Locale } from '../types';

const LanguageSwitcher: React.FC = () => {
    const { locale, setLocale } = useTranslations();

    const languages: { code: Locale; name: string }[] = [
        { code: 'bn', name: 'বাংলা' },
        { code: 'en', name: 'English' },
        { code: 'ar', name: 'العربية' },
    ];

    return (
        <div className="flex items-center ltr:ml-6 rtl:mr-6 bg-sky-800 p-1 rounded-lg border border-sky-700">
            {languages.map(lang => (
                <button
                    key={lang.code}
                    onClick={() => setLocale(lang.code)}
                    className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none ${
                        locale === lang.code
                            ? 'bg-yellow-400 text-sky-900 shadow-sm'
                            : 'text-white hover:bg-sky-700'
                    }`}
                >
                    {lang.name}
                </button>
            ))}
        </div>
    );
};

export default LanguageSwitcher;
