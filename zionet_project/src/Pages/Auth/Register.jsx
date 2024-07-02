import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
import "./Auth.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent form from submitting the default way
    try {
      const response = await fetch("http://localhost:3000/api/auth/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const jsonRes = await response.json();

      if (!response.ok) {
        setError(jsonRes.error);
        throw new Error("Network response was not ok");
      } else {
        navigate("/auth");
      }
    } catch (error) {
      setError("An error occurred during registration. Please try again.");
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="card">
        <div className="card-body">
          <h2 className="text-center">Register</h2>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="form-control"
                placeholder="Enter email address"
                required
              />
              {error && <p className="text-danger">{error}</p>}
              <button type="submit" className="btn btn-primary w-100">
                Register
              </button>
              <Link to="/auth" className="btn btn-link w-100 mt-2">
                Already Registered? Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
