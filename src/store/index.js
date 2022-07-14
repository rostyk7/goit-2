import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './modules/products/slice';

const store = configureStore(
  {
    reducer: {
      products: productsReducer
    },
    devTools: true,
    thunk: true
  }
);

export default store;