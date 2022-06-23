import { lazy, Suspense } from 'react';
import ProductsList from '../components/ProductsList';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useState } from 'react';
import ErrorBoundary from '../components/ModalErrorBoundary';
const InModal = lazy(() => import(/* webpackChunkName: "extra" */ '../components/InModalDefault'));

const Home = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <ProductsList total={10} />
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ErrorBoundary>
            <Suspense fallback={<Spinner animation="grow" />}>
              <InModal/>
            </Suspense>
          </ErrorBoundary>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setShow(false)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Button onClick={() => setShow(true)}>
        Click me
      </Button>
    </div>
  );
};

export default Home;