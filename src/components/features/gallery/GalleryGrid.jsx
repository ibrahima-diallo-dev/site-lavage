import { BeforeAfterCard } from './BeforeAfterCard';
import styles from './Gallery.module.css';

const REAL_GALLERY = [
    {
        id: 1,
        before: '/voitureSalle.webp',
        after: '/voitureNettoye.webp',
        label: 'Nettoyage Extérieur & Intérieur'
    },
    {
        id: 2,
        before: '/voitureAvantPolissage.webp',
        after: '/voitureApresPolissage.webp',
        label: 'Polissage & Rénovation Carrosserie'
    }
];

export const GalleryGrid = () => {
    return (
        <section id="gallery" className={`section ${styles.gallerySection}`}>
            <div className="container">
                <h2 className="text-center mb-md">Nos Réalisations</h2>
                <p className="text-center mb-md text-muted">Découvrez l'efficacité de nos services vapeur.</p>
                <div className={styles.grid}>
                    {REAL_GALLERY.map(item => (
                        <BeforeAfterCard
                            key={item.id}
                            beforeImg={item.before}
                            afterImg={item.after}
                            label={item.label}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
