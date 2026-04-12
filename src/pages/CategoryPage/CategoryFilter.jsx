import styles from "./CategoryFilter.module.css";

const CategoryFilter = ({ groups }) => {
  return (
    <aside className={styles.sidebar} aria-labelledby="filters-title">
      <h2 id="filters-title" className={styles.sidebarTitle}>
        Filters
      </h2>

      <form className={styles.filtersForm}>
        {groups.map((group) => (
          <fieldset key={group.name} className={styles.filterGroup}>
            <legend className={styles.filterLegend}>{group.label}</legend>

            {group.options.map((option) => (
              <label key={option.value} className={styles.filterOption}>
                <input
                  type="checkbox"
                  name={group.name}
                  value={option.value}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </fieldset>
        ))}
      </form>
    </aside>
  );
};

export default CategoryFilter;
