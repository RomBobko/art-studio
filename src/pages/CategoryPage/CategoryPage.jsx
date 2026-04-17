import { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./CategoryPage.module.css";
import categories from "../../data/categories";
import artworks from "../../data/artworks";
import ArtworkCard from "../../components/sections/discover/TrendingArtworks/ArtworkCard";
import { toArtworkCardProps } from "../../data/artworkPreview";
import CategoryFilter from "./CategoryFilter";

const DEFAULT_SORT_BY = "newest";
const INITIAL_VISIBLE_COUNT = 6;
const LOAD_MORE_STEP = 3;
const createInitialSelectedFilters = () => ({
  medium: [],
  year: [],
});

const CategoryPageContent = ({ categorySlug }) => {
  const [sortBy, setSortBy] = useState(DEFAULT_SORT_BY);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [selectedFilters, setSelectedFilters] = useState(
    createInitialSelectedFilters,
  );

  const category = categories.find((item) => item.slug === categorySlug);

  if (!category) {
    return <h1>Category not found</h1>;
  }

  const categoryArtworks = artworks.filter((artwork) =>
    artwork.categoryIds.includes(category.id),
  );
  const filteredCategoryArtworks = categoryArtworks.filter((artwork) => {
    const matchesMedium =
      selectedFilters.medium.length === 0 ||
      selectedFilters.medium.includes(artwork.medium);
    const matchesYear =
      selectedFilters.year.length === 0 ||
      selectedFilters.year.includes(String(artwork.year));

    return matchesMedium && matchesYear;
  });
  const sortedCategoryArtworks = [...filteredCategoryArtworks].sort(
    (firstArtwork, secondArtwork) => {
      switch (sortBy) {
        case "oldest":
          return firstArtwork.year - secondArtwork.year;
        case "price-low":
          return firstArtwork.price - secondArtwork.price;
        case "price-high":
          return secondArtwork.price - firstArtwork.price;
        case "title":
          return firstArtwork.title.localeCompare(secondArtwork.title);
        case DEFAULT_SORT_BY:
        default:
          return secondArtwork.year - firstArtwork.year;
      }
    },
  );
  const visibleArtworks = sortedCategoryArtworks.slice(0, visibleCount);
  const hasMoreArtworks = visibleCount < sortedCategoryArtworks.length;
  const filterGroups = [
    {
      name: "medium",
      label: "Mediums",
      options: [...new Set(categoryArtworks.map((artwork) => artwork.medium))].map(
        (medium) => ({
          value: medium,
          label: medium,
        }),
      ),
    },
    {
      name: "year",
      label: "Years",
      options: [...new Set(categoryArtworks.map((artwork) => artwork.year))]
        .sort((firstYear, secondYear) => secondYear - firstYear)
        .map((year) => ({
          value: String(year),
          label: String(year),
        })),
    },
  ];

  const handleSortChange = (evt) => {
    setSortBy(evt.target.value);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const handleFilterChange = (groupName, optionValue) => {
    setSelectedFilters((prevSelectedFilters) => {
      const currentGroupValues = prevSelectedFilters[groupName];
      const nextGroupValues = currentGroupValues.includes(optionValue)
        ? currentGroupValues.filter((value) => value !== optionValue)
        : [...currentGroupValues, optionValue];

      return {
        ...prevSelectedFilters,
        [groupName]: nextGroupValues,
      };
    });
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const handleLoadMore = () => {
    setVisibleCount((prevVisibleCount) =>
      Math.min(prevVisibleCount + LOAD_MORE_STEP, sortedCategoryArtworks.length),
    );
  };

  return (
    <>
      <section
        className={styles.hero}
        aria-labelledby="category-title"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.15), rgba(255,255,255,0.15)), url(${category.image})`,
        }}
      >
        <div className="container-wide">
          <div className={styles.overlay}>
            <h1 id="category-title" className={styles.title}>
              {category.name}
            </h1>
          </div>
        </div>
      </section>

      <section className={styles.catalog} aria-labelledby="artworks-heading">
        <div className="container">
          <div className={styles.catalogLayout}>
            <CategoryFilter
              groups={filterGroups}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
            />

            <div className={styles.content}>
              <div className={styles.toolbar}>
                <p className={styles.resultsCount}>
                  Showing {visibleArtworks.length} of{" "}
                  {sortedCategoryArtworks.length} artworks
                </p>

                <div className={styles.sortBox}>
                  <label htmlFor="sort">Sort by</label>
                  <select
                    id="sort"
                    name="sort"
                    value={sortBy}
                    onChange={handleSortChange}
                  >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="title">Title: A-Z</option>
                  </select>
                </div>
              </div>

              {visibleArtworks.length > 0 ? (
                <ul className={styles.grid}>
                  {visibleArtworks.map((artwork) => (
                    <li className={styles.artworkItem} key={artwork.id}>
                      <ArtworkCard {...toArtworkCardProps(artwork)} />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={styles.empty}>
                  No artworks match the selected filters.
                </p>
              )}

              {hasMoreArtworks && (
                <button
                  type="button"
                  className={styles.loadMore}
                  onClick={handleLoadMore}
                >
                  Load More
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const CategoryPage = () => {
  const { categorySlug = "" } = useParams();

  return <CategoryPageContent key={categorySlug} categorySlug={categorySlug} />;
};

export default CategoryPage;
