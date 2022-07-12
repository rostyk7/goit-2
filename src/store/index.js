import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import productsReducer from './modules/products/reducer';
import thunk from 'redux-thunk';

const store = createStore(
  combineReducers({
    products: productsReducer
  }),
  compose(
    applyMiddleware(thunk), 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  );

export default store;