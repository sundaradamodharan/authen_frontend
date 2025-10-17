import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <span className="logo">Admin Dashboard</span>
        {user && (
          <>
            <Link to="/products">Products</Link>
            <Link to="/orders">Orders</Link>
            {user.role === "admin" && <Link to="/users">Users</Link>}
          </>
        )}
      </div>
      <div className="nav-right">
        {user ? (
          <>
            <span>Hello, {user.username}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
