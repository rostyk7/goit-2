import { v4 } from 'uuid';
import { ADD_TODO, REMOVE_TODO } from './action-types';

export const addTodo = (content) => ({
  type: ADD_TODO,
  payload: {
    id: v4(),
    content
  } 
});

export const removeTodo = id => ({
  type: REMOVE_TODO,
  payload: {
    id
  }
});