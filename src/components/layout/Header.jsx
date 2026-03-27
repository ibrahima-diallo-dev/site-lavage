import { useState } from "react";
import styles from "./Layout.module.css";
import { ThemeToggle } from "../common/ThemeToggle";

const navLinks = [
  { href: "#home", label: "Accueil" },
  { href: "#services", label: "Services" },
  { href: "#products", label: "Produits" },
  { href: "#booking", label: "Reservation" },
  { href: "#gallery", label: "Galerie" },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContent}`}>
        <div className={styles.logo}>
          <a href="#home" className={styles.logoWrap} onClick={close}>
            <img
              src="/ababacar-logo.jpg"
              alt="ABABACAR BUSINESS AGENCY"
              className={styles.logoImg}
              onError={(event) => {
                event.currentTarget.src = "/LogoBlanc.png";
              }}
            />
            <span>ABABACAR BUSINESS AGENCY</span>
          </a>
        </div>

        {/* Contrôles droits — visibles uniquement sur mobile */}
        <div className={styles.mobileControls}>
          <ThemeToggle />
          <button
            className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Nav desktop */}
        <nav className={styles.nav}>
          {navLinks.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
          <a href="#contact" className={styles.ctaButton}>
            Contact
          </a>
          <ThemeToggle />
        </nav>
      </div>

      {/* Drawer mobile */}
      {open && (
        <>
          <div className={styles.mobileOverlay} onClick={close} />
          <nav className={styles.mobileNav}>
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={close}>
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className={styles.mobileCtaButton}
              onClick={close}
            >
              Contact
            </a>
          </nav>
        </>
      )}
    </header>
  );
};
