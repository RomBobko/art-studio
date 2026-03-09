import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout/MainLayout";
import Home from "./pages/Home/Home";
import Discover from "./pages/Discover/Discover";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="discover" element={<Discover />} />
        {/* <Route path="learn" element={<Home />}/>
      <Route path="challenges" element={<Home />}/>
      <Route path="about" element={<Home />}/> */}
      </Route>
    </Routes>
  );
};

export default App;
