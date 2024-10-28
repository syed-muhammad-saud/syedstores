import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, clearCart, addToCart } from '../../redux/reducers/cartReducer';
import { useNavigate } from 'react-router-dom';
import './cart.css';

const Carts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleIncreaseQuantity = (item) => {
    dispatch(addToCart({ ...item, quantity: 1 }));
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(addToCart({ ...item, quantity: -1 }));
    } else {
      handleRemoveFromCart(item.id);
    }
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return <div className="empcart text-center my-5"><h2>Your cart is empty.</h2></div>;
  }

  return (
    <div className="cart container my-5 py-5" style={{ paddingTop: '80px' }}>
      <h1 className="text-center mb-4">Shopping Cart</h1>
      <button className="btn btn-danger mb-3" onClick={handleClearCart}>Clear Cart</button>
      <div className="row">
        {cartItems.map((item) => (
          <div key={item.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-light">
              <img src={item.image} className="card-img-top" alt={item.title} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">Price: <span className="text-primary">${item.price.toFixed(2)}</span></p>
                <div className="d-flex align-items-center mb-2">
                  <p className="card-text me-2">Quantity:</p>
                  <button className="btn btn-outline-secondary btn-sm" onClick={() => handleDecreaseQuantity(item)}>-</button>
                  <span className="quantity-badge text-secondary mx-2">{item.quantity}</span>
                  <button className="btn btn-outline-secondary btn-sm" onClick={() => handleIncreaseQuantity(item)}>+</button>
                </div>
                <button
                  className="btn btn-danger mt-auto"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Remove from Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <h3>Total Amount: <span className="text-success">${totalAmount.toFixed(2)}</span></h3>
        <button className="btn btn-success mt-4" onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
};

export default Carts;
