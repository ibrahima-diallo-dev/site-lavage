import styles from "./Layout.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer} id="footer">
      <div className="container">
        <div className={styles.footerGrid}>
          <div>
            <h3>ABABACAR BUSINESS AGENCY</h3>
            <p className={styles.subtext}>
              Premium Auto Wash - Services de detailing et produits automobiles.
            </p>
          </div>

          <div>
            <h4>Liens rapides</h4>
            <div className={styles.footerLinks}>
              <a href="#services">Services</a>
              <a href="#products">Produits</a>
              <a href="#booking">Reservation</a>
              <a href="#contact">Contact</a>
            </div>
          </div>

          <div>
            <h4>Contact</h4>
            <p className={styles.subtext}>Telephone: +221 76 830 84 84</p>
            <p className={styles.subtext}>WhatsApp: +221 76 830 84 84</p>
            <p className={styles.subtext}>Localisation: Diamalaye Dakar</p>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.subtext}>
            &copy; {new Date().getFullYear()} ABABACAR BUSINESS AGENCY - Tous
            droits reserves.
          </p>
        </div>
      </div>
    </footer>
  );
};
