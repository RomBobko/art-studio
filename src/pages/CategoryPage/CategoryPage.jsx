import { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./CategoryPage.module.css";
import categories from "../../data/categories";
import artworks from "../../data/artworks";
import ArtworkCard from "../../components/sections/discover/TrendingArtworks/ArtworkCard";
import { toArtworkCardProps } from "../../data/artworkPreview";
import CategoryFilter from "./CategoryFilter";

const DEFAULT_SORT_BY = "newest";
const INITIAL_VISIBLE_COUNT = 8;
const LOAD_MORE_STEP = 4;
const createInitialSelectedFilters = () => ({
  medium: [],
  style: [],
});

const getPriceBounds = (categoryArtworks) => {
  if (categoryArtworks.length === 0) {
    return {
      min: 0,
      max: 0,
    };
  }

  const prices = categoryArtworks.map((artwork) => artwork.price);

  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
};

const CategoryPageContent = ({ categorySlug }) => {
  const category = categories.find((item) => item.slug === categorySlug);
  const categoryArtworks = category
    ? artworks.filter((artwork) => artwork.categoryId === category.id)
    : [];
  const priceBounds = getPriceBounds(categoryArtworks);
  const mediumOptions = [...new Set(categoryArtworks.map((artwork) => artwork.medium))]
    .sort((firstMedium, secondMedium) => firstMedium.localeCompare(secondMedium))
    .map((medium) => ({
      value: medium,
      label: medium,
    }));
  const styleOptions = [
    ...new Set(
      categoryArtworks.flatMap((artwork) => artwork.styleTags || []),
    ),
  ]
    .sort((firstTag, secondTag) => firstTag.localeCompare(secondTag))
    .map((tag) => ({
      value: tag,
      label: tag,
    }));
  const [sortBy, setSortBy] = useState(DEFAULT_SORT_BY);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [selectedFilters, setSelectedFilters] = useState(
    createInitialSelectedFilters,
  );
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(priceBounds.max);

  if (!category) {
    return <h1>Category not found</h1>;
  }

  const filteredCategoryArtworks = categoryArtworks.filter((artwork) => {
    const matchesMedium =
      selectedFilters.medium.length === 0 ||
      selectedFilters.medium.includes(artwork.medium);
    const matchesStyle =
      selectedFilters.style.length === 0 ||
      (artwork.styleTags || []).some((tag) =>
        selectedFilters.style.includes(tag),
      );
    const matchesPrice = artwork.price <= selectedMaxPrice;

    return matchesMedium && matchesStyle && matchesPrice;
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
      options: mediumOptions,
    },
    ...(styleOptions.length > 0
      ? [
          {
            name: "style",
            label: "Styles",
            options: styleOptions,
          },
        ]
      : []),
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

  const handlePriceChange = (evt) => {
    setSelectedMaxPrice(Number(evt.target.value));
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const handleClearAll = () => {
    setSelectedFilters(createInitialSelectedFilters());
    setSelectedMaxPrice(priceBounds.max);
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
              minPrice={priceBounds.min}
              maxPrice={priceBounds.max}
              selectedMaxPrice={selectedMaxPrice}
              onPriceChange={handlePriceChange}
              onClearAll={handleClearAll}
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
