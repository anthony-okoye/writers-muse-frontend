// src/auth/redux/store.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
//import authReducer from './reducers/authReducer';
//import chatReducer from './reducers/chatReducer';
import chatReducer from './slice/chatSlice';
import authReducer from './slice/authSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;


/*import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../components/auth/redux/slice/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});*/