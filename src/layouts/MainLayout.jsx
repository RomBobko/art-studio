import { useCallback, useState } from "react";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import Header from "../components/shared/Header";
import CartDrawer from "../components/shared/CartDrawer/CartDrawer";
import Footer from "../components/shared/Footer";
import { CartProvider } from "../context/CartContext";

const MainLayout = ({ theme, onThemeToggle }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  return (
    <CartProvider>
      <div>
        <Header
          theme={theme}
          onThemeToggle={onThemeToggle}
          onCartOpen={handleOpenCart}
        />

        <main>
          <Outlet />
        </main>

        {isCartOpen && <CartDrawer onClose={handleCloseCart} />}

        <Footer />
      </div>
    </CartProvider>
  );
};

MainLayout.propTypes = {
  theme: PropTypes.oneOf(["light", "dark"]).isRequired,
  onThemeToggle: PropTypes.func.isRequired,
};

export default MainLayout;
