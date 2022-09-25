import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import pagesReducer from './reducers/pagesReducer';

const store = configureStore({
  reducer: {
    authUser: authReducer,
    pages: pagesReducer,
  },
});

export default store;
