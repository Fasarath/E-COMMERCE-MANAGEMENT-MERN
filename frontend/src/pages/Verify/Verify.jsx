import React, { useEffect } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useOrderActions from '../../hooks/useOrderActions';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');
  const { url } = useContext(StoreContext);
  const { verifyUserOrder } = useOrderActions();
  const navigate = useNavigate();

  const verifyPayment = async () => {
    const response = await verifyUserOrder(url, success, orderId);
    if (response.success) {
      navigate('/myorders');
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className='verify'>
      <div className='spinner'></div>
    </div>
  );
};

export default Verify;
