/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const CartContext = createContext(null);

const INITIAL_CART_ITEMS = [];

const normalizeCartItemId = (itemId) => String(itemId);
const normalizeCartItems = (items) => items.map(createCartItem);

const createCartItem = (item) => ({
  id: normalizeCartItemId(item.id),
  title: item.title?.trim() || "Untitled artwork",
  artistName: item.artistName?.trim() || item.artist?.name || "Unknown artist",
  medium: item.medium?.trim() || "Medium available on request",
  price: Number(item.price) || 0,
  image: item.image,
  quantity: Math.max(1, Number(item.quantity) || 1),
});

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() =>
    normalizeCartItems(INITIAL_CART_ITEMS),
  );

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const total = subtotal;

  const addToCart = (item) => {
    const nextItem = createCartItem(item);

    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find(
        (cartItem) => normalizeCartItemId(cartItem.id) === nextItem.id,
      );

      if (existingItem) {
        return prevCartItems.map((cartItem) =>
          normalizeCartItemId(cartItem.id) === nextItem.id
            ? { ...cartItem, quantity: cartItem.quantity + nextItem.quantity }
            : cartItem,
        );
      }

      return [...prevCartItems, nextItem];
    });
  };

  const increaseQuantity = (itemId) => {
    const normalizedItemId = normalizeCartItemId(itemId);

    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        normalizeCartItemId(item.id) === normalizedItemId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decreaseQuantity = (itemId) => {
    const normalizedItemId = normalizeCartItemId(itemId);

    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        normalizeCartItemId(item.id) === normalizedItemId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item,
      ),
    );
  };

  const removeFromCart = (itemId) => {
    const normalizedItemId = normalizeCartItemId(itemId);

    setCartItems((prevCartItems) =>
      prevCartItems.filter(
        (item) => normalizeCartItemId(item.id) !== normalizedItemId,
      ),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        itemCount,
        subtotal,
        total,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider.");
  }

  return context;
};

export { CartProvider, useCart };
