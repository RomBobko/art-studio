import styles from "./AboutUs.module.css";
import aboutUsImg from "../../../../assets/images/aboutUs.webp";

const AboutUs = () => {
  return (
    <section className={styles.section}>
      <div
        className={styles.about}
        style={{ "--about-image": `url(${aboutUsImg})` }}
      >
        <div className={styles.inner}>
          <div className={styles.content}>
            <h2 className={styles.title}>About Us</h2>

            <p className={styles.text}>
              ArtStudio is a creative hub where artists and art lovers come
              together. From paintings and crafts to digital and contemporary
              art, our platform celebrates diversity and creativity. Discover
              artworks that speak to your soul, learn new skills, and support
              artists worldwide, all in one place.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
