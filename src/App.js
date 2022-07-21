import { Routes, Route } from 'react-router';
import { BrowserRouter, NavLink } from "react-router-dom";
import About from './pages/About';
import Home from './pages/Home';
import Details from './pages/Details';
import Login from './pages/Login';
import CreateUser from './pages/CreateUser';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import './App.css';
import PublicRoute from './components/PublicRoute';
import { useSelector } from 'react-redux';
import { isAuthenticated } from './store/modules/auth/selectors';
import Logout from './pages/Logout';

function App() {
  const isAuth = useSelector(isAuthenticated);

  const renderAuthedLinks = () => (
    <>
      <NavLink to='/profile' className="nav-link">
        Profile
      </NavLink>
      <NavLink to='/logout' className="nav-link">
        Logout
      </NavLink>
    </>
  );

  const renderAuthRequiredLinks = () => (
    <>
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
    </>
  );

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
          {isAuth ? renderAuthedLinks() : renderAuthRequiredLinks()}
        </ul>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/products/:productId' element={<Details />} />
          <Route path='/login' element={(
            <PublicRoute>
              <Login />
            </PublicRoute>
          )} />
          <Route path='/create_user' element={(
            <PublicRoute>
              <CreateUser />
            </PublicRoute>
          )} />
          <Route path='/profile' element={(
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          )} />
          <Route path='/logout' element={(
            <PrivateRoute>
              <Logout />
            </PrivateRoute>
          )} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
