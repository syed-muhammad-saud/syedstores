import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, clearResponseMessage, updateUser } from '../../redux/slice/authSlice'; 
import './DashBoard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  
  // Select user data from Redux store
  const user = useSelector((state) => state.auth.user);
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // State for message type

  useEffect(() => {
    // Clear any response message on component mount
    dispatch(clearResponseMessage());
  }, [dispatch]);


  const handleUpdate = (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setMessage('New passwords do not match!');
      setMessageType('error');
      return;
    }

    const updatedUser = { username, email, oldPassword, newPassword };
    
    dispatch(updateUser(updatedUser))
      .unwrap()
      .then(() => {
        setMessage('User information updated successfully!');
        setMessageType('success');
        // Clear fields after successful update
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      })
      .catch((error) => {
        setMessage(error);
        setMessageType('error');
      });
  };

  return (
    <div className="user-dashboard container mt-5 pt-5">
      <h1 className="dashboard-title text-center">User Dashboard</h1>
      <div className="user-info-card card mb-4">
        <div className="user-info-header card-header">
          <h5>User Information</h5>
        </div>
        <div className="user-info-body card-body">
          <form onSubmit={handleUpdate}>
            <div className="form-group mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="oldPassword" className="form-label">Old Password</label>
              <input
                type="password"
                className="form-control"
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="newPassword" className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="confirmNewPassword" className="form-label">Confirm New Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmNewPassword"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Update</button>
          </form>
          {message && (
            <p className={`mt-3 ${messageType === 'success' ? 'text-success' : 'text-danger'}`}>
              {message}
            </p>
          )}
        </div>
      </div>
      
      <div className="order-details-card card mb-4">
        <div className="order-details-header card-header">
          <h5>Order Details</h5>
        </div>
        <div className="order-details-body card-body">
          <p>We are working on it.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
