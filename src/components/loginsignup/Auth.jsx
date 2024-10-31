import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  login,
  signup,
  resetPassword,
  clearResponseMessage,
} from "../../redux/slice/authSlice";
import "./Auth.css";

const securityQuestions = [
  "What is your pet name?",
  "What was the name of your first pet?",
  "What is your favorite food?",
  "What city were you born in?",
  "What is your favorite book?",
];

export default function Auth() {
  const dispatch = useDispatch();
  const { responseMessage, error, loading } = useSelector((state) => state.auth);

  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState(securityQuestions[0]);
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isReset, setIsReset] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
    setShowAlert(true);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(
      signup({ username, email, password, securityQuestion, securityAnswer })
    );
    setShowAlert(true);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ username, securityAnswer, newPassword }));
    setShowAlert(true);
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
        dispatch(clearResponseMessage());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert, dispatch]);

  const clearAlertAndSwitchMode = (newIsLogin, newIsReset) => {
    setShowAlert(false);
    setIsLogin(newIsLogin);
    setIsReset(newIsReset);
  };

  return (
    <div className="Looginnn">
      <div className="Lform">
        <div className="LoginForm">
          {/* Alert at the top */}
          {showAlert && (
            <div
              className={`alert ${
                responseMessage && responseMessage.includes("successful")
                  ? "alert-success"
                  : "alert-error"
              }`}
            >
              {responseMessage || error}
            </div>
          )}

          <form
            className="lbox"
            onSubmit={
              isReset
                ? handleResetPassword
                : isLogin
                ? handleLogin
                : handleSignup
            }
          >
            <div className="button-container">
              <Link
                className={isLogin && !isReset ? "activebtn" : "lsbtn"}
                onClick={() => clearAlertAndSwitchMode(true, false)}
              >
                Login
              </Link>
              <Link
                className={!isLogin && !isReset ? "activebtn" : "lsbtn"}
                onClick={() => clearAlertAndSwitchMode(false, false)}
              >
                Signup
              </Link>
            </div>

            <div className="input-container">
              {!isLogin && !isReset && (
                <>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <select
                    value={securityQuestion}
                    onChange={(e) => setSecurityQuestion(e.target.value)}
                    required
                  >
                    {securityQuestions.map((question, index) => (
                      <option key={index} value={question}>
                        {question}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Security Answer"
                    value={securityAnswer}
                    onChange={(e) => setSecurityAnswer(e.target.value)}
                    required
                  />
                </>
              )}

              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              {isReset ? (
                <>
                  <select
                    value={securityQuestion}
                    onChange={(e) => setSecurityQuestion(e.target.value)}
                    required
                  >
                    {securityQuestions.map((question, index) => (
                      <option key={index} value={question}>
                        {question}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Security Answer"
                    value={securityAnswer}
                    onChange={(e) => setSecurityAnswer(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </>
              ) : (
                <>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {isLogin && (
                    <div className="forgot-password-container">
                      <Link
                        className="forgot-password-link"
                        onClick={() => clearAlertAndSwitchMode(false, true)}
                      >
                        Forgot Password?
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Loading..." : isReset ? "Reset Password" : isLogin ? "Login" : "Signup"}
            </button>
            <div className="toggle-link">
              {isLogin ? (
                <p>
                  Don't have an account?{" "}
                  <Link onClick={() => clearAlertAndSwitchMode(false, false)}>
                    Go to Signup
                  </Link>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <Link onClick={() => clearAlertAndSwitchMode(true, false)}>
                    Go to Login
                  </Link>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
