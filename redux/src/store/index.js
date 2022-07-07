import { createStore, combineReducers } from 'redux';
import todosReducer from './todo/reducer';

const store = createStore(
  combineReducers({
    todos: todosReducer,
  }), /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 );

 export default store;