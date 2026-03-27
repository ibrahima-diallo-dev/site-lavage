import { useState, useEffect } from "react";
import { StorageService } from "../../../services/storageService";
import { TestimonialCard } from "./TestimonialCard";
import styles from "./Testimonials.module.css";
import {
  getRateLimitRemaining,
  isHoneypotFilled,
  markRateLimitedAction,
  sanitizeText,
} from "../../../utils/security";

const TESTIMONIAL_RATE_LIMIT_KEY = "site-testimonial-last-submit";
const FORM_RATE_LIMIT_WINDOW_MS = 30000;

export const TestimonialsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: "", rating: 5, text: "" });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    const data = await StorageService.getTestimonials();
    if (data.length === 0) {
      // Seed with mock data if empty
      const mocks = [
        {
          id: 1,
          name: "Jean Dupont",
          rating: 5,
          text: "Service impeccable, ma voiture est comme neuve !",
        },
        {
          id: 2,
          name: "Marie Martin",
          rating: 4,
          text: "Très bon rapport qualité-prix.",
        },
      ];
      setReviews(mocks);
    } else {
      setReviews(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const honeypot = String(formData.get("website") || "");

    if (isHoneypotFilled(honeypot)) {
      setErrorMessage("");
      setNewReview({ name: "", rating: 5, text: "" });
      e.currentTarget.reset();
      return;
    }

    const sanitizedReview = {
      name: sanitizeText(newReview.name, { maxLength: 80 }),
      rating: Math.min(5, Math.max(1, Number(newReview.rating) || 5)),
      text: sanitizeText(newReview.text, { maxLength: 500, multiline: true }),
    };

    if (!sanitizedReview.name || !sanitizedReview.text) {
      setErrorMessage("Veuillez entrer un nom et un commentaire valides.");
      return;
    }

    if (
      getRateLimitRemaining(
        TESTIMONIAL_RATE_LIMIT_KEY,
        FORM_RATE_LIMIT_WINDOW_MS,
      ) > 0
    ) {
      setErrorMessage("Veuillez patienter 30 secondes avant un nouvel avis.");
      return;
    }

    setErrorMessage("");
    setLoading(true);
    try {
      markRateLimitedAction(TESTIMONIAL_RATE_LIMIT_KEY);
      const added = await StorageService.addTestimonial(sanitizedReview);
      setReviews([added, ...reviews]);
      setNewReview({ name: "", rating: 5, text: "" });
      alert("Merci pour votre avis !");
      e.currentTarget.reset();
    } catch (err) {
      console.error(err);
      setErrorMessage("Impossible d'enregistrer votre avis pour le moment.");
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
            <input
              type="text"
              name="website"
              tabIndex="-1"
              autoComplete="off"
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", opacity: 0 }}
            />
            <div className={styles.formGroup}>
              <label className={styles.label}>Nom</label>
              <input
                className={styles.input}
                type="text"
                required
                autoComplete="name"
                maxLength="80"
                value={newReview.name}
                onChange={(e) =>
                  setNewReview({ ...newReview, name: e.target.value })
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Note</label>
              <select
                className={styles.input}
                value={newReview.rating}
                onChange={(e) =>
                  setNewReview({ ...newReview, rating: Number(e.target.value) })
                }
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
                maxLength="500"
                value={newReview.text}
                onChange={(e) =>
                  setNewReview({ ...newReview, text: e.target.value })
                }
              ></textarea>
            </div>
            {errorMessage && (
              <p className={styles.errorMessage}>{errorMessage}</p>
            )}
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? "Envoi..." : "Envoyer"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
