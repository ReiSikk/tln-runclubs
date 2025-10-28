import Image from 'next/image';
// Styles
import styles from './HeroSection.module.css';
// Assets
import mainImageSrc from '@/app/assets/hero__main.webp';
import secondaryImageSrc from '@/app/assets/hero__secondary.webp';

function HeroSection () {
  return (
    <section className={`${styles.heroSection}`}>
      <div className={`${styles.heroSection__wrapper}`}>
        <div className={`${styles.hero__main} fp-col`}>
          <h1 className={`${styles.hero__title} h2`}>Find Your Running Community in Estonia</h1>    
          <div className={`${styles.hero__actions} fp`}>
            <p className="txt-body">Join fellow runners across Estonia and discover local clubs that match your pace and goals. Whether you&apos;re training for your first 5K or logging weekly miles with friends, there&apos;s a club waiting to welcome you.</p>
            <div className={`${styles.buttons} fp`}>
              <a href="#home-clubs-list" 
                className="btn_main white"
              >
                Find a Club
              </a>
              <a
                href="https://tally.so/r/w87zDO"
                target="_blank"
                rel="noopener noreferrer" 
                className={`${styles.hero__submitButton} btn_main`}
                data-attr="hero-submit-club-click"
                data-umami-event="CTA to Tally form"
                data-custom-id="cta-to-tallyForm"
              >
                Submit a new club
              </a>
            </div>
          </div>
        </div>

        <div className={`${styles.hero__side} fp`}>
          <div className={styles.hero__imageWrapper}>
            {mainImageSrc ? (
              <Image 
                src={mainImageSrc} 
                alt={"Runners in a scenic outdoor setting"}
                width={876}
                height={1314}
                className={styles.hero__image}
                fetchPriority="high"
              />
            ) : (
              <div>
                <Image
                  unoptimized
                  src="https://placehold.co/438x657/svg?text=No+image+found"
                  alt="Placeholder image"
                  width={438}
                  height={657}
                  className={styles.hero__image}
                />
              </div>
            )}
          </div>
          
          <div className={`${styles.hero__imageWrapper} ${styles['hero__imageWrapper--small']}`}>
            {secondaryImageSrc ? (
              <Image 
                src={secondaryImageSrc} 
                alt={"Runners in a scenic outdoor setting"}
                width={328}
                height={328}
                className={styles.hero__image_secondary}
              />
            ) : (
              <div className={styles.hero__imagePlaceholder}>
                <Image 
                  unoptimized
                  src={"https://placehold.co/328x328/svg?text=No+image+found"} 
                  alt={"Runners in a scenic outdoor setting"}
                  width={328}
                  height={328}
                  className={styles.hero__image_secondary}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};


export default HeroSection;