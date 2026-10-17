import React from "react";
import "./TopBar.css";

const TopBar = () => {
  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="index-box">
          <p className="index-name">NIFTY 50</p>
          <p className="index-points">24,812.05</p>
          <p className="percent profit">+0.42%</p>
        </div>

        <div className="index-box">
          <p className="index-name">SENSEX</p>
          <p className="index-points">81,326.70</p>
          <p className="percent loss">-0.18%</p>
        </div>

        <div className="index-box">
          <p className="index-name">BANK NIFTY</p>
          <p className="index-points">51,204.30</p>
          <p className="percent profit">+0.27%</p>
        </div>
      </div>

      <div className="topbar-status">
        <span className="status-dot" />
        Markets open
      </div>
    </div>
  );
};

export default TopBar;
