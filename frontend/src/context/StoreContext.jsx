import React, { createContext, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setDressList } from "../slices/dressSlice";
import { setCartItems, addToCart, removeFromCart } from "../slices/cartSlice";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:5000"; // Ensure this URL is correct and accessible
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const dressList = useSelector((state) => state.dress.dressList);
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    const fetchDressList = async () => {
      const response = await axios.get(url + "/api/dress/list");
      dispatch(setDressList(response.data.data));
    };

    const loadCartData = async (token) => {
      const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
      dispatch(setCartItems(response.data.cartData));
    };

    const loadData = async () => {
      await fetchDressList();
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        await loadCartData(savedToken);
      }
    };
    loadData();
  }, [dispatch]);

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = dressList.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const contextValue = {
    dressList,
    cartItems,
    addToCart: (itemId) => dispatch(addToCart(itemId)),
    removeFromCart: (itemId) => dispatch(removeFromCart(itemId)),
    getTotalCartAmount,
    token,
    url, // Ensure url is part of the context value
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
