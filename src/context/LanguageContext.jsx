import { createContext, useState, useContext } from 'react';
import { translations } from '../translations/keys';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('fr'); // Default to French

    const t = (path) => {
        const keys = path.split('.');
        let current = translations[language];

        for (const key of keys) {
            if (current[key] === undefined) {
                console.warn(`Translation key missing: ${path} for language ${language}`);
                return path;
            }
            current = current[key];
        }
        return current;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
