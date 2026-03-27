import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import styles from './Contact.module.css';
import { useLanguage } from '../../../context/LanguageContext';

export const ContactForm = () => {
    const formRef = useRef();
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error
    const { t } = useLanguage();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            await emailjs.sendForm(
                import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
                formRef.current,
                import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
            );
            console.log('Email sent successfully');
            setStatus('success');
            e.target.reset(); // Clear form
        } catch (error) {
            console.error('EmailJS Error:', error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className={styles.successMessage}>
                <h3>{t('contact.form.successTitle')}</h3>
                <p>{t('contact.form.successMsg')}</p>
                <button onClick={() => setStatus('idle')} className={styles.resetBtn}>{t('contact.form.resetBtn')}</button>
            </div>
        );
    }

    return (
        <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
            {/* Hidden input for "to_name" if needed by template, defaulting to Admin */}
            <input type="hidden" name="to_name" value="JEN Business Team" />

            <div className={styles.group}>
                <label htmlFor="c-name">{t('contact.form.labelName')}</label>
                <input
                    id="c-name"
                    name="user_name" /* Standard EmailJS name */
                    type="text"
                    required
                    placeholder={t('contact.form.placeholderName')}
                />
            </div>
            <div className={styles.group}>
                <label htmlFor="c-email">{t('contact.form.labelEmail')}</label>
                <input
                    id="c-email"
                    name="user_email" /* Standard EmailJS email */
                    type="email"
                    required
                    placeholder={t('contact.form.placeholderEmail')}
                />
            </div>
            <div className={styles.group}>
                <label htmlFor="c-msg">{t('contact.form.labelMsg')}</label>
                <textarea
                    id="c-msg"
                    name="message" /* Standard EmailJS message */
                    rows="4"
                    required
                    placeholder={t('contact.form.placeholderMsg')}
                ></textarea>
            </div>

            {status === 'error' && (
                <p style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
                    {t('contact.form.errorMsg')}
                </p>
            )}

            <button type="submit" className={styles.submitBtn} disabled={status === 'submitting'}>
                {status === 'submitting' ? t('contact.form.btnLoading') : t('contact.form.btnSubmit')}
            </button>
        </form>
    );
};
