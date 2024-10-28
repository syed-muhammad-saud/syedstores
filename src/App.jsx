import './App.css';
import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/main/NavBar.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Products from './components/products/Products.jsx';
import ProductsDetail from './components/products/ProductsDetail.jsx';
import SearchResult from './components/products/SearchResult.jsx';
import Blogs from './components/Blogs.jsx';
import Contact from './components/Contact.jsx';
import NotFound from './components/notFound/NotFound.jsx';
import Footer from './components/main/Footer.jsx';
import Carts from './components/cart/Cart.jsx'; 
import Checkout from './components/loginsignup/Checkout.jsx';
import Auth from './components/loginsignup/Auth.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products/:id" element={<ProductsDetail />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Carts />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
