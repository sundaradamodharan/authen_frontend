import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
        <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
        <Route path="/users" element={<PrivateRoute role="admin"><Users /></PrivateRoute>} />

        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
