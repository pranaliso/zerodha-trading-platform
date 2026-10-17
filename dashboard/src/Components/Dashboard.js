import React from "react";

import WatchList from "./WatchList";
import Summary from "./Summary";

import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <WatchList />
      </aside>

      <main className="dashboard-main">
        <Summary />
      </main>
    </div>
  );
};

export default Dashboard;
