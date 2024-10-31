import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../../redux/slice/authSlice"; 
import './Navbar.css';
import cart from '../../assets/Cart.png';
import AuthImg from '../../assets/AuthImg.png';

const NavBar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const isAuthenticated = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const uniqueItemsCount = cartItems.length;
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard"; 

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');
    dispatch(login({ username, password }))
      .unwrap()
      .then(() => {})
      .catch((error) => {
        setErrorMessage(error);
      });
  };

  const handleLogout = () => {
    dispatch(logout()); // Log out without removing user data
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container">
        <Link className="navbar-brand me-5" to="/">
          <span>Syeds Store</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-links active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-links" to="/blogs">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-links" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
          <Link to="/cart" className="btn btn-cart position-relative">
            <img src={cart} alt="cart" />
            {uniqueItemsCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {uniqueItemsCount}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="d-flex align-items-center">
              <Link to="/dashboard">
                <img src={AuthImg} alt="Dashboard" style={{ height: "70px", color: "pink" }} />
              </Link>
              <Link to="/auth">
              <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
              </Link> 
            </div>
          ) : (
            <div>
              <Link to="/auth">
                <button type="submit" className="btn btn-logsign">Login/Signup</button>
              </Link>
              {errorMessage && <p className="text-danger">{errorMessage}</p>} 
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
