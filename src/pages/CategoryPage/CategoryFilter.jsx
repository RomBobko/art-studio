import styles from "./CategoryFilter.module.css";

const formatPrice = (value) => `$${value.toLocaleString()}`;

const CategoryFilter = ({
  groups,
  selectedFilters,
  onFilterChange,
  minPrice,
  maxPrice,
  selectedMaxPrice,
  onPriceChange,
  onClearAll,
}) => {
  return (
    <aside className={styles.sidebar} aria-labelledby="filters-title">
      <h2 id="filters-title" className={styles.sidebarTitle}>
        Filters
      </h2>

      <form className={styles.filtersForm}>
        {groups.map((group) => (
          <fieldset key={group.name} className={styles.filterGroup}>
            <legend className={styles.filterLegend}>{group.label}</legend>

            <div className={styles.filterOptions}>
              {group.options.map((option) => (
                <label key={option.value} className={styles.filterOption}>
                  <input
                    className={styles.checkbox}
                    type="checkbox"
                    name={group.name}
                    value={option.value}
                    checked={selectedFilters[group.name].includes(option.value)}
                    onChange={() => onFilterChange(group.name, option.value)}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}

        <fieldset className={styles.filterGroup}>
          <legend className={styles.filterLegend}>Price</legend>

          <div className={styles.priceValues}>
            <span>{formatPrice(minPrice)}</span>
            <span>{formatPrice(selectedMaxPrice)}</span>
          </div>

          <input
            className={styles.priceRange}
            type="range"
            min={minPrice}
            max={maxPrice}
            step="5"
            value={selectedMaxPrice}
            onChange={onPriceChange}
            aria-label="Maximum price"
          />
        </fieldset>
      </form>

      <button
        type="button"
        className={styles.clearButton}
        onClick={onClearAll}
      >
        Clear All
      </button>
    </aside>
  );
};

export default CategoryFilter;
