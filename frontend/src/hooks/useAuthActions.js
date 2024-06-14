
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setToken } from '../slices/authSlice';

const useAuthActions = () => {
  const dispatch = useDispatch();

  const loginUser = async (url, data, setShowLogin, currentState) => {
    let newUrl = url;
    if (currentState === 'Login') {
      newUrl += '/api/user/login';
    } else {
      newUrl += '/api/user/register';
    }

    try {
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        dispatch(setToken(response.data.token));
        setShowLogin(false);
        toast.success(`Successfully ${currentState === 'Login' ? 'signed in' : 'registered'}`);
        window.location.reload(); // Reload the page after successful authentication
      } else {
        toast.error(response.data.message || 'Error occurred. Please try again.');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  return {
    loginUser,
  };
};

export default useAuthActions;
