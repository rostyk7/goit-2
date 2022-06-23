import { Routes, Route } from 'react-router';
import { lazy, Suspense } from 'react';
import { Spinner } from 'react-bootstrap';
import { BrowserRouter, NavLink } from "react-router-dom";
import './App.css';

const Home = lazy(() => import(/* webpackChunkName: "product-list" */ './pages/Home'));
const Details = lazy(() => import(/* webpackChunkName: "product-details" */ './pages/Details'));
const About = lazy(() => import(/* webpackChunkName: "extra" */ './pages/About'));

function App() {
  return (
    <div>
      <BrowserRouter>
        <ul className="nav">
          <li className="nav-item">
            <NavLink to='/' className="nav-link">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='/about' className="nav-link">
              About
            </NavLink>
          </li>
        </ul>
        <Suspense fallback={(
          <Spinner variant="primary" animation="border" role="status" className='mt-5'>
            <span className="visually-hidden">Loading...</span>
         </Spinner>
        )}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/products/:productId' element={<Details />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
