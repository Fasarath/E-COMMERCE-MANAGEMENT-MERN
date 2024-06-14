import { useDispatch } from 'react-redux';
import { fetchOrders, placeOrder, verifyOrder } from '../slices/orderSlice';

const useOrderActions = () => {
  const dispatch = useDispatch();

  const fetchUserOrders = (url, token) => {
    dispatch(fetchOrders(url, token));
  };

  const placeUserOrder = (url, orderData, token) => {
    dispatch(placeOrder(url, orderData, token));
  };

  const verifyUserOrder = (url, success, orderId) => {
    dispatch(verifyOrder(url, success, orderId));
  };

  return {
    fetchUserOrders,
    placeUserOrder,
    verifyUserOrder,
  };
};

export default useOrderActions;
