// src/comp/signup/signup.jsx
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Authentication/User.jsx";
import ExistsAlert from "../Alerts/ExistsAlert.jsx";
import "./Signup.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  
  const { user, UserSignup } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password || !username) {
      console.error("Please fill in all fields.");
      return;
    }
    
    if (typeof email !== "string" || typeof password !== "string" || email.indexOf("@") === -1) {
      console.error("Invalid email or password.");
      return;
    }

    const authenticated = await UserSignup({ email, password, username });
    if (authenticated) {
      navigate('/');
    } else {
      setAlertMessage("User already exists. Please use a different email.");
      setShowAlert(true);
    }
  };

  return (
    <div className="signup-container">
      {showAlert && (
        <ExistsAlert 
          message={alertMessage} 
          onClose={() => setShowAlert(false)} 
        />
      )}
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input type='text' placeholder='Name' value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'>Sign Up</button>
      </form>
      Already have an account? <a href="/">Login</a> 
    </div>
  );
}

export default Signup;
