import React, { useEffect, useState } from "react";
import api from "../api/axios";
import "../App.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");

      // Adjust to backend response structure
      // If backend sends { status: "success", data: [...] }
      const productsArray = Array.isArray(res.data.data) ? res.data.data : [];
      setProducts(productsArray);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div className="loader">Loading products...</div>;

  return (
    <div className="container">
      <h2>Products</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>${p.price.toFixed(2)}</td>
                <td>{p.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Products;
