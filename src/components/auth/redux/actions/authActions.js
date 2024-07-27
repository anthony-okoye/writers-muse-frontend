// src/auth/redux/actions/authActions.js
import { SET_USER, CLEAR_USER } from '../types/authTypes';

export const setUser = (user, token) => {
  return {
    type: SET_USER,
    payload: { user, token }
  };
};

export const clearUser = () => {
  return {
    type: CLEAR_USER
  };
};

// Add a logout action
export const logout = () => {
  return (dispatch) => {
    // Clear the local storage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    // Dispatch the clearUser action to update the Redux store
    dispatch(clearUser());
  };
};
