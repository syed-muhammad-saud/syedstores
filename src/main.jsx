import React from 'react';
import ReactDOM from 'react-dom/client'; // Import createRoot from react-dom/client
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store'; // Make sure to import your Redux store

const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot
root.render(
  <Provider store={store}> {/* Wrap your App with Provider to pass the store */}
    <App />
  </Provider>
);
