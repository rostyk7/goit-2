import React from 'react';
import { Card, Spinner, Alert } from 'react-bootstrap';

import AppPagination from '../AppPagination';
import { useInterval, useProducts } from './hooks';

const ProductCatalogNext = () => {
  const { 
    products,
    isLoading,
    error,
    pagesCount,
    activePage,
    onPageNavigation
  } = useProducts();

  useInterval(() => {
    console.log('interval', products);
  }, 1000);

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
        {products.map(product => (
          <Card style={{ width: '18rem' }} key={product.id} className='mb-2'>
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
            activePage={activePage}
            onPageNavigation={onPageNavigation}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCatalogNext;