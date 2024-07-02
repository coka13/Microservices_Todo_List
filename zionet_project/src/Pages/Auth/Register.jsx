import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
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
  };
  return (
    <div class="container">
      <div class="form-container">
        <h2>Register</h2>
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

          <button type="submit" onClick={handleRegister}>
            Register
          </button>
          <Link to="/auth">Already Registered? Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
