import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
import "./Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {}, []);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form from submitting the default way
    try {
      const response = await fetch(
        `http://localhost:3000/api/auth?email=${email}`
      );
      const jsonRes = await response.json();
      if (!response.ok) {
        setError(jsonRes.message);
        throw new Error("Network response was not ok");
      }
      if (!jsonRes.error) {
        localStorage.setItem("user", JSON.stringify(jsonRes.user));
        navigate("/");
      } else {
        setError(jsonRes.message);
      }
    } catch (error) {
      setError("Incorrect email.");
      console.error("Login error:", error);
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
                  setEmail(e.target.value);
                }}
              />
              {error && <p className="text-danger">{error}</p>}
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
