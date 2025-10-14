import styles from './HeroSection.module.css';

interface HeroSectionProps {
  mainImageSrc?: string;
  mainImageAlt?: string;
  secondaryImageSrc?: string;
  secondaryImageAlt?: string;
}

function HeroSection ({
  mainImageSrc,
  mainImageAlt = 'Main image',
  secondaryImageSrc,
  secondaryImageAlt = 'Secondary image',
}: HeroSectionProps) {
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
              <button 
                className={`${styles.hero__submitButton} btn_main`}
              >
                Submit a new club
              </button>
            </div>
          </div>
        </div>

        <div className={`${styles.hero__side} fp`}>
          <div className={styles.hero__imageWrapper}>
            {mainImageSrc ? (
              <img 
                src={mainImageSrc} 
                alt={mainImageAlt}
                className={styles.hero__image}
              />
            ) : (
              <div className={styles.hero__imagePlaceholder}>
                <svg 
                  className={styles.hero__placeholderIcon}
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="24" height="24" rx="4" fill="#B8B8B8"/>
                  <path d="M8 14L10.5 11L13 14L16 10L18 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="9" cy="8" r="1.5" fill="white"/>
                </svg>
              </div>
            )}
          </div>
          
          <div className={`${styles.hero__imageWrapper} ${styles['hero__imageWrapper--small']}`}>
            {secondaryImageSrc ? (
              <img 
                src={secondaryImageSrc} 
                alt={secondaryImageAlt}
                className={styles.hero__image_secondary}
              />
            ) : (
              <div className={styles.hero__imagePlaceholder}>
                <svg 
                  className={styles.hero__placeholderIcon}
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="24" height="24" rx="4" fill="#B8B8B8"/>
                  <path d="M8 14L10.5 11L13 14L16 10L18 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="9" cy="8" r="1.5" fill="white"/>
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};


export default HeroSection;