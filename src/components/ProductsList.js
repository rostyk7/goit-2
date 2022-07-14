import React, { useCallback, useMemo } from 'react';
import { Card, Spinner, Alert, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useSearchParams, useLocation } from "react-router-dom";
import { useGetProductsQuery } from '../store/modules/products/api';
import AppPagination from './AppPagination';

const ProductsList = ({ total }) => {  
  const location = useLocation();
  const [params] = useSearchParams();

  const activePage = +params.get('pageNumber') || 1;
  const searchTerm = params.get('search') || '';

  const navigate = useNavigate();

  const { data, isLoading, error } = useGetProductsQuery({ activePage, total });

  const products = useMemo(() => data?.products || [], [data]);
  const pagesCount = (data?.total || 0) / total;

  const onPageNavigation = useCallback((index) => {
    const params = new URLSearchParams(location.search);
    params.set('pageNumber', index + 1);
    params.set('search', '');
    navigate(`?${params.toString()}`);
  }, [navigate, location]);

  const onSearch = useCallback(event => {
    const params = new URLSearchParams(location.search);
    params.set('search', event.target.value);
    navigate(`?${params.toString()}`);
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
        {filteredProducts?.map(product => (
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