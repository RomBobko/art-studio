import { useState } from "react";
import LearnHero from "../components/sections/learn/LearnHero/LearnHero";
import TutorialsSection from "../components/sections/learn/TutorialsSection/TutorialsSection";
import FeaturedTutorialsSection from "../components/sections/learn/FeaturedTutorialsSection/FeaturedTutorialsSection";
import tutorials from "../data/tutorials";
import artists from "../data/artists";
import categories from "../data/categories";

const LearnPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const artistsById = Object.fromEntries(
    artists.map((artist) => [artist.id, artist]),
  );
  const categoriesById = Object.fromEntries(
    categories.map((category) => [category.id, category]),
  );
  const tutorialsWithDetails = tutorials.map((tutorial) => ({
    ...tutorial,
    category: categoriesById[tutorial.categoryId]?.name || "Uncategorized",
    authorName: artistsById[tutorial.authorId]?.name || "Unknown artist",
    authorAvatar: artistsById[tutorial.authorId]?.avatar,
  }));
  const availableCategories = categories
    .filter((category) =>
      tutorials.some((tutorial) => tutorial.categoryId === category.id),
    )
    .map((category) => category.name);

  const categoryOptions = ["All", ...availableCategories];
  const filteredTutorials =
    selectedCategory === "All"
      ? tutorialsWithDetails
      : tutorialsWithDetails.filter(
          (tutorial) => tutorial.category === selectedCategory,
        );
  const hasActiveCategoryFilter = selectedCategory !== "All";

  const visibleTutorials = hasActiveCategoryFilter
    ? filteredTutorials
    : filteredTutorials.filter((tutorial) => !tutorial.isFeatured);
  const featuredTutorials = hasActiveCategoryFilter
    ? []
    : filteredTutorials.filter((tutorial) => tutorial.isFeatured);

  return (
    <>
      <LearnHero
        categories={categoryOptions}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <TutorialsSection
        key={`tutorials-${selectedCategory}`}
        tutorials={visibleTutorials}
        initialVisibleCount={4}
      />
      {featuredTutorials.length > 0 && (
        <FeaturedTutorialsSection
          key={`featured-tutorials-${selectedCategory}`}
          tutorials={featuredTutorials}
          initialVisibleCount={3}
        />
      )}
    </>
  );
};

export default LearnPage;
