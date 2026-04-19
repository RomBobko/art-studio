import useEmblaCarousel from "embla-carousel-react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";
import styles from "./FeaturedArtists.module.css";
import FeaturedArtistCard from "./FeaturedArtistCard.jsx";
import artists from "../../../../data/artists";

const FeaturedArtists = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const handlePrevious = () => {
    emblaApi?.scrollPrev();
  };

  const handleNext = () => {
    emblaApi?.scrollNext();
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>Featured Artists</h2>

        <div className={styles.slider}>
          <button
            className={styles.arrowButton}
            type="button"
            aria-label="Previous artist"
            onClick={handlePrevious}
          >
            <HiOutlineChevronLeft className={styles.icon} />
          </button>

          <div className={styles.viewport} ref={emblaRef}>
            <ul className={styles.list}>
              {artists.map(({ id, ...restProps }) => (
                <li className={styles.item} key={id}>
                  <FeaturedArtistCard {...restProps} />
                </li>
              ))}
            </ul>
          </div>

          <button
            className={styles.arrowButton}
            type="button"
            aria-label="Next artist"
            onClick={handleNext}
          >
            <HiOutlineChevronRight className={styles.icon} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtists;
