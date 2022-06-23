import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { Card, Spinner, Alert, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useSearchParams, useLocation } from "react-router-dom";
import { getProducts } from '../api/products';
import AppPagination from './AppPagination';

const FETCH_PRODUCTS_START = 'FETCH_PRODUCTS_START';

const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';

const FETCH_PRODUCTS_ERROR = 'FETCH_PRODUCTS_ERROR';

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

const reducer = (state, action) => {
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

const ProductsList = ({ total }) => {
  const location = useLocation();
  const [params] = useSearchParams();
  const [{
    products,
    isLoading,
    error,
    pagesCount
  }, dispatch] = useReducer(reducer, {
    products: [],
    isLoading: false,
    error: null,
    pagesCount: 0
  });

  const activePage = +params.get('pageNumber') || 1;
  const searchTerm = params.get('search') || '';

  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(fetchProductsStart());
    getProducts(activePage, total).then(({ data }) => {
      dispatch(fetchProductsSuccess({ 
        products: data.products,
        pagesCount: data.total / total
      }))
    }).catch(err => {
      dispatch(fetchProductsError(err));
    });
  }, [total, activePage]);

  const onPageNavigation = useCallback((index) => {
    const params = new URLSearchParams(location.search);
    params.set('pageNumber', index + 1);
    params.set('search', '');
    navigate(`?${params.toString()}`);
  }, [navigate, location]);

  const onSearch = useCallback(event => {
    const params = new URLSearchParams(location.search);
    params.set('search', event.target.value);
    navigate(`?${params.toString()}`, { replace: true });
  }, [navigate, location]);

  const filteredProducts = useMemo(() => products.filter(p => {
    return p.title.startsWith(searchTerm);
  }), [products, searchTerm]);

  if (isLoading) {
    return (
      <Spinner animation="border" role="status" className='mt-5'>
          <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (error) {
    return (
      <Alert variant='danger' className='mt-5'>
        Oop! Something went wrong!
     </Alert>
    )
  }

  if (products.length === 0) {
    return (
      <Alert variant='info' className='mt-5'>
        No items found
     </Alert>
    )
  }

  return (
    <div className='d-flex justify-content-center'>
      <div>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
        <Form.Control
          placeholder="search"
          aria-label="search"
          aria-describedby="basic-addon1"
          value={searchTerm}
          onChange={onSearch}
        />
      </InputGroup>
        {filteredProducts.map(product => (
          <Card
            style={{ width: '18rem' }}
            key={product.id}
            className='mb-2'
            onClick={() => navigate(`/products/${product.id}`)}
          >
            <Card.Img variant="top" src={product.thumbnail} />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>
                {product.description}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
        <div className='d-flex justify-content-center'>
          <AppPagination
            pagesCount={pagesCount}
            activePage={activePage - 1}
            onPageNavigation={onPageNavigation}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsList;