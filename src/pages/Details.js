import { useParams } from 'react-router';
import { Spinner, Alert } from 'react-bootstrap';
import { useGetProductByIdQuery } from '../store/modules/products/api';

const Details = () => {
  const params = useParams();
  const { data, error, isLoading } = useGetProductByIdQuery(params.productId);

  const renderImage = (url, index) => {
    return (
      <img src={url} alt={`image${index}`} key={index} />
    );
  };

  if (isLoading || !data) {
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
      <h1>{data.title}</h1>
      <div>
        {data?.images.map(renderImage)}
        <div>{data?.brand}</div>
        <strong>{data?.price} $</strong>
      </div>
    </div>
  );
};

export default Details;

