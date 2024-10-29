import './App.css';
import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/main/NavBar';
import ScrollToTop from './components/ScrollToTop'; 
// import Home from './components/Home'; 
import Products from './components/products/Products.jsx';
import ProductsDetail from './components/products/ProductsDetail.jsx'; 
import SearchResult from './components/products/SearchResult'
import Blogs from './components/Blogs'; 
import Contact from './components/Contact'; 
// import Login from './components/loginsignup/Auth';
// import Signup from './components/loginsignup/signup';
import NotFound  from './components/notFound/NotFound';
import Footer from './components/main/Footer';
import Carts from './components/loginsignup/Carts.jsx';
import Checkout from './components/loginsignup/Checkout';
import Auth from './components/loginsignup/Auth';

function App() {
  return (
    <Router>
      <Navbar/>
      <ScrollToTop />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
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
