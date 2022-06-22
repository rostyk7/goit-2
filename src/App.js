import { Routes, Route } from 'react-router';
import { BrowserRouter, NavLink } from "react-router-dom";
import About from './pages/About';
import Home from './pages/Home';
import Details from './pages/Details';
import './App.css';

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
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/products/:productId' element={<Details />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
