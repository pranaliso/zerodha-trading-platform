import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3002/api",

  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Dashboard URL
export const DASHBOARD_URL =
  "http://localhost:3001";

// Redirect after login
export const redirectToDashboard = (token) => {
  if (!token) {
    console.error(
      "No JWT token received."
    );
    return;
  }

  // Save token
  localStorage.setItem(
    "token",
    token
  );

  // Send token to dashboard
  window.location.href =
    `${DASHBOARD_URL}/#token=${encodeURIComponent(
      token
    )}`;
};

export default API;