// src/auth/redux/reducers/authReducer.js
import { SET_USER, CLEAR_USER } from '../types/authTypes';

const initialState = {
  user: null,
  token: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token
      };
    case CLEAR_USER:
      return {
        ...state,
        user: null,
        token: null
      };
    default:
      return state;
  }
};

export default authReducer;
