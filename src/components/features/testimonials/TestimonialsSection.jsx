import { useState, useEffect } from 'react';
import { StorageService } from '../../../services/storageService';
import { TestimonialCard } from './TestimonialCard';
import styles from './Testimonials.module.css';

export const TestimonialsSection = () => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ name: '', rating: 5, text: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadReviews();
    }, []);

    const loadReviews = async () => {
        const data = await StorageService.getTestimonials();
        if (data.length === 0) {
            // Seed with mock data if empty
            const mocks = [
                { id: 1, name: 'Jean Dupont', rating: 5, text: 'Service impeccable, ma voiture est comme neuve !' },
                { id: 2, name: 'Marie Martin', rating: 4, text: 'Très bon rapport qualité-prix.' }
            ];
            setReviews(mocks);
        } else {
            setReviews(data);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const added = await StorageService.addTestimonial(newReview);
            setReviews([added, ...reviews]);
            setNewReview({ name: '', rating: 5, text: '' });
            alert('Merci pour votre avis !');
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="testimonials" className={`section ${styles.section}`}>
            <div className="container">
                <h2 className="text-center mb-md">Avis Clients</h2>

                <div className={styles.grid}>
                    {reviews.map((r, i) => (
                        <TestimonialCard key={r.id || i} {...r} />
                    ))}
                </div>

                <div className={styles.formSection}>
                    <h3 className="text-center mb-md">Laisser un avis</h3>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Nom</label>
                            <input
                                className={styles.input}
                                type="text"
                                required
                                value={newReview.name}
                                onChange={e => setNewReview({ ...newReview, name: e.target.value })}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Note</label>
                            <select
                                className={styles.input}
                                value={newReview.rating}
                                onChange={e => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                            >
                                <option value="5">5 Étoiles</option>
                                <option value="4">4 Étoiles</option>
                                <option value="3">3 Étoiles</option>
                                <option value="2">2 Étoiles</option>
                                <option value="1">1 Étoile</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Commentaire</label>
                            <textarea
                                className={styles.textarea}
                                rows="3"
                                required
                                value={newReview.text}
                                onChange={e => setNewReview({ ...newReview, text: e.target.value })}
                            ></textarea>
                        </div>
                        <button type="submit" className={styles.submitBtn} disabled={loading}>
                            {loading ? 'Envoi...' : 'Envoyer'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};
