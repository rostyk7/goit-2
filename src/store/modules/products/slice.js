import { createSlice } from '@reduxjs/toolkit';
import { getProducts } from "../../../api/products";

const initialState = {
  products: [],
  isLoading: false,
  error: null,
  pagesCount: 0
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsStart(state) {
      state.isLoading = true;
    },
    fetchProductsSuccess(state, { payload }) {
      state.isLoading = false;
      state.products = payload.products;
      state.pagesCount = payload.pagesCount;
      state.error = null;
    },
    fetchProductsError(state, { payload }) {
      state.isLoading = false;
      state.error = payload;
    }
  }
});

export const { fetchProductsStart, fetchProductsSuccess, fetchProductsError } = productsSlice.actions;

export const getProductsThunk = (activePage, total) => async (dispatch) => {
  dispatch(fetchProductsStart());
  try {
    const { data } = await getProducts(activePage, total);
    dispatch(fetchProductsSuccess({
      products: data.products,
      pagesCount: data.total / total
    }))
  } catch(e) {
    dispatch(fetchProductsError(e));
  }
};

export default productsSlice.reducer;
