import { FETCH_PRODUCTS_ERROR, FETCH_PRODUCTS_START, FETCH_PRODUCTS_SUCCESS } from "./action-types";

const initialState = {
  products: [],
  isLoading: false,
  error: null,
  pagesCount: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_START: {
      return {
        ...state,
        isLoading: true
      }
    }
    case FETCH_PRODUCTS_SUCCESS: {
      const { products, pagesCount } = action.payload;
      return {
        ...state,
        isLoading: false,
        products,
        pagesCount,
        error: null
      }
    }
    case FETCH_PRODUCTS_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    default: {
      return state;
    }
  }
};

export default reducer;