import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; // your axios instance
import "../App.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      // Adjust to backend response
      const ordersArray = Array.isArray(res.data.data) ? res.data.data : [];
      setOrders(ordersArray);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setOrders([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders((prev) => prev.filter((order) => order.id !== id));
    } catch (err) {
      console.error("Error deleting order", err);
    }
  };

  if (loading) return <div className="loader">Loading orders...</div>;

  return (
    <div className="container">
      <h2>Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.product_name}</td>
                <td>{order.quantity}</td>
                <td>${Number(order.total_price || 0).toFixed(2)}</td>
                <td>
                  {order.created_at
                    ? new Date(order.created_at).toLocaleDateString()
                    : "-"}
                </td>
                <td>
                  <button
                    className="btn-view"
                    onClick={() => navigate(`/orders/${order.id}`)}
                  >
                    View
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(order.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
