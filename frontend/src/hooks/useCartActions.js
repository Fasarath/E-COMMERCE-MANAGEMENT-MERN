import { useDispatch } from "react-redux";
import { addToCart, removeFromCart, setCartItems } from "../slices/cartSlice";

const useCartActions = () => {
  const dispatch = useDispatch();

  const addToCartAction = (itemId) => {
    dispatch(addToCart(itemId));
  };

  const removeFromCartAction = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const setCartItemsAction = (cartItems) => {
    dispatch(setCartItems(cartItems));
  };

  return {
    addToCartAction,
    removeFromCartAction,
    setCartItemsAction,
  };
};

export default useCartActions;
