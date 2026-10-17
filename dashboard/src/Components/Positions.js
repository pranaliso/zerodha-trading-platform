import React, { useContext } from "react";
import GeneralContext from "./GeneralContext";
import "./Positions.css";

const Positions = () => {
  const context = useContext(GeneralContext);
  const positions = context?.positions || [];
  const dashboardLoading = context?.dashboardLoading;
  const error = context?.error;

  if (dashboardLoading) {
    return <div className="loading">Loading Positions...</div>;
  }

  if (error) {
    return <div className="loading">{error}</div>;
  }

  return (
    <div className="positions-container">
      <h3 className="title">Positions ({positions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((stock, index) => {
              const currentValue = stock.price * stock.qty;
              const pnl = currentValue - stock.avg * stock.qty;
              const isProfit = pnl >= 0;

              return (
                <tr key={stock._id || index}>
                  <td>{stock.product}</td>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>₹{stock.avg}</td>
                  <td>₹{stock.price}</td>
                  <td className={isProfit ? "profit" : "loss"}>
                    ₹{pnl.toFixed(2)}
                  </td>
                  <td className={stock.day?.startsWith("-") ? "loss" : "profit"}>
                    {stock.day}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Positions;
