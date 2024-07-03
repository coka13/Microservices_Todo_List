import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
import "./Auth.css"; // Import custom CSS for authentication styles

const Login = () => {
  const [email, setEmail] = useState(""); // State for email input
  const [error, setError] = useState(""); // State for error handling
  useEffect(() => {
    // Empty useEffect to mimic componentDidMount behavior
  }, []); // Empty dependency array ensures it runs only once on component mount
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Function to handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form from submitting the default way
    try {
      const response = await fetch(
        `http://localhost:3000/api/auth?email=${email}`
      );
      const jsonRes = await response.json();
      if (!response.ok) {
        setError(jsonRes.message); // Set error message if login fails
        throw new Error("Network response was not ok");
      }
      if (!jsonRes.error) {
        localStorage.setItem("user", JSON.stringify(jsonRes.user)); // Store user data in local storage on successful login
        navigate("/"); // Redirect to home page
      } else {
        setError(jsonRes.message); // Set error message if login credentials are incorrect
      }
    } catch (error) {
      setError("Incorrect email."); // Handle generic login error
      console.error("Login error:", error); // Log detailed error message to console
    }
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="card">
        <div className="card-body">
          <h2 className="text-center">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Enter email address"
                required
                onChange={(e) => {
                  setEmail(e.target.value); // Update email state on input change
                }}
              />
              {error && <p className="text-danger">{error}</p>} {/* Display error message if login fails */}
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
              <Link to="/register" className="btn btn-link w-100 mt-2">
                Don't have an account? Register!
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
