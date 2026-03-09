import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";

const MainLayout = () => {
  return (
    <div>
      <Header />

      <main>
        <Outlet />
      </main>

      <footer>Footer</footer>
    </div>
  );
};

export default MainLayout;
