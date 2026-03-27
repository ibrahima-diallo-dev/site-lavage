import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import styles from "./Home.module.css";
import {
  getRateLimitRemaining,
  isHoneypotFilled,
  isValidFutureOrTodayDate,
  isValidPhone,
  markRateLimitedAction,
  sanitizePhone,
  sanitizeText,
} from "../utils/security";

const phoneNumber = "+221768308484";
const whatsappLink = `https://wa.me/${phoneNumber}`;
const phoneNumber2 = "+221710143030";
const whatsappLink2 = `https://wa.me/${phoneNumber2}`;

const services = [
  {
    name: "Lavage prestige",
    price: "3000 - 4000 FCFA",
    image:
      "https://res.cloudinary.com/dgav7y947/image/upload/v1774539025/lavage_prestige_1_h7r0jj.jpg",
  },
  {
    name: "Semi complet",
    price: "10 000 - 12 000 FCFA",
    image:
      "https://res.cloudinary.com/dgav7y947/image/upload/v1774539270/pexels-tima-miroshnichenko-6873098_vttdiz.jpg",
  },
  {
    name: "Complet simple",
    price: "15 000 - 20 000 FCFA",
    image:
      "https://res.cloudinary.com/dgav7y947/image/upload/v1774539473/DIY-Pressure-Washing-1024x683_i2zqe3.webp",
  },
  {
    name: "Complet VIP",
    price: "20 000 - 25 000 FCFA",
    image:
      "https://res.cloudinary.com/dgav7y947/image/upload/v1774539771/pexels-tima-miroshnichenko-6873006_mbkmqv.jpg",
  },
  {
    name: "Moteur",
    price: "4000 FCFA",
    image:
      "https://res.cloudinary.com/dgav7y947/image/upload/v1774540088/OIP_3_bzogep.webp",
  },
  {
    name: "Scooter",
    price: "1500 FCFA",
    image:
      "https://res.cloudinary.com/dgav7y947/image/upload/v1774540272/OIP_4_eyyimi.webp",
  },
  {
    name: "Diagnostic",
    price: "10 000 FCFA",
    image:
      "https://res.cloudinary.com/dgav7y947/image/upload/v1774540481/Diagnostic_gpa1eb.jpg",
  },
  {
    name: "Polissage carrosserie",
    price: "15 000 FCFA",
    image:
      "https://res.cloudinary.com/dgav7y947/image/upload/v1774540783/service-worker-painting-car-auto-service_nwnirf.jpg",
  },
];

