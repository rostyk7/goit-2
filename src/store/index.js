import { configureStore } from '@reduxjs/toolkit';
import productsApi from './modules/products/api';
import { setupListeners } from '@reduxjs/toolkit/query'

const store = configureStore(
  {
    reducer: {
      [productsApi.reducerPath]: productsApi.reducer
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(productsApi.middleware),
    devTools: true
  }
);

setupListeners(store.dispatch)

export default store;