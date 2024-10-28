import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { jsPDF } from 'jspdf';
import './Checkout.css'; 

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const doc = new jsPDF();

   
    doc.setFontSize(20);
    doc.text('Order Summary', 20, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${name}`, 20, 30);
    doc.text(`Email: ${email}`, 20, 40);
    doc.text(`Address: ${address}`, 20, 50);

    
    doc.text('Items:', 20, 60);
    let yOffset = 70;
    cartItems.forEach(item => {
      doc.text(`${item.title} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`, 20, yOffset);
      yOffset += 10;
    });

    doc.text(`Total Amount: $${totalAmount.toFixed(2)}`, 20, yOffset + 10);
    doc.save('order-summary.pdf');

    alert(`Order placed successfully! Total Amount: $${totalAmount.toFixed(2)}`);
  };

  if (cartItems.length === 0) {
    return <div className="empty-cart text-center"><h2>Your cart is empty. Cannot proceed to checkout.</h2></div>;
  }

  return (
    <div className="checkout-container container">
      <h1 className="checkout-title text-center mb-4">Checkout</h1>
      <div className="row">
        <div className="col-md-8">
          <form onSubmit={handleSubmit} className="checkout-form">
            <h3 className="shipping-info-title mb-4">Shipping Information</h3>
            <div className="form-group mb-3">
              <label htmlFor="name">Full Name:</label>
              <input type="text" id="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="address">Shipping Address:</label>
              <textarea id="address" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="payment">Payment Method:</label>
              <select id="payment" className="form-select" disabled>
                <option value="home_delivery">Home Delivery</option>
              </select>
            </div>
            <button type="submit" className="btn btn-success">Place Order</button>
          </form>
        </div>
        <div className="col-md-4">
          <div className="order-summary-card shadow-sm p-3 mb-5 bg-body rounded">
            <h3 className="order-summary-title">Order Summary</h3>
            {cartItems.map((item) => (
              <div key={item.id} className="order-summary-item d-flex align-items-center mb-3">
                <img src={item.image} alt={item.title} className="order-summary-image me-2" />
                <div className="order-summary-details flex-grow-1">
                  <span className='orderr-summary'>{item.title} (x{item.quantity})</span>
                  <span className="order-summary-price">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))}
            <h4 className="total-amount">Total Amount: ${totalAmount.toFixed(2)}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