const products = [
  {
    name: "Huile moteur essence 5W30",
    category: "Huiles et lubrifiants",
    image:
      "https://res.cloudinary.com/dgav7y947/image/upload/v1774541167/Huile-5W30_mr4oxd.webp",
  },
  {
    name: "Huile moteur diesel 5W40",
    category: "Huiles et lubrifiants",
    image:
      "https://res.cloudinary.com/dgav7y947/image/upload/v1774541455/57fef54b5fcb2e176df8242fddce08e74beefe56_Huile-Motul-Synergie-5W40-Essence-5L-15303_y0yrvs.webp",
  },
  {
    name: "Huile moteur diesel 10W40",
    category: "Huiles et lubrifiants",
    image:
      "https://res.cloudinary.com/dgav7y947/image/upload/v1774541913/Capture_d_%C3%A9cran_2026-03-26_161818_bokg3k.png",
  },
  {
    name: "Huile moteur diesel 20W40",
    category: "Huiles et lubrifiants",
    image:
      "https://res.cloudinary.com/dgav7y947/image/upload/v1774541826/Capture_d_%C3%A9cran_2026-03-26_161623_fsgyqx.png",
  },
  {
    name: "Huile moteur 30",
    category: "Huiles et lubrifiants",
    image:
      "https://res.cloudinary.com/dgav7y947/image/upload/v1774542231/Capture_d_%C3%A9cran_2026-03-26_162334_tkx255.png",
  },
  {
    name: "Huile speciale Ford",
    category: "Huiles et lubrifiants",
    image:
      "https://res.cloudinary.com/dgav7y947/image/upload/v1774542400/Capture_d_%C3%A9cran_2026-03-26_162622_graiow.png",
  },
  {
    name: "Huile speciale Toyota",
    category: "Huiles et lubrifiants",
    image:
      "https://res.cloudinary.com/dgav7y947/image/upload/v1774542579/Capture_d_%C3%A9cran_2026-03-26_162925_bervha.png",
  },
  {
    name: "Huile marques francaises",
    category: "Huiles et lubrifiants",
    image:
      "https://res.cloudinary.com/dgav7y947/image/upload/v1774542767/Capture_d_%C3%A9cran_2026-03-26_163231_w48fpt.png",
  },
  {
    name: "Filtre a huile",
    category: "Filtres",
    image:
      "https://res.cloudinary.com/dgav7y947/image/upload/v1774542884/different-car-accessories-composition_zugzwx.jpg",
  },
  {
    name: "Filtre climatisation",
    category: "Filtres",
    image:
      "https://res.cloudinary.com/dgav7y947/image/upload/v1774543033/Capture_d_%C3%A9cran_2026-03-26_163650_zffwx9.png",
  },
  {
    name: "Tapis de sol",
    category: "Accessoires voiture",
    image:
      "https://res.cloudinary.com/dgav7y947/image/upload/v1774543194/Capture_d_%C3%A9cran_2026-03-26_163939_uyp3fu.png",
  },
  {
    name: "Tapis pour les pieds",
    category: "Accessoires voiture",
    image:
      "https://res.cloudinary.com/dgav7y947/image/upload/v1774543450/81FRRoQ47RL._AC_SL1500__yknfge.jpg",
  },
  {
    name: "Tapis additionnels sur mesure",
    category: "Accessoires voiture",
    image:
      "https://res.cloudinary.com/dgav7y947/image/upload/v1774545221/71R1mVXwewL._AC_SL1500__uz5equ.jpg",
  },
  {
    name: "Parfums pour voiture",
    category: "Accessoires voiture",
    image:
      "https://res.cloudinary.com/dgav7y947/image/upload/v1774543595/Comment-choisir-le-meilleur-diffuseur-de-parfum-pour-votre-voiture-1_rmkc7i.webp",
  },
  {
    name: "Pompe pour tableau de bord",
    category: "Outils et equipement",
    image:
      "https://res.cloudinary.com/dgav7y947/image/upload/v1774543840/Capture_d_%C3%A9cran_2026-03-26_165020_ovxsav.png",
  },
  {
    name: "Cles et outils automobile",
    category: "Outils et equipement",
    image:
      "https://res.cloudinary.com/dgav7y947/image/upload/v1774544532/OIP_5_ezf0yh.webp",
  },
  {
    name: "Feux stop",
    category: "Eclairage automobile",
    image:
      "https://res.cloudinary.com/dgav7y947/image/upload/v1774544668/OIP_6_m47xuv.webp",
  },
  {
    name: "Feux arriere",
    category: "Eclairage automobile",
    image:
      "https://res.cloudinary.com/dgav7y947/image/upload/v1774544828/OIP_7_dsdurp.webp",
  },
  {
    name: "Clignotants",
    category: "Eclairage automobile",
    image:
      "https://res.cloudinary.com/dgav7y947/image/upload/v1774544944/Capture_d_%C3%A9cran_2026-03-26_170850_buuacp.png",
  },
  {
    name: "Autres lampes automobiles",
    category: "Eclairage automobile",
    image:
      "https://res.cloudinary.com/dgav7y947/image/upload/v1774545062/OIP_8_xzuall.webp",
  },
];

const galleryItems = [
  { label: "Avant", image: "/voitureSalle.webp" },
  { label: "Apres", image: "/voitureNettoye.webp" },
  { label: "Avant", image: "/voitureAvantPolissage.webp" },
  { label: "Apres", image: "/voitureApresPolissage.webp" },
];

const heroBackgroundUrl =
  "https://res.cloudinary.com/dgav7y947/image/upload/v1774548392/carwash3-slider-pic2_qncowe.webp";
const heroCarUrl =
  "https://res.cloudinary.com/dgav7y947/image/upload/v1774560209/Capture_d_%C3%A9cran_2026-03-26_212237-removebg-preview_liwwbg.png";

const optimizeCloudinary = (url, width = 1200) => {
  if (
    !url ||
    !url.includes("res.cloudinary.com") ||
    !url.includes("/upload/")
  ) {
    return url;
  }

  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
};

const heroStats = [
  { value: services.length, label: "Services premium" },
  { value: products.length, suffix: "+", label: "Produits disponibles" },
  { text: "7j/7", label: "Contact WhatsApp rapide" },
];

