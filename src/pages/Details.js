import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Spinner, Alert } from 'react-bootstrap';
import { getProductById } from '../api/products';

const Details = () => {
  const params = useParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    setLoading(true);
    getProductById(params.productId).then(product => {
      setProductData(product.data);
    }).catch(err => {
      setError(err);
    }).finally(() => {
      setLoading(false);
    });
  }, [params.productId]);

  const renderImage = (url, index) => {
    return (
      <img src={url} alt={`image${index}`} key={index} />
    );
  };

  if (loading || !productData) {
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

  return (
    <div>
      <h1>{productData.title}</h1>
      <div>
        {productData.images.map(renderImage)}
        <div>{productData.brand}</div>
        <strong>{productData.price} $</strong>
      </div>
    </div>
  );
};

export default Details;

