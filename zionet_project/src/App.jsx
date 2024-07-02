import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage/HomePage";
import Login from "./Pages/Auth/Login";
import { useEffect, useState } from "react";
import Register from "./Pages/Auth/Register";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const localStorageUser = localStorage.getItem("user");
    if (localStorageUser) {
      setUser(JSON.parse(localStorageUser));
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
