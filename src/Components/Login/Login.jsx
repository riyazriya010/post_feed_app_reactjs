// src/copm/login/login.jsx
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Authentication/User";
import "./Login.css";
import ExistsAlert from '../Alerts/ExistsAlert.jsx'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user, userLogin } = useContext(AuthContext);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('')
  const [error, setError] = useState({})

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const validationError = await validateForm({ email, password })
    setError(validationError)

    if (Object.keys(validationError).length === 0) {
      const authenticated = await userLogin({ email, password });
      if (authenticated) {
        console.log('Login Form Submitted Successfully');
        navigate("/home")
      } else {
        setAlertMessage('Invalid Credentails, Check the details');
        setShowAlert(true)
      }
    } else {
      console.log('Form submission failed due to validation errors.');
    }
  };

  const validateForm = (data) => {
    const errors = {}

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!data.email.trim()) {
      errors.email = 'Email Required'
    } else if (!emailRegex.test(data.email)) {
      errors.email = 'Invalid Email'
    }

    if (!data.password) {
      errors.password = 'Password Required'
    } else if (data.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long '
    }

    return errors;
  }

  return (
    <div className="login-container">
      {
        showAlert && <ExistsAlert message={alertMessage} onClose={() => setShowAlert(false)} />
      }
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
        <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        {error.email && (
                        <span className="error-message">
                            {error.email}
                        </span>
                    )}
        </div>
        <div>
        <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        {error.password && (
                        <span className="error-message">
                            {error.password}
                        </span>
                    )}
        </div>
        <button type='submit'>Login</button>
      </form>
      <p>Don't have an account? <a href="/signup">Signup</a></p>
    </div>
  );
}

export default Login;
