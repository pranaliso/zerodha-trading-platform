import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3002/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add JWT token to every request
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
export const DASHBOARD_URL = "http://localhost:3001";

// Frontend URL
export const FRONTEND_URL = "http://localhost:3000";


// Capture token from dashboard URL
export const captureAuthFromUrl = () => {
  const hash = window.location.hash;

  if (!hash || !hash.startsWith("#token=")) {
    return null;
  }

  const token = decodeURIComponent(
    hash.substring("#token=".length)
  );

  if (token) {
    localStorage.setItem("token", token);

    window.history.replaceState(
      null,
      "",
      window.location.pathname
    );

    return token;
  }

  return null;
};


// Redirect to dashboard
export const redirectToDashboard = (token) => {
  if (!token) {
    console.error("Token missing");
    return;
  }

  localStorage.setItem("token", token);

  window.location.href =
    `${DASHBOARD_URL}/#token=${encodeURIComponent(token)}`;
};


export default API;