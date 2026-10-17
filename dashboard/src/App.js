import React, { useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Home from "./Components/Home";
import Dashboard from "./Components/Dashboard";

import Orders from "./Components/Orders";
import Holdings from "./Components/Holdings";
import Positions from "./Components/Positions";
import Funds from "./Components/Funds";
import Apps from "./Components/Apps";
import Profile from "./Components/Profile";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;

    console.log("Dashboard URL hash:", hash);

    // ==========================================
    // CAPTURE JWT TOKEN FROM LOGIN
    // ==========================================

    if (hash && hash.startsWith("#token=")) {
      try {
        const token = decodeURIComponent(
          hash.substring("#token=".length)
        );

        if (token) {
          console.log("JWT received by dashboard");

          localStorage.setItem("token", token);

          // Remove token from URL
          window.history.replaceState(
            null,
            "",
            window.location.pathname
          );

          navigate("/", {
            replace: true,
          });
        }
      } catch (error) {
        console.error(
          "Error while processing dashboard token:",
          error
        );

        localStorage.removeItem("token");

        navigate("/", {
          replace: true,
        });
      }
    }
  }, [navigate]);

  return (
    <Routes>

      {/* ==========================================
          MAIN APPLICATION LAYOUT
      ========================================== */}

      <Route path="/" element={<Home />}>

        {/* ==========================================
            DEFAULT DASHBOARD
            / 
        ========================================== */}

        <Route
          index
          element={<Dashboard />}
        />

        {/* ==========================================
            DASHBOARD
            /dashboard
        ========================================== */}

        <Route
          path="dashboard"
          element={<Dashboard />}
        />

        {/* ==========================================
            ORDERS
        ========================================== */}

        <Route
          path="orders"
          element={<Orders />}
        />

        {/* ==========================================
            HOLDINGS
        ========================================== */}

        <Route
          path="holdings"
          element={<Holdings />}
        />

        {/* ==========================================
            POSITIONS
        ========================================== */}

        <Route
          path="positions"
          element={<Positions />}
        />

        {/* ==========================================
            FUNDS
        ========================================== */}

        <Route
          path="funds"
          element={<Funds />}
        />

        {/* ==========================================
            APPS
        ========================================== */}

        <Route
          path="apps"
          element={<Apps />}
        />

        {/* ==========================================
            PROFILE
        ========================================== */}

        <Route
          path="profile"
          element={<Profile />}
        />

      </Route>

      {/* ==========================================
          UNKNOWN URL
        ========================================== */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>
  );
}

export default App;