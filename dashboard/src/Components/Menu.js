import React, { useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import GeneralContext from "./GeneralContext";
import "./Menu.css";

const links = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/orders", label: "Orders" },
  { to: "/holdings", label: "Holdings" },
  { to: "/positions", label: "Positions" },
  { to: "/funds", label: "Funds" },
  { to: "/apps", label: "Apps" },
];

const Menu = () => {
  const context = useContext(GeneralContext);
  const location = useLocation();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const username = context?.profile?.username || "USER";
  const initials = username.slice(0, 2).toUpperCase();

  return (
    <div className="menu-container">
      <div className="logo-container">
        <img
          src="/logo.svg"
          alt="Zerodha Logo"
          className="logo-image"
          onClick={() => window.location.reload()}
        />
      </div>

      <div className="menus">
        <ul>
          {links.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  isActive || (item.to === "/" && location.pathname === "/dashboard")
                    ? "menu-link selected"
                    : "menu-link"
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="profile-wrap">
          <div
            className="profile"
            onClick={() => setIsProfileDropdownOpen((open) => !open)}
          >
            <div className="avatar">{initials}</div>
            <p className="username">{username}</p>
          </div>

          {isProfileDropdownOpen && (
            <div className="profile-dropdown">
              <NavLink to="/profile" onClick={() => setIsProfileDropdownOpen(false)}>
                My Profile
              </NavLink>
              <NavLink to="/profile" onClick={() => setIsProfileDropdownOpen(false)}>
                Settings
              </NavLink>
              <button type="button" onClick={context?.logout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
