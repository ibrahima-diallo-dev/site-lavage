import styles from './Services.module.css';
import { useLanguage } from '../../../context/LanguageContext';

export const ServicesList = () => {
    const { t } = useLanguage();

    const services = [
        { id: 1, title: t('services.items.1'), icon: '🧹' },
        { id: 2, title: t('services.items.2'), icon: '💨' },
        { id: 3, title: t('services.items.3'), icon: '🚪' },
        { id: 4, title: t('services.items.4'), icon: '🪟' },
        { id: 5, title: t('services.items.5'), icon: '✨' },
        { id: 6, title: t('services.items.6'), icon: '🧼' },
        { id: 7, title: t('services.items.7'), icon: '🌿' },
        { id: 8, title: t('services.items.8'), icon: '⚙️' }
    ];

    const benefits = t('services.benefits'); // Expecting array from keys.js (need to verify keys.js structure support)

    return (
        <section id="services" className={`section ${styles.section}`}>
            <div className="container">
                <h2 className="text-center mb-md">{t('services.title')} <span style={{ color: 'var(--color-primary)' }}>{t('services.titleAccent')}</span></h2>

                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '2rem', marginBottom: '3rem' }}>
                    <div style={{ flex: '1 1 300px', maxWidth: '500px' }}>
                        <p className="mb-md">
                            Chez <strong>{t('services.descriptionStrong')}</strong>, {t('services.description')} <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>{t('services.descriptionHighlight')}</span>.
                            {t('services.descriptionRest')}
                        </p>
                        <ul style={{ listStyle: 'none', paddingLeft: 0, color: 'var(--color-text-muted)' }}>
                            {Array.isArray(benefits) && benefits.map((b, i) => (
                                <li key={i} style={{ marginBottom: '0.5rem' }}>{b}</li>
                            ))}
                        </ul>
                    </div>
                    <div style={{ flex: '0 1 300px' }}>
                        <img src="/Pictogramme.jpg" alt="Services Pictogramme" style={{ width: '100%', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    </div>
                </div>

                <div className={styles.grid}>
                    {services.map(s => (
                        <div key={s.id} className={styles.card}>
                            <div className={styles.icon}>{s.icon}</div>
                            <h3 className={styles.title}>{s.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
