import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({children}) => {
  const [badge, setBadge] = useState(0);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("AddToCart")) || [];
    setBadge(data.length);
  }, []);

  return (
    <CartContext.Provider value={{ badge, setBadge }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);