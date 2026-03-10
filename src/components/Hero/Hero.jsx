import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Hero.module.css";
import heroImg from "../../assets/images/heroImg.webp";

const Hero = ({
  titleLines = ["Discover", "Create", "Share Art"],
  text = "ArtStudio is a space where creativity meets community. Discover unique artworks, learn from creators, and share your own artistic journey. Every brushstroke, sketch, and idea finds its place here.",
  primaryText = "Explore Art",
  secondaryText = "Start Selling",
  primaryTo = "/discover",
  secondaryTo = "/sell",
  imageSrc = heroImg,
  imageAlt = "Featured artwork",
}) => {
  const [isImageError, setIsImageError] = useState(false);

  return (
    <section className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            {titleLines.map((titleLine) => (
              <span key={titleLine} className={styles.titleLine}>
                {titleLine}
              </span>
            ))}
          </h1>

          <p className={styles.text}>{text}</p>

          <div className={styles.actions}>
            <Link to={primaryTo} className={styles.primary}>
              {primaryText}
            </Link>
            <Link to={secondaryTo} className={styles.secondary}>
              {secondaryText}
            </Link>
          </div>
        </div>
        <div className={styles.visual}>
          {imageSrc && !isImageError ? (
            <img
              className={styles.image}
              src={imageSrc}
              alt={imageAlt}
              onError={() => setIsImageError(true)}
            />
          ) : (
            <div className={styles.imageShadow} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
