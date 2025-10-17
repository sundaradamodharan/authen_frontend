// src/api/axios.js
import axios from "axios";

let accessToken = null;

const api = axios.create({
  baseURL: "https://authen-backend-1jq7.onrender.com/api",
  withCredentials: true, // needed for httpOnly cookies
});

// Request interceptor to attach access token
api.interceptors.request.use(config => {
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

// Response interceptor to handle 401 (expired access token)
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/refresh_token",
          {},
          { withCredentials: true }
        );
        accessToken = res.data.accessToken;
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (err) {
        console.error("Refresh token failed", err);
      }
    }

    return Promise.reject(error);
  }
);

export const setAccessToken = token => {
  accessToken = token;
};

export default api;
