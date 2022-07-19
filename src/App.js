import { Routes, Route } from 'react-router';
import { BrowserRouter, NavLink } from "react-router-dom";
import About from './pages/About';
import Home from './pages/Home';
import Details from './pages/Details';
import Login from './pages/Login';
import CreateUser from './pages/CreateUser';
import Profile from './pages/Profile';
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
          <li className="nav-item">
            <NavLink to='/login' className="nav-link">
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='/create_user' className="nav-link">
              Create User
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='/profile' className="nav-link">
              Profile
            </NavLink>
          </li>
        </ul>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/products/:productId' element={<Details />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create_user' element={<CreateUser />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
