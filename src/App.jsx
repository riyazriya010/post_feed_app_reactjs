
// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./Pages/Home.jsx";
import SignupPage from './Pages/Signup.jsx';
import LoginPage from './Pages/Login.jsx';
import AddPost from "./Pages/AddPost.jsx";
import ProtectedRoute from './Authentication/ProtectedRoute.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/addPost" element={
          <ProtectedRoute>
            <AddPost />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;

