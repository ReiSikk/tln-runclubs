import React from "react";
import Image from "next/image";
import styles from "../page.module.css";
import ctaImage from "../assets/runclub__img.webp"

function CtaSection({ variant }: { variant?: string }) {
  return (
    <section className={`${styles.ctaSection} ${variant === 'white-bg' ? styles.whiteBg : ''}`}>
      <div className={`${styles.ctaSection__main} col-m-12 col-t-6 col-d-6`}>
        <h4 className={`${styles.ctaSection__title} h2 italic`}>Know of a run club we haven't listed?</h4>
        <p className={styles.ctaSection__text}>
          Help us build the most comprehensive directory of run clubs in Tallinn. Submit your club or suggest one you
          know about.
        </p>
        {/* //TODO: Add correct email here!! */}
        <a href="mailto:someemail@some.com" role="button" aria-label="Send email enquiry" className={`${styles.ctaSection__btn} btn_main`}>Let us know!</a>
      </div>
      <div className={`${styles.ctaSection__side} col-m-12 col-t-6 col-d-6`}>
        <Image
          src={ctaImage}
          alt="Join a running club"
          width={614}
          height={416}
          className={styles.ctaSection__image}
        />
      </div>
    </section>
  );
}

export default CtaSection;
