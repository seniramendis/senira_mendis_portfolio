import Reveal from '@/components/ui/Reveal';
import styles from './IdeaToProduct.module.css';

export default function IdeaToProduct() {
  return (
    <section id="idea-to-product" className={styles.section}>
      <div className={styles.wrap}>
        <Reveal className={styles.visualCol}>
          <img
            className={styles.visual}
            src="https://res.cloudinary.com/dukv2otyn/image/upload/v1789056548/mobile_ui_mockuo_serv_foo5bz.png"
            alt="Hand holding a phone with a mobile UI mockup of a product design"
            loading="lazy"
          />
        </Reveal>

        <div className={styles.textCol}>
          <Reveal><div className={styles.kicker}>Process</div></Reveal>
          <Reveal delay={80}>
            <h2 className={styles.heading}>
              From idea <em>to product.</em>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className={styles.sub}>
              I design and engineer digital experiences across web, mobile and backend systems.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
