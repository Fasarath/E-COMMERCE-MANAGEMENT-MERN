import React, { useEffect } from 'react';
import './MyOrders.css';
import useOrderActions from '../../hooks/useOrderActions';
import { useSelector } from 'react-redux';
import { assets } from '../../assets/assets';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const { fetchUserOrders } = useOrderActions();
  const orders = useSelector((state) => state.order.orders);

  useEffect(() => {
    if (token) {
      fetchUserOrders(url, token);
    }
  }, [token, fetchUserOrders, url]);

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className='container'>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className='my-orders-order'>
              <img src={assets.parcel_icon} alt='Parcel Icon' />
              <div className='order-details'>
                <p>
                  {order.items.map((item, idx) => (
                    <span key={idx}>
                      {item.name} * {item.quantity}
                      {idx < order.items.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>
                <p>$ {order.amount}.00</p>
                <p>Items: {order.items.length}</p>
                <p>
                  <span>&#x25cf;</span>
                  <b>{order.status}</b>
                </p>
                <button>Track Order</button>
              </div>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
