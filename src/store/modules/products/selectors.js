import { createSelector } from 'reselect';

const getSum = items => items.reduce((sum, item) => sum + item, 0);

const getProductsState = state => state.products;

export const getProductsList = createSelector(getProductsState, productsState => productsState.products);

export const getProductsIsLoading = createSelector(getProductsState, productsState => productsState.isLoading);

export const getProductsError = createSelector(getProductsState, productsState => productsState.error);

export const getProductsPagesCount = createSelector(getProductsState, productsState => productsState.pagesCount);

export const getProductsPrices = createSelector(getProductsList, products => products.map(p => p.price));

export const getProductsPriceSum = createSelector(
  getProductsPrices,
  getSum
);

export const getHighRateProducts = createSelector(
  getProductsList,
  products => products.filter(product => product.rating >= 4.5));

export const getHighRateProductsCount = createSelector(
  getHighRateProducts,
  products => products.length
);