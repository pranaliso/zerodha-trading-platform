import React from "react";
import { Outlet } from "react-router-dom";

import Menu from "./Menu";
import TopBar from "./TopBar";


const Layout = () => {

  return (

    <div className="dashboard-container">

      {/* Left Sidebar */}
      <Menu />


      {/* Right Section */}
      <div className="main-section">

        <TopBar />

        <div className="content">
          <Outlet />
        </div>

      </div>

    </div>

  );
};


export default Layout;