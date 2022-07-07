import { ADD_TODO, REMOVE_TODO } from './action-types';

const initialState = {
  list: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO: {
      const { id, content } = action.payload;
      return {
        ...state,
        list: [...state.list, {
          id,
          content
        }]
      }
    }
    case REMOVE_TODO: {
      const { id } = action.payload;
      return {
        ...state,
        list: state.list.filter(todo => todo.id !== id)
      }
    }
    default: {
      return state;
    }
  }
};

export default reducer;