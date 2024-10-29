import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Products.css';
import { Link } from 'react-router-dom';
// import Loader from '../loader/Loader';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(['all']);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products', error);
        alert('Products Fetching failed');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const result = products
      .filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((product) =>
        selectedCategories.includes('all') ? true : selectedCategories.includes(product.category)
      )
      .filter((product) =>
        selectedPriceRanges.length === 0 || selectedPriceRanges.some((range) =>
          product.price >= range[0] && product.price <= range[1]
        )
      );
    setFilteredProducts(result);
  }, [searchTerm, selectedCategories, selectedPriceRanges, products]);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleCategoryChange = (category) => {
    if (category === 'all') {
      setSelectedCategories(['all']);
    } else {
      const updatedCategories = selectedCategories.includes(category)
        ? selectedCategories.filter((cat) => cat !== category)
        : [...selectedCategories.filter((cat) => cat !== 'all'), category];
      setSelectedCategories(updatedCategories);
    }
  };

  const handlePriceRangeChange = (range) => {
    const updatedPriceRanges = selectedPriceRanges.some((r) => r[0] === range[0] && r[1] === range[1])
      ? selectedPriceRanges.filter((r) => r[0] !== range[0] || r[1] !== range[1])
      : [...selectedPriceRanges, range];
    setSelectedPriceRanges(updatedPriceRanges);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  if (loading) {
    // return <Loader />;
    return <>
      <p>Loading Please Wait</p>
    </>
  }

  const categories = ['all', ...new Set(products.map((p) => p.category))];
  const priceRanges = [
    [0, 49],
    [50, 99],
    [100, 149],
    [150, 199],
    [200, 1000]
  ];

  return (
    <div className="container-fluid py-5 my-5">
      <div className="row">
        {/* Sidebar for Filters */}
        <div className="col-lg-3 col-md-4 mb-4">
          <div className="border p-3 bg-white rounded shadow-sm">
            <div>
              <h5
                className="mb-3 d-flex justify-content-between align-items-center"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                style={{ cursor: 'pointer' }}
              >
                Category
                <h4>{isCategoryOpen ? '−' : '+'}</h4>
              </h5>
              {isCategoryOpen && (
                <ul className="list-unstyled">
                  {categories.map((cat, index) => (
                    <li key={index}>
                      <label>
                        <input
                          type="checkbox"
                          name="category"
                          value={cat}
                          checked={selectedCategories.includes(cat)}
                          onChange={() => handleCategoryChange(cat)}
                          className="me-2"
                        />
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <hr />

            {/* Price Section */}
            <div>
              <h5
                className="mb-3 d-flex justify-content-between align-items-center"
                onClick={() => setIsPriceOpen(!isPriceOpen)}
                style={{ cursor: 'pointer' }}
              >
                Price
                <h4>{isPriceOpen ? '−' : '+'}</h4>
              </h5>
              {isPriceOpen && (
                <ul className="list-unstyled">
                  {priceRanges.map((range, index) => (
                    <li key={index}>
                      <label>
                        <input
                          type="checkbox"
                          name="price"
                          onChange={() => handlePriceRangeChange(range)}
                          checked={selectedPriceRanges.some(
                            (selectedRange) => selectedRange[0] === range[0] && selectedRange[1] === range[1]
                          )}
                        />
                        {` $${range[0]} to $${range[1]}`}
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Products and Search Bar */}
        <div className="col-lg-9 col-md-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Products</h2>
            <div className="d-none d-md-block">
              <input
                type="text"
                placeholder="Search products..."
                className="form-control"
                style={{ width:"300px" }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="row mb-4 d-md-none">
            <input
              type="text"
              placeholder="Search products..."
              className="form-control ms-3"
              style={{ width: '90%' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <hr className=' mt-3'/>
          </div>

          <div className="row">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <div key={product.id} className="col-md-6 col-lg-4 mb-4">
                  <Link to={`/products/${product.id}`} className="text-decoration-none">
                    <div className="card h-100 shadow-sm border-0">
                      <img
                        src={product.image}
                        className="card-img-top"
                        alt={product.title}
                        style={{ height: '250px', objectFit: 'contain' }}
                      />
                      <div className="card-body">
                        <h6 className="card-title text-dark">{product.title}</h6>
                        <p className="card-text text-muted">${product.price}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-12 text-center" style={{paddingBottom:"280px"}}>
                <h1 className="text-muted">Sorry, No Product found</h1>
              </div>
            )}
          </div>

          {/* Pagination */}
          {currentProducts.length > 0 && (
            <div className="pagination-container text-center my-4">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  className={`btn btn-outline-primary mx-1 ${currentPage === index + 1 ? 'active' : ''}`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
