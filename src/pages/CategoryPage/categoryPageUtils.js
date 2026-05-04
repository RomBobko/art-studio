export const getPriceBounds = (categoryArtworks) => {
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

export const getCategoryFilterOptions = (categoryArtworks) => {
  const mediumOptions = [
    ...new Set(categoryArtworks.map((artwork) => artwork.medium)),
  ]
    .sort((firstMedium, secondMedium) => firstMedium.localeCompare(secondMedium))
    .map((medium) => ({
      value: medium,
      label: medium,
    }));

  const styleOptions = [
    ...new Set(categoryArtworks.flatMap((artwork) => artwork.styleTags || [])),
  ]
    .sort((firstTag, secondTag) => firstTag.localeCompare(secondTag))
    .map((tag) => ({
      value: tag,
      label: tag,
    }));

  return {
    mediumOptions,
    styleOptions,
  };
};

export const getCategoryFilterGroups = ({ mediumOptions, styleOptions }) => [
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

export const filterArtworks = (
  categoryArtworks,
  selectedFilters,
  selectedMaxPrice,
) =>
  categoryArtworks.filter((artwork) => {
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

export const sortArtworks = (categoryArtworks, sortBy) =>
  [...categoryArtworks].sort((firstArtwork, secondArtwork) => {
    switch (sortBy) {
      case "oldest":
        return firstArtwork.year - secondArtwork.year;
      case "price-low":
        return firstArtwork.price - secondArtwork.price;
      case "price-high":
        return secondArtwork.price - firstArtwork.price;
      case "title":
        return firstArtwork.title.localeCompare(secondArtwork.title);
      case "newest":
      default:
        return secondArtwork.year - firstArtwork.year;
    }
  });

export const getVisibleArtworks = (categoryArtworks, visibleCount) =>
  categoryArtworks.slice(0, visibleCount);
