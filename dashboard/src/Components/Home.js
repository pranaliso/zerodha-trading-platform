import React from "react";
import { Outlet } from "react-router-dom";

import Menu from "./Menu";
import TopBar from "./TopBar";
import { GeneralContextProvider } from "./GeneralContext";

import "./Home.css";

const Home = () => {
  return (
    <GeneralContextProvider>
      <div className="home-container">
        <TopBar />

        <div className="dashboard-layout">
          <Menu />

          <main className="main-content">
            <Outlet />
          </main>
        </div>
      </div>
    </GeneralContextProvider>
  );
};

export default Home;