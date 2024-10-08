import React, { createContext, useContext, useEffect, useState } from "react";
const CartContext = createContext(null);
const CART_KEY = "cart";
const EMPTY_CART = {
  item: [],
  totalPrice: 0,
  totalCount: 0,
};

const CartProvider = ({ children }) => {
  const initCart = getCartFromLocalStorage();
  const [cartItems, setCartItems] = useState(initCart ? initCart.items : null);

  const [totalPrice, setTotalPrice] = useState(initCart.totalPrice);
  const [totalCount, setTotalCount] = useState(initCart.totalCount);

  useEffect(() => {
    // Check if cartItems is defined before using it
    if (cartItems) {
      const totalPrice = sum(cartItems.map((item) => item.price));
      const totalCount = sum(cartItems.map((item) => item.quantity));
      setTotalPrice(totalPrice);
      setTotalCount(totalCount);

      localStorage.setItem(
        CART_KEY,
        JSON.stringify({
          items: cartItems,
          totalPrice,
          totalCount,
        })
      );
    }
  }, [cartItems]);

  function getCartFromLocalStorage() {
    const storedCart = localStorage.getItem(CART_KEY);
    return storedCart ? JSON.parse(storedCart) : EMPTY_CART;
  }

  const sum = (items) => {
    return items.reduce((preValue, curValue) => preValue + curValue, 0);
  };
  const removeFromCart = (foodId) => {
    const filteredCartItems = cartItems.filter(
      (item) => item.food.id !== foodId
    );
    setCartItems(filteredCartItems);
  };
  const changeQuantity = (cartItem, newQuantity) => {
    const { food } = cartItem;

    const updatedCartItems = cartItems.map((item) =>
      item.food.id === food.id
        ? { ...item, quantity: newQuantity, price: food.price * newQuantity }
        : item
    );

    setCartItems(updatedCartItems);
  };

  const addToCart = (food) => {
    const cartItem = cartItems.find((item) => item.food.id === food.id);
    if (cartItem) {
      changeQuantity(cartItem, cartItem.quantity + 1);
    } else {
      setCartItems([...cartItems, { food, quantity: 1, price: food.price }]);
    }
  };
  return (
    <CartContext.Provider
      value={{
        cart: { items: cartItems, totalPrice, totalCount },
        removeFromCart,
        changeQuantity,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartProvider;
