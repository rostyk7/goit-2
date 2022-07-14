import { getProducts } from "../../../api/products";
import { FETCH_PRODUCTS_ERROR, FETCH_PRODUCTS_START, FETCH_PRODUCTS_SUCCESS } from "./action-types";

const fetchProductsStart = () => ({
  type: FETCH_PRODUCTS_START
});

const fetchProductsSuccess = ({ products, pagesCount}) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: {
    products,
    pagesCount
  }
})

const fetchProductsError = (error) => ({
  type: FETCH_PRODUCTS_ERROR,
  payload: error
});

export const getProductsThunk = (total, activePage) => async (dispatch) => {
  dispatch(fetchProductsStart());
  try {
    const { data } = await getProducts(activePage, total);
    dispatch(fetchProductsSuccess({ 
      products: data.products,
      pagesCount: data.total / total
    }))
  } catch(err) {
    dispatch(fetchProductsError(err));
  }
};
