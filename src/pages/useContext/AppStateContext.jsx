import { useGetCartQuery } from "../../entities/allApi";

import { createContext, useContext, useEffect, useState } from "react";
const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  const { data, refetch } = useGetCartQuery();

  useEffect(() => {
    if (data?.data?.[0]?.productsInCart) {
      setCartCount(data.data[0].productsInCart.length);
    }
  }, [data]);

  const stored = localStorage.getItem("wishList");
  useEffect(() => {
    setWishlistCount(stored ? JSON.parse(stored).length : 0);
  }, [stored]);

  const updateWishlistCount = () => {
    const stored = localStorage.getItem("wishList");
    setWishlistCount(stored ? JSON.parse(stored).length : 0);
  };

  const updateCartCount = async () => {
    const result = await refetch();
    setCartCount(result?.data?.data?.[0]?.productsInCart.length || 0);
  };

  return (
    <AppStateContext.Provider
      value={{ wishlistCount, cartCount, updateWishlistCount, updateCartCount }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);
