import styles from './Testimonials.module.css';

export const TestimonialCard = ({ name, rating, text }) => {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <span className={styles.name}>{name}</span>
                <span className={styles.stars}>{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</span>
            </div>
            <p className={styles.text}>"{text}"</p>
        </div>
    );
};