const BOOKING_RATE_LIMIT_KEY = "site-booking-last-submit";
const FORM_RATE_LIMIT_WINDOW_MS = 30_000;

const useCountUp = (target, enabled) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!enabled || typeof target !== "number") {
      return undefined;
    }

    let frameId;
    let startTime;
    const duration = 1400;

    const tick = (time) => {
      if (!startTime) {
        startTime = time;
      }

      const progress = Math.min((time - startTime) / duration, 1);
      const nextValue = Math.round(progress * target);
      setCount(nextValue);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, [enabled, target]);

  return count;
};

const HeroStat = ({ label, suffix = "", text, value, startAnimation }) => {
  const count = useCountUp(value, startAnimation);
  const displayValue = typeof value === "number" ? `${count}${suffix}` : text;

  return (
    <article>
      <strong>{displayValue}</strong>
      <span>{label}</span>
    </article>
  );
};

export const Home = () => {
  const pageRef = useRef(null);
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);
  const [isBookingSubmitting, setIsBookingSubmitting] = useState(false);
  const [bookingFeedback, setBookingFeedback] = useState({
    type: "",
    message: "",
  });

  const emailServiceId =
    import.meta.env.VITE_APP_EMAILJS_SERVICE_ID ||
    import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const emailTemplateId =
    import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID ||
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const emailPublicKey =
    import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY ||
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsLoaderVisible(false);
    }, 1200);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isLoaderVisible ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoaderVisible]);

  useEffect(() => {
    if (isLoaderVisible || !pageRef.current) {
      return undefined;
    }

    const elements = pageRef.current.querySelectorAll("[data-reveal]");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => {
        element.setAttribute("data-visible", "true");
      });
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [isLoaderVisible]);

  const handleBookingSubmit = async (event) => {
    event.preventDefault();

    if (isBookingSubmitting) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    const honeypot = String(formData.get("website") || "");
    const service = sanitizeText(formData.get("service"), { maxLength: 80 });
    const date = String(formData.get("date") || "").trim();
    const name = sanitizeText(formData.get("name"), { maxLength: 80 });
    const phone = sanitizePhone(formData.get("phone"));

    if (isHoneypotFilled(honeypot)) {
      setBookingFeedback({
        type: "success",
        message: "Reservation envoyee avec succes.",
      });
      form.reset();
      return;
    }

    if (!service || !date || !name || !phone) {
      setBookingFeedback({
        type: "error",
        message: "Veuillez remplir tous les champs du formulaire.",
      });
      return;
    }

    if (!services.some((item) => item.name === service)) {
      setBookingFeedback({
        type: "error",
        message: "Le service selectionne est invalide.",
      });
      return;
    }

    if (!isValidFutureOrTodayDate(date)) {
      setBookingFeedback({
        type: "error",
        message: "Veuillez choisir une date valide a partir d'aujourd'hui.",
      });
      return;
    }

    if (!isValidPhone(phone)) {
      setBookingFeedback({
        type: "error",
        message: "Veuillez entrer un numero de telephone valide.",
      });
      return;
    }

    const remaining = getRateLimitRemaining(
      BOOKING_RATE_LIMIT_KEY,
      FORM_RATE_LIMIT_WINDOW_MS,
    );

    if (remaining > 0) {
      setBookingFeedback({
        type: "error",
        message: "Veuillez patienter 30 secondes avant un nouvel envoi.",
      });
      return;
    }

    if (!emailServiceId || !emailTemplateId || !emailPublicKey) {
      setBookingFeedback({
        type: "error",
        message:
          "Configuration EmailJS manquante. Ajoutez les variables VITE_APP_EMAILJS_* dans votre fichier .env.",
      });
      return;
    }

    setIsBookingSubmitting(true);
    setBookingFeedback({ type: "", message: "" });

    try {
      markRateLimitedAction(BOOKING_RATE_LIMIT_KEY);

      await emailjs.send(
        emailServiceId,
        emailTemplateId,
        {
          customer_name: name,
          customer_phone: phone,
          service_name: service,
          reservation_date: date,
          business_name: "ABABACAR BUSINESS AGENCY",
          whatsapp_1: "+221 76 830 84 84",
          whatsapp_2: "+221 71 014 30 30",
          message: `Nouvelle reservation: ${service} le ${date}. Client: ${name} (${phone}).`,
        },
        {
          publicKey: emailPublicKey,
        },
      );

      setBookingFeedback({
        type: "success",
        message:
          "Reservation envoyee avec succes. Le proprietaire recevra votre demande par email.",
      });
      form.reset();
    } catch {
      setBookingFeedback({
        type: "error",
        message:
          "Echec de l'envoi. Verifiez les cles EmailJS et la configuration du template.",
      });
    } finally {
      setIsBookingSubmitting(false);
    }
  };

  return (
    <div className={styles.page} ref={pageRef}>
      {isLoaderVisible && (
        <div className={styles.pageLoader} aria-hidden="true">
          <div className={styles.loaderHalo}></div>
          <div className={styles.loaderCore}>
            <div className={styles.loaderBrand}>ABA</div>
            <p>ABABACAR BUSINESS AGENCY</p>
            <span>Premium Auto Wash</span>
            <div className={styles.loaderProgress}>
              <i></i>
            </div>
          </div>
        </div>
      )}

      <section
        id="home"
        className={styles.hero}
        style={{
          backgroundImage: `linear-gradient(120deg, rgba(3, 10, 35, 0.68), rgba(1, 15, 45, 0.5)), url('${optimizeCloudinary(heroBackgroundUrl, 1700)}')`,
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      >
        <div className={styles.heroGlow}></div>
        <div className={`container ${styles.heroShell}`}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>ABABACAR BUSINESS AGENCY</div>
            <h1>Lavage automobile premium &amp; entretien auto</h1>
            <p>
              Des services professionnels de lavage, detailing et des produits
              automobiles de qualite pour garder votre vehicule toujours
              impeccable.
            </p>
            <div className={styles.heroButtons}>
              <a href="#booking" className={styles.primaryBtn}>
                Reserver un lavage
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className={styles.secondaryBtn}
              >
                Contact WhatsApp
              </a>
            </div>
            <div className={styles.heroHighlights}>
              <span>✔ Service professionnel</span>
              <span>✔ Produits automobiles de qualite</span>
              <span>✔ Lavage rapide et efficace</span>
            </div>
            <div className={styles.heroStats}>
              {heroStats.map((stat) => (
                <HeroStat
                  key={stat.label}
                  label={stat.label}
                  suffix={stat.suffix}
                  text={stat.text}
                  value={stat.value}
                  startAnimation={!isLoaderVisible}
                />
              ))}
            </div>
          </div>

          <div className={styles.heroVisual} aria-hidden="true">
            <div className={styles.heroOrbit}></div>
            <div className={styles.heroSpark}></div>
            <div className={styles.heroRoad}></div>
            <div className={styles.heroCarScene}>
              <img
                src={optimizeCloudinary(heroCarUrl, 950)}
                alt=""
                className={styles.heroCarImage}
                loading="lazy"
              />
            </div>
          </div>
        </div>
        <div className={styles.scrollCue} aria-hidden="true">
          <span></span>
          <small>Defiler</small>
        </div>
      </section>

      <section id="services" className={`section ${styles.sectionBlend}`}>
        <div className="container">
          <div
            className={`${styles.sectionHeading} ${styles.revealUp}`}
            data-reveal
            style={{ "--reveal-delay": "0.05s" }}
          >
            <span className={styles.kicker}>Nos Services</span>
            <h2>Tarifs lavage et detailing</h2>
          </div>
          <div
            className={`${styles.serviceGrid} ${styles.revealUp}`}
            data-reveal
            style={{ "--reveal-delay": "0.14s" }}
          >
            {services.map((service) => (
              <article key={service.name} className={styles.serviceCard}>
                <img
                  src={optimizeCloudinary(service.image, 520)}
                  alt={service.name}
                  className={styles.serviceImage}
                  loading="lazy"
                />
                <h3>{service.name}</h3>
                <p>{service.price}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className={`section ${styles.sectionDark}`}>
        <div className="container">
          <div
            className={`${styles.sectionHeading} ${styles.revealUp}`}
            data-reveal
            style={{ "--reveal-delay": "0.05s" }}
          >
            <span className={styles.kicker}>Produits Auto</span>
            <h2>Boutique et equipements automobiles</h2>
          </div>
          <div
            className={`${styles.productGrid} ${styles.revealUp}`}
            data-reveal
            style={{ "--reveal-delay": "0.16s" }}
          >
            {products.map((product) => {
              const msg = encodeURIComponent(
                `Bonjour, je suis intéressé(e) par le produit suivant : ${product.name}. Pouvez-vous me donner plus d'informations ?`,
              );
              const productWhatsappLink = `https://wa.me/${phoneNumber}?text=${msg}`;
              return (
                <article key={product.name} className={styles.productCard}>
                  <img
                    src={optimizeCloudinary(product.image, 560)}
                    alt={product.name}
                    loading="lazy"
                  />
                  <div className={styles.productBody}>
                    <h3>{product.name}</h3>
                    <span>{product.category}</span>
                    <a
                      href={productWhatsappLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Demander sur WhatsApp
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="booking" className={`section ${styles.sectionBlend}`}>
        <div
          className={`container ${styles.bookingWrap} ${styles.revealUp}`}
          data-reveal
          style={{ "--reveal-delay": "0.08s" }}
        >
          <div>
            <span className={styles.kicker}>Reservation rapide</span>
            <h2>Planifiez votre prochain lavage premium</h2>
            <p>
              Selectionnez votre service, la date et vos coordonnees. Notre
              equipe vous confirme rapidement.
            </p>
          </div>
          <form className={styles.bookingForm} onSubmit={handleBookingSubmit}>
            <input
              type="text"
              name="website"
              tabIndex="-1"
              autoComplete="off"
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", opacity: 0 }}
            />
            <label htmlFor="service">Service</label>
            <select id="service" name="service" defaultValue="" required>
              <option value="" disabled>
                Choisir un service
              </option>
              {services.map((service) => (
                <option key={service.name} value={service.name}>
                  {service.name}
                </option>
              ))}
            </select>

            <label htmlFor="date">Date</label>
            <input id="date" name="date" type="date" required />

            <label htmlFor="name">Nom</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Votre nom"
              autoComplete="name"
              maxLength={80}
              required
            />

            <label htmlFor="phone">Telephone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+221 ..."
              autoComplete="tel"
              inputMode="tel"
              maxLength={24}
              required
            />

            <button type="submit" disabled={isBookingSubmitting}>
              {isBookingSubmitting ? "Envoi en cours..." : "Reserver"}
            </button>

            {bookingFeedback.message && (
              <p
                className={`${styles.bookingStatus} ${
                  bookingFeedback.type === "success"
                    ? styles.bookingStatusSuccess
                    : styles.bookingStatusError
                }`}
                role="status"
                aria-live="polite"
              >
                {bookingFeedback.message}
              </p>
            )}
          </form>
        </div>
      </section>

      <section id="gallery" className={`section ${styles.sectionDark}`}>
        <div className="container">
          <div
            className={`${styles.sectionHeading} ${styles.revealUp}`}
            data-reveal
            style={{ "--reveal-delay": "0.05s" }}
          >
            <span className={styles.kicker}>Galerie</span>
            <h2>Resultats avant / apres</h2>
          </div>
          <div
            className={`${styles.galleryGrid} ${styles.revealUp}`}
            data-reveal
            style={{ "--reveal-delay": "0.14s" }}
          >
            {galleryItems.map((item, index) => (
              <article
                key={`${item.label}-${index}`}
                className={styles.galleryCard}
              >
                <img
                  src={item.image}
                  alt={`${item.label} lavage auto`}
                  loading="lazy"
                />
                <span>{item.label}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className={`section ${styles.sectionBlend}`}>
        <div className="container">
          <div
            className={`${styles.sectionHeading} ${styles.revealUp}`}
            data-reveal
            style={{ "--reveal-delay": "0.05s" }}
          >
            <span className={styles.kicker}>Contact</span>
            <h2>Parlons de votre vehicule</h2>
          </div>
          <div
            className={`${styles.contactGrid} ${styles.revealUp}`}
            data-reveal
            style={{ "--reveal-delay": "0.16s" }}
          >
            <article className={styles.contactCard}>
              <h3>Telephone</h3>
              <p>+221 76 830 84 84</p>
            </article>
            <article className={styles.contactCard}>
              <h3>WhatsApp</h3>
              <a href={whatsappLink} target="_blank" rel="noreferrer">
                +221 76 830 84 84
              </a>
              <a href={whatsappLink2} target="_blank" rel="noreferrer">
                +221 71 014 30 30
              </a>
            </article>
            <article className={styles.contactCard}>
              <h3>Localisation</h3>
              <p>Diamalaye Dakar</p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};
