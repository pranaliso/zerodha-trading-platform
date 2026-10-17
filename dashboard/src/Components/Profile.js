import React, { useContext, useEffect, useState } from "react";
import GeneralContext from "./GeneralContext";
import api from "../api";
import "./Summary.css";

const Profile = () => {
  const context = useContext(GeneralContext);
  const profile = context?.profile;

  const [form, setForm] = useState({
    username: "",
    email: "",
    fullName: "",
    phone: "",
    bio: "",
    profileImage: "",
    currentPassword: "",
    newPassword: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (profile) {
      setForm((prev) => ({
        ...prev,
        username: profile.username || "",
        email: profile.email || "",
        fullName: profile.fullName || "",
        phone: profile.phone || "",
        bio: profile.bio || "",
        profileImage: profile.profileImage || "",
      }));
    }
  }, [profile]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const payload = {
        username: form.username,
        email: form.email,
        fullName: form.fullName,
        phone: form.phone,
        bio: form.bio,
        profileImage: form.profileImage,
      };

      if (form.newPassword) {
        payload.currentPassword = form.currentPassword;
        payload.newPassword = form.newPassword;
      }

      await api.put("/users/profile", payload);
      await context.refreshDashboard();
      setForm((prev) => ({ ...prev, currentPassword: "", newPassword: "" }));
      setMessage("Profile updated successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update profile");
    }
  };

  if (context?.dashboardLoading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (context?.error) {
    return <div className="loading">{context.error}</div>;
  }

  return (
    <div className="summary-container">
      <div className="summary-header">
        <h2>My Profile</h2>
        <p>Update your account details. Password is never shown.</p>
      </div>

      <form className="summary-card" onSubmit={handleSubmit}>
        {["username", "email", "fullName", "phone", "bio", "profileImage"].map((field) => (
          <div key={field} style={{ marginBottom: 12 }}>
            <label style={{ display: "block", marginBottom: 4 }}>
              {field}
            </label>
            <input
              name={field}
              value={form[field]}
              onChange={handleChange}
              style={{ width: "100%", padding: 8 }}
            />
          </div>
        ))}

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", marginBottom: 4 }}>Current password</label>
          <input
            type="password"
            name="currentPassword"
            value={form.currentPassword}
            onChange={handleChange}
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", marginBottom: 4 }}>New password</label>
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        {message && <p className="profit">{message}</p>}
        {error && <p className="loss">{error}</p>}

        <button className="buy-btn" type="submit">
          Save profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
