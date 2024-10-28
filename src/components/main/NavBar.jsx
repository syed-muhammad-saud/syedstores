import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import './Navbar.css';
import cart from '../../assets/Cart.png';
import AuthImg from '../../assets/AuthImg.png';

const NavBar = () => {
  // Get the cart items from Redux
  const cartItems = useSelector((state) => state.cart.items);

  // Count unique items in the cart
  const uniqueItemsCount = cartItems.length;

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
              
            </li>
            <li className="nav-item">
              <Link className="nav-links" to="/blogs">
                About us
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
          <Link to="/auth">
          <img src={AuthImg} alt="Login" style={{height: "70px", color:"pink"}} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
