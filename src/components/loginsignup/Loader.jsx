// src/components/Loader.js
import React from 'react';
import '../loginsignup/Loader.css'; 

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
