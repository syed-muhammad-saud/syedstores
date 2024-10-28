import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addToCart, removeFromCart } from "../../redux/reducers/cartReducer";
import "./ProductDetails.css";
import Loader from "../loader/loader";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleIncrease = () => {
    setQuantity((prevQuantity) => Math.min(prevQuantity + 1, 100));
    setErrorMessage("");
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      setErrorMessage("");
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 100) {
      setErrorMessage("Quantity cannot exceed 100");
      setQuantity(100);
    } else if (value < 1) {
      setErrorMessage("Quantity cannot be less than 1");
      setQuantity(1);
    } else {
      setErrorMessage("");
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    const itemExists = cartItems.some((item) => item.id === product.id);
    if (itemExists) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(
        addToCart({
          id: product.id,
          title: product.title,
          image: product.image,
          price: product.price,
          quantity,
        })
      );
    }
  };

  const handleViewCart = () => {
    navigate("/cart");
  };

  // New function to handle back navigation
  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <div className="nofnd text-center">
        <h1>Product not found.</h1>
      </div>
    );
  }

  const itemInCart = cartItems.some((item) => item.id === product.id);

  return (
    <div className="container my-5 py-5">
      <button className="btn btn-outline-secondary mb-3" onClick={handleGoBack}>
        &lt; 
      </button>
      <div className="row g-0">
        <div className="col-md-6 mb-4 d-flex justify-content-center">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h1 className="card-title text-primary">{product.title}</h1>
            {document.title= product.title }
            <p className="lead text-success">${product.price}</p>
            <p className="card-text">{product.description}</p>
            <p className="card-text">
              <small className="text-muted">Category: {product.category}</small>
            </p>
            <div className="quantity-selector my-4 d-flex align-items-center">
              <button
                className="btn btn-outline-secondary"
                onClick={handleDecrease}
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="quantity-input mx-2 text-center"
                min="1"
                max="100"
              />
              <button
                className="btn btn-outline-secondary"
                onClick={handleIncrease}
              >
                +
              </button>
            </div>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <div className="d-flex align-items-center">
              <button
                className={`btn btn-lg me-2 ${
                  itemInCart ? "btn-danger" : "btn-primary"
                }`}
                onClick={handleAddToCart}
              >
                {itemInCart ? "Remove from Cart" : "Add to Cart"}
              </button>
              {itemInCart && (
                <button
                  className="btn btn-secondary btn-lg"
                  onClick={handleViewCart}
                >
                  View Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
