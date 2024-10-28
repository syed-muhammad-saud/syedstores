import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import Loader from '../loader/loader';
import './SearchResult.css'

const SearchResult = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = new URLSearchParams(useLocation().search).get('q'); 

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products`);
        const filteredResults = response.data.filter(product =>
          product.title.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filteredResults);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) {
    <Loader/>
  }

  return (
    <div className="containerss my-5 py-5">
      <h1 className="text-center">Search Results for "{query}"</h1>
      <div className="row">
        {results.length === 0 ? (
          <div className="nfnd text-center "><h1>No product found.</h1></div>
        ) : (
          results.map((product) => (
            <div key={product.id} className="col-md-4 mb-4">
              <Link to={`/products/${product.id}`} className="text-decoration-none">
                <div className="card h-100">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">${product.price}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchResult;
