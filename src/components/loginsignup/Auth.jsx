import React, { useState } from "react";
import "./Auth.css";
import { Link } from "react-router-dom";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  
  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem(username));
    
    if (storedUser && storedUser.password === password) {
      setResponseMessage("Login successful!");
     
    } else {
      setResponseMessage("Login failed. Check your credentials.");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const newUser = { username, email, password };
    localStorage.setItem(username, JSON.stringify(newUser));
    setResponseMessage("Signup successful! You can now log in.");
  };

  return (
    <div className="Lform">
      <div className="LoginForm">
        <form className="lbox" onSubmit={isLogin ? handleLogin : handleSignup}>
          <div className="button-container">
            <Link className={isLogin ? "activebtn" : "lsbtn"} onClick={() => setIsLogin(true)}>
              Login
            </Link>
            <Link className={!isLogin ? "activebtn" : "lsbtn"} onClick={() => setIsLogin(false)}>
              Signup
            </Link>
          </div>
          <div className="input-container">
            {!isLogin && (
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            )}
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">{isLogin ? "Login" : "Signup"}</button>
          {responseMessage && <p className="responseMessage">{responseMessage}</p>}
        </form>
      </div>
    </div>
  );
}
