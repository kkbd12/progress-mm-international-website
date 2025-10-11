import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';

// Helper to access nested properties from a string key like 'a.b.c'
const getNestedTranslation = (obj: any, key: string): string | undefined => {
    return key.split('.').reduce((o, i) => (o ? o[i] : undefined), obj);
};

export const useTranslations = () => {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error('useTranslations must be used within a LanguageProvider');
    }

    const t = (key: string, replacements?: Record<string, string | number>): string => {
        const translation = getNestedTranslation(context.translations, key);
        
        if (!translation) {
            console.warn(`Translation not found for key: ${key}`);
            return key;
        }

        if (replacements) {
            return Object.entries(replacements).reduce((acc, [k, v]) => {
                return acc.replace(`{{${k}}}`, String(v));
            }, translation);
        }

        return translation;
    };

    return {
        locale: context.locale,
        setLocale: context.setLocale,
        t,
    };
};
