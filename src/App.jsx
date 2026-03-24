import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout/MainLayout";
import HomePage from "./pages/HomePage";
import DiscoverPage from "./pages/DiscoverPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="discover" element={<DiscoverPage />} />
        {/* <Route path="learn" element={<Home />} />
        <Route path="challenges" element={<Home />} />
        <Route path="about" element={<Home />} /> */}
      </Route>
    </Routes>
  );
};

export default App;
