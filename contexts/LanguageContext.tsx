import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Locale } from '../types';

interface LanguageContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    translations: any;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translationsCache: Partial<Record<Locale, any>> = {};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [locale, setLocaleState] = useState<Locale>(() => {
        const savedLocale = localStorage.getItem('locale');
        return (savedLocale as Locale) || 'en';
    });
    const [translations, setTranslations] = useState<any>({});

    useEffect(() => {
        const loadTranslations = async () => {
            if (translationsCache[locale]) {
                setTranslations(translationsCache[locale]);
            } else {
                try {
                    const response = await fetch(`/translations/${locale}.json`);
                    const data = await response.json();
                    translationsCache[locale] = data;
                    setTranslations(data);
                } catch (error) {
                    console.error(`Could not load translations for ${locale}`, error);
                }
            }
        };

        loadTranslations();
    }, [locale]);

    useEffect(() => {
        document.documentElement.lang = locale;
        document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    }, [locale]);

    const setLocale = (newLocale: Locale) => {
        setLocaleState(newLocale);
        localStorage.setItem('locale', newLocale);
    };

    return (
        <LanguageContext.Provider value={{ locale, setLocale, translations }}>
            {Object.keys(translations).length > 0 ? children : <div>Loading...</div>}
        </LanguageContext.Provider>
    );
};