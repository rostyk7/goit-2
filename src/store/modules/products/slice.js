import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProducts } from "../../../api/products";

export const getProductsThunk = createAsyncThunk('fetchProducts', async ({ activePage, total }) => {
  const { data } = await getProducts(activePage, total);
  return {
    products: data.products,
    pagesCount: data.total / total
  }
});

const initialState = {
  products: [],
  isLoading: false,
  error: null,
  pagesCount: 0
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getProductsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductsThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.products = payload.products;
        state.pagesCount = payload.pagesCount;
        state.error = null;
      })
      .addCase(getProductsThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
  }
});

export const { fetchProductsStart, fetchProductsSuccess, fetchProductsError } = productsSlice.actions;

export default productsSlice.reducer;
