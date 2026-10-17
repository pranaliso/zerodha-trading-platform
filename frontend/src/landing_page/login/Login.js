import React, { useState } from "react";
import API, { redirectToDashboard } from "../../api";
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      console.log("Sending login request...");

      const response = await API.post("/auth/login", {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      const data = response.data;

      console.log("LOGIN RESPONSE:", data);

      if (!data.success) {
        setError(data.message || "Login failed");
        return;
      }

      if (!data.token) {
        setError("Login successful, but no token was received.");
        return;
      }

      // Save JWT token
      localStorage.setItem("token", data.token);

      // Save user information
      if (data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      setMessage("Login successful! Redirecting...");

      console.log("JWT saved successfully.");
      console.log("Redirecting to dashboard...");

      // Redirect to dashboard
      redirectToDashboard(data.token);

    } catch (err) {
      console.error("LOGIN ERROR:", err);

      if (err.response) {
        setError(
          err.response.data?.message ||
          "Login failed"
        );
      } else if (err.request) {
        setError(
          "Unable to connect to the server. Make sure the backend is running on port 3002."
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6">

          <h2 className="text-center mb-4">
            Login
          </h2>

          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">
                Email
              </label>

              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label">
                Password
              </label>

              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>

          </form>

          {/* Signup */}
          <p className="text-center mt-3">
            New user?{" "}
            <Link to="/signup">
              Create an account
            </Link>
          </p>

          {/* Success */}
          {message && (
            <div className="alert alert-success mt-3">
              {message}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="alert alert-danger mt-3">
              {error}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Login;