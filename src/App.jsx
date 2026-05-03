import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./layouts/MainLayout";

import HomePage from "./pages/HomePage";
import DiscoverPage from "./pages/DiscoverPage";
import LearnPage from "./pages/LearnPage";
import ChallengesPage from "./pages/ChallengesPage/ChallengesPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import ArtworkPage from "./pages/ArtworkPage/ArtworkPage";
import ArtistPage from "./pages/ArtistPage/ArtistPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import useTheme from "./hooks/useTheme";

const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route
          path="/"
          element={<MainLayout theme={theme} onThemeToggle={toggleTheme} />}
        >
          <Route index element={<HomePage />} />
          <Route path="discover" element={<DiscoverPage />} />
          <Route path="discover/:categorySlug" element={<CategoryPage />} />
          <Route path="artworks/:artworkSlug" element={<ArtworkPage />} />
          <Route path="artists/:artistSlug" element={<ArtistPage />} />
          <Route path="learn" element={<LearnPage />} />
          <Route path="challenges" element={<ChallengesPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>

      <ToastContainer position="bottom-right" autoClose={4000} />
    </>
  );
};

export default App;
