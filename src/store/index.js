import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import productsReducer from './modules/products/slice';
import authReducer from './modules/auth/slice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth']
};

const rootReducer = combineReducers({
  products: productsReducer,
  auth: authReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore(
  {
    reducer: persistedReducer,
    devTools: true,
    thunk: true,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
  }
);

export const persistor = persistStore(store);

export default store;