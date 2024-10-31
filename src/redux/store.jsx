// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk';
import cartReducer from './reducers/cartReducer';
// import authReducer from './reducers/authReducer';
import authReducer from './slice/authSlice'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    // auth: authReducer,
    auth: authReducer,
  },
  // middleware: [thunk],
});

export default store;
