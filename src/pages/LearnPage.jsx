import { useState } from "react";
import LearnHero from "../components/sections/learn/LearnHero/LearnHero";
import TutorialsSection from "../components/sections/learn/TutorialsSection/TutorialsSection";
import FeaturedTutorialsSection from "../components/sections/learn/FeaturedTutorialsSection/FeaturedTutorialsSection";
import tutorials from "../data/tutorials";

const LearnPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(tutorials.map((tutorial) => tutorial.category))];
  const filteredTutorials =
    selectedCategory === "All"
      ? tutorials
      : tutorials.filter((tutorial) => tutorial.category === selectedCategory);

  const visibleTutorials = filteredTutorials.filter(
    (tutorial) => !tutorial.isFeatured,
  );
  const featuredTutorials = filteredTutorials.filter(
    (tutorial) => tutorial.isFeatured,
  );

  return (
    <>
      <LearnHero
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <TutorialsSection tutorials={visibleTutorials} />
      <FeaturedTutorialsSection tutorials={featuredTutorials} />
    </>
  );
};

export default LearnPage;
