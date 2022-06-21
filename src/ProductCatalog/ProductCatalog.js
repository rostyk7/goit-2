import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Spinner, Alert } from 'react-bootstrap';
import { getProducts } from '../api/products';
import AppPagination from '../AppPagination';

export default class ProductCatalog extends Component {
  state = {
    products: [],
    isLoading: false,
    error: null,
    pagesCount: 0,
    activePage: 0
  };

  static propTypes = {
    total: PropTypes.number.isRequired
  };

  componentDidMount() {
    this.setState({
      isLoading: true
    })
    this.fetchProducts();
  }

  onPageNavigation = (index) => {
    this.setState({
      activePage: index
    }, () => {
      this.fetchProducts(index);
    });
  };

  async fetchProducts() {
    const { total, activePage } = this.props;
    this.setState({
      isLoading: true
    });
    try {
      const { data } = await getProducts(activePage, total);
      this.setState({
        products: data.products,
        isLoading: false,
        pagesCount: data.total / total
      });
    } catch(e) {
      this.setState({
        error: e,
        isLoading: false
      });
    }
  }

  render() {
    const { products, isLoading, error, pagesCount, activePage } = this.state;  

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
              onPageNavigation={this.onPageNavigation}
            />
          </div>
        </div>
      </div>
    );
  }
}