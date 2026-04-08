import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout/MainLayout";

import HomePage from "./pages/HomePage";
import DiscoverPage from "./pages/DiscoverPage";
import LearnPage from "./pages/LearnPage";
import ChallengesPage from "./pages/ChallengesPage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import ArtworkPage from "./pages/ArtworkPage/ArtworkPage";
import ArtistPage from "./pages/ArtistPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="discover" element={<DiscoverPage />} />
        <Route path="discover/:categorySlug" element={<CategoryPage />} />
        <Route path="artworks/:artworkSlug" element={<ArtworkPage />} />
        <Route path="artists/:artistSlug" element={<ArtistPage />} />
        <Route path="learn" element={<LearnPage />} />
        <Route path="challenges" element={<ChallengesPage />} />
      </Route>
    </Routes>
  );
};

export default App;
