// src/auth/utils/useAuth.js
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setUser, clearUser, logout as logoutAction } from '../redux/actions/authActions';

const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      dispatch(setUser(JSON.parse(storedUser), storedToken));
    } else {
      dispatch(clearUser());
    }
  }, [dispatch]);

  const logout = () => {
    dispatch(logoutAction());
  };

  return { user, token, logout };
};

export default useAuth;
