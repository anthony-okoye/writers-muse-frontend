import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navbar from '../common/Navbar';
import InputField from '../common/form/InputField';
import Button from '../common/button/Button';
import { login } from '../../services/authService';
import { setAuthToken, setUserDetails } from './utils/authUtils';
import { setUser } from './redux/slice/authSlice';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      setAuthToken(response.token);
      setUserDetails(response.user);
      // Dispatch action to update Redux state
      dispatch(setUser({ token: response.token, user: response.user }));
      // Store user and token in local storage
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.token);
      navigate('/chat');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto py-8 flex-grow">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md" onSubmit={handleLogin}>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <InputField
            id="email"
            label="Email"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <Button text="Login" />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
