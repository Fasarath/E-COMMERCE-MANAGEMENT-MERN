import React, { useState } from 'react';
import './LoginModel.css';
import { assets } from '../../assets/assets';
import useAuthActions from '../../hooks/useAuthActions';

const LoginModel = ({ setShowLogin }) => {
  const url = 'http://localhost:5000';
  const { loginUser } = useAuthActions();

  const [currentState, setCurrentState] = useState('Login');
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = (event) => {
    event.preventDefault();
    loginUser(url, data, setShowLogin, currentState);
  };

  return (
    <div className='login-model'>
      <form onSubmit={onLogin} className='login-model-container'>
        <div className='login-model-title'>
          <h2>{currentState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt='Close' />
        </div>
        <div className='login-model-inputs'>
          {currentState === 'Login' ? null : (
            <input
              name='name'
              onChange={onChangeHandler}
              value={data.name}
              type='text'
              placeholder='Your Name'
              required
            />
          )}
          <input
            name='email'
            onChange={onChangeHandler}
            value={data.email}
            type='email'
            placeholder='Your Email'
            required
          />
          <input
            name='password'
            onChange={onChangeHandler}
            value={data.password}
            type='password'
            placeholder='Password'
            required
          />
        </div>
        <button type='submit'>{currentState === 'Sign Up' ? 'Create account' : 'Login'}</button>
        <div className='login-model-condition'>
          <input type='checkbox' required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currentState === 'Login' ? (
          <p>
            Create a new account? <span onClick={() => setCurrentState('Sign Up')}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account? <span onClick={() => setCurrentState('Login')}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginModel;
