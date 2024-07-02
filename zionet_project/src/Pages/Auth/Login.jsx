import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {}, []);
  const navigate = useNavigate();
  const handleLogin = async () => {
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
  };
  return (
    <div class="container">
      <div class="form-container">
        <h2>Login</h2>
        <div>
          <label for="email">Email Address</label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            id="email"
            name="email"
            required
          />
          {error && <p className="text-danger">{error}</p>}
          <button onClick={handleLogin}>Login</button>
        </div>
        <Link to="/register">
          <button class="register-button">Register </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
