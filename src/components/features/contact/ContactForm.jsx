import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import styles from "./Contact.module.css";
import { useLanguage } from "../../../context/LanguageContext";
import {
  getRateLimitRemaining,
  isHoneypotFilled,
  isValidEmail,
  markRateLimitedAction,
  sanitizeEmail,
  sanitizeText,
} from "../../../utils/security";

const CONTACT_RATE_LIMIT_KEY = "site-contact-last-submit";
const FORM_RATE_LIMIT_WINDOW_MS = 30000;

export const ContactForm = () => {
  const formRef = useRef();
  const [status, setStatus] = useState("idle"); // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState("");
  const { t } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const honeypot = String(formData.get("website") || "");
    const userName = sanitizeText(formData.get("user_name"), { maxLength: 80 });
    const userEmail = sanitizeEmail(formData.get("user_email"));
    const message = sanitizeText(formData.get("message"), {
      maxLength: 1200,
      multiline: true,
    });

    if (isHoneypotFilled(honeypot)) {
      setStatus("success");
      setErrorMessage("");
      form.reset();
      return;
    }

    if (!userName || !userEmail || !message || !isValidEmail(userEmail)) {
      setStatus("error");
      setErrorMessage(
        "Veuillez fournir des informations valides avant l'envoi.",
      );
      return;
    }

    if (
      getRateLimitRemaining(CONTACT_RATE_LIMIT_KEY, FORM_RATE_LIMIT_WINDOW_MS) >
      0
    ) {
      setStatus("error");
      setErrorMessage("Veuillez patienter 30 secondes avant un nouvel envoi.");
      return;
    }

    setErrorMessage("");
    setStatus("submitting");

    try {
      markRateLimitedAction(CONTACT_RATE_LIMIT_KEY);

      await emailjs.send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          to_name: "JEN Business Team",
          user_name: userName,
          user_email: userEmail,
          message,
        },
        {
          publicKey: import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
        },
      );
      setStatus("success");
      form.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
      setErrorMessage(t("contact.form.errorMsg"));
    }
  };

  if (status === "success") {
    return (
      <div className={styles.successMessage}>
        <h3>{t("contact.form.successTitle")}</h3>
        <p>{t("contact.form.successMsg")}</p>
        <button onClick={() => setStatus("idle")} className={styles.resetBtn}>
          {t("contact.form.resetBtn")}
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
      {/* Hidden input for "to_name" if needed by template, defaulting to Admin */}
      <input type="hidden" name="to_name" value="JEN Business Team" />
      <input
        type="text"
        name="website"
        tabIndex="-1"
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", opacity: 0 }}
      />

      <div className={styles.group}>
        <label htmlFor="c-name">{t("contact.form.labelName")}</label>
        <input
          id="c-name"
          name="user_name" /* Standard EmailJS name */
          type="text"
          required
          autoComplete="name"
          maxLength="80"
          placeholder={t("contact.form.placeholderName")}
        />
      </div>
      <div className={styles.group}>
        <label htmlFor="c-email">{t("contact.form.labelEmail")}</label>
        <input
          id="c-email"
          name="user_email" /* Standard EmailJS email */
          type="email"
          required
          autoComplete="email"
          maxLength="120"
          placeholder={t("contact.form.placeholderEmail")}
        />
      </div>
      <div className={styles.group}>
        <label htmlFor="c-msg">{t("contact.form.labelMsg")}</label>
        <textarea
          id="c-msg"
          name="message" /* Standard EmailJS message */
          rows="4"
          required
          maxLength="1200"
          placeholder={t("contact.form.placeholderMsg")}
        ></textarea>
      </div>

      {status === "error" && (
        <p style={{ color: "red", marginBottom: "1rem", textAlign: "center" }}>
          {errorMessage || t("contact.form.errorMsg")}
        </p>
      )}

      <button
        type="submit"
        className={styles.submitBtn}
        disabled={status === "submitting"}
      >
        {status === "submitting"
          ? t("contact.form.btnLoading")
          : t("contact.form.btnSubmit")}
      </button>
    </form>
  );
};
