import { useLanguage } from '../../context/LanguageContext';

export const LanguageSwitcher = () => {
    const { language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'fr' ? 'en' : 'fr');
    };

    return (
        <button
            onClick={toggleLanguage}
            style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid var(--color-accent)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                cursor: 'pointer',
                backdropFilter: 'blur(5px)',
                fontWeight: 'bold',
                zIndex: 1000,
                transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = 'var(--color-accent)'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
        >
            {language === 'fr' ? '🇺🇸 EN' : '🇫🇷 FR'}
        </button>
    );
};
