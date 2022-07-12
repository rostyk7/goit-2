import { createReducer } from "@reduxjs/toolkit";
import { addTodo, removeTodo } from "./actions";

const initialState = {
  list: []
};

const reducer = createReducer(
  initialState, builder => {
      builder
        .addCase(addTodo, (state, action) => {
          const { id, content } = action.payload;
          state.list.push({
            id,
            content
          })
        })
        .addCase(removeTodo, (state, action) => {
          const { id } = action.payload;
          const index = state.list.findIndex(item => item.id === id);
          state.list.splice(index, 1);
        })
  }
)

export default reducer;

