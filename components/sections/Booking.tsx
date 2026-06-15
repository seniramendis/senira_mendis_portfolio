'use client';
import { useEffect } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';
import styles from './Booking.module.css';

export default function Booking() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", { 
        theme: "dark", /* Set back to dark */
        styles: { 
          branding: { brandColor: "#D4AF37" } 
        }, 
        hideEventTypeDetails: false, 
        layout: "month_view" 
      });
    })();
  }, []);

  return (
    <section id="book" className={styles.bookingSec}>
      <div className={styles.container}>
        
        {/* Left Side: Luxury Typography & Copy */}
        <div className={styles.copyWrapper}>
          <div className={styles.secLabel}>
            <span className={styles.line} />
            Availability
          </div>
          
          <h2 className={styles.h2}>
            Let's build something <br />
            <em>exceptional.</em>
          </h2>
          
          <p className={styles.sub}>
            Whether you need a full-stack architecture consultation, a custom mobile application, or a seamless web platform, let's discuss your vision. 
          </p>
          
          <div className={styles.contactInfo}>
            <p className={styles.infoTitle}>Direct Contact</p>
            <a href="mailto:contact@seniramendis.com" className={styles.infoLink}>seniramendis41@gmail.com</a>
          </div>
        </div>

        {/* Right Side: The Cal.com Embed */}
        <div className={styles.calWrapper}>
          <div className={styles.calGlass}>
            <Cal 
              calLink="senira-mendis" 
              style={{ width: "100%", height: "100%", overflow: "scroll" }}
              config={{ layout: "month_view", theme: "dark" }} /* Set back to dark */
            />
          </div>
        </div>

      </div>
    </section>
  );
}