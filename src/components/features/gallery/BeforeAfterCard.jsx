import { useState, useRef, useEffect } from 'react';
import styles from './Gallery.module.css';

export const BeforeAfterCard = ({ beforeImg, afterImg, label }) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [containerWidth, setContainerWidth] = useState('100%');
    const containerRef = useRef(null);

    // Sync width on mount and resize so inner image matches container
    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                setContainerWidth(`${containerRef.current.offsetWidth}px`);
            }
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const handleMove = (clientX) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
        setSliderPosition(percent);
    };

    const handleMouseMove = (e) => handleMove(e.clientX);
    const handleTouchMove = (e) => handleMove(e.touches[0].clientX);

    return (
        <div
            className={styles.card}
        >
            <div
                className={styles.imageContainer}
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
            >
                <img src={afterImg} alt="After" className={styles.imageAfter} />

                <div
                    className={styles.imageBeforeWrapper}
                    style={{ width: `${sliderPosition}%` }}
                >
                    {/* Inner image set to full container width to prevent squishing */}
                    <img
                        src={beforeImg}
                        alt="Before"
                        className={styles.imageBefore}
                        style={{ width: containerWidth }}
                    />
                </div>

                <div
                    className={styles.sliderHandle}
                    style={{ left: `${sliderPosition}%` }}
                >
                    <div className={styles.sliderLine}></div>
                    <div className={styles.sliderButton}>⇄</div>
                </div>

                <div className={styles.labels}>
                    <span className={styles.labelBefore}>Avant</span>
                    <span className={styles.labelAfter}>Après</span>
                </div>
            </div>
            <div className={styles.cardContent}>
                <h3>{label}</h3>
            </div>
        </div>
    );
};
