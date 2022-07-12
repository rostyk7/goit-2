import { createSelector } from 'reselect';

const getProductsState = state => state.products;

export const getProductsList = createSelector(getProductsState, productsState => productsState.products);

export const getProductsIsLoading = createSelector(getProductsState, productsState => productsState.isLoading);

export const getProductsError = createSelector(getProductsState, productsState => productsState.error);

export const getProductsPagesCount = createSelector(getProductsState, productsState => productsState.pagesCount);