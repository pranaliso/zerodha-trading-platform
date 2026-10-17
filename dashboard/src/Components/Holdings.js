import React, { useContext, useMemo } from "react";
import GeneralContext from "./GeneralContext";
import VerticalGraph from "./VerticalGraph";
import "./Holdings.css";

const Holdings = () => {
  const context = useContext(GeneralContext);

  // =========================================================
  // ALWAYS GET VALUES BEFORE ANY RETURN
  // =========================================================

  const holdings = context?.holdings || [];
  const dashboardLoading = context?.dashboardLoading || false;
  const error = context?.error || null;
  const openSellWindow = context?.openSellWindow;

  // =========================================================
  // CHART DATA
  // useMemo MUST be called before any conditional return
  // =========================================================

  const chartData = useMemo(() => {
    return {
      labels: holdings.map((stock) => stock.name),

      datasets: [
        {
          label: "Current Value",

          data: holdings.map((stock) => {
            const qty = Number(stock?.qty) || 0;
            const price = Number(stock?.price) || 0;

            return qty * price;
          }),

          backgroundColor: "#387ed1",
          borderRadius: 8,
        },
      ],
    };
  }, [holdings]);

  // =========================================================
  // TOTAL INVESTMENT
  // =========================================================

  const totalInvestment = useMemo(() => {
    return holdings.reduce((total, stock) => {
      const qty = Number(stock?.qty) || 0;
      const avg = Number(stock?.avg) || 0;

      return total + qty * avg;
    }, 0);
  }, [holdings]);

  // =========================================================
  // CURRENT VALUE
  // =========================================================

  const currentValue = useMemo(() => {
    return holdings.reduce((total, stock) => {
      const qty = Number(stock?.qty) || 0;
      const price = Number(stock?.price) || 0;

      return total + qty * price;
    }, 0);
  }, [holdings]);

  // =========================================================
  // TOTAL P&L
  // =========================================================

  const totalPnl = currentValue - totalInvestment;

  // =========================================================
  // RETURN %
  // =========================================================

  const returnPercentage =
    totalInvestment > 0
      ? (totalPnl / totalInvestment) * 100
      : 0;

  // =========================================================
  // LOADING
  // =========================================================

  if (!context) {
    return (
      <div className="loading">
        GeneralContext not found.
      </div>
    );
  }

  if (dashboardLoading) {
    return (
      <div className="loading">
        Loading Holdings...
      </div>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error) {
    return (
      <div className="loading">
        {error}
      </div>
    );
  }

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="holdings-container">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="holdings-header">

        <div>
          <h3 className="title">
            Holdings ({holdings.length})
          </h3>

          {holdings.length > 0 && (
            <p className="holdings-subtitle">
              Your current stock portfolio
            </p>
          )}
        </div>

      </div>

      {/* =====================================================
          PORTFOLIO SUMMARY
      ===================================================== */}

      {holdings.length > 0 && (
        <div className="holdings-summary">

          <div className="summary-box">
            <span>Investment</span>
            <strong>
              ₹{totalInvestment.toFixed(2)}
            </strong>
          </div>

          <div className="summary-box">
            <span>Current Value</span>
            <strong>
              ₹{currentValue.toFixed(2)}
            </strong>
          </div>

          <div className="summary-box">
            <span>Total P&amp;L</span>
            <strong
              className={
                totalPnl >= 0
                  ? "profit"
                  : "loss"
              }
            >
              ₹{totalPnl.toFixed(2)}
            </strong>
          </div>

          <div className="summary-box">
            <span>Returns</span>
            <strong
              className={
                returnPercentage >= 0
                  ? "profit"
                  : "loss"
              }
            >
              {returnPercentage >= 0 ? "+" : ""}
              {returnPercentage.toFixed(2)}%
            </strong>
          </div>

        </div>
      )}

      {/* =====================================================
          CHART
      ===================================================== */}

      {holdings.length > 0 && (
        <div className="chart-container">
          <VerticalGraph data={chartData} />
        </div>
      )}

      {/* =====================================================
          NO HOLDINGS
      ===================================================== */}

      {holdings.length === 0 ? (

        <div className="empty-state">

          <div className="empty-icon">
            📊
          </div>

          <h2>
            No Holdings
          </h2>

          <p>
            You don't have any stocks in your portfolio yet.
          </p>

          <p className="empty-small">
            Buy stocks from your Watchlist to see them here.
          </p>

        </div>

      ) : (

        /* ===================================================
           HOLDINGS TABLE
        =================================================== */

        <div className="order-table">

          <table>

            <thead>

              <tr>
                <th>Instrument</th>
                <th>Qty</th>
                <th>Avg. Cost</th>
                <th>LTP</th>
                <th>Current Value</th>
                <th>P&amp;L</th>
                <th>Net Change</th>
                <th>Day Change</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {holdings.map((stock, index) => {

                const qty =
                  Number(stock?.qty) || 0;

                const avg =
                  Number(stock?.avg) || 0;

                const price =
                  Number(stock?.price) || 0;

                const currentStockValue =
                  price * qty;

                const investment =
                  avg * qty;

                const pnl =
                  currentStockValue - investment;

                const day =
                  String(stock?.day || "0%");

                const isDayLoss =
                  day.startsWith("-");

                return (

                  <tr
                    key={stock?._id || index}
                  >

                    {/* Instrument */}

                    <td>
                      <strong>
                        {stock?.name}
                      </strong>
                    </td>

                    {/* Quantity */}

                    <td>
                      {qty}
                    </td>

                    {/* Average Cost */}

                    <td>
                      ₹{avg.toFixed(2)}
                    </td>

                    {/* LTP */}

                    <td>
                      ₹{price.toFixed(2)}
                    </td>

                    {/* Current Value */}

                    <td>
                      ₹{currentStockValue.toFixed(2)}
                    </td>

                    {/* P&L */}

                    <td
                      className={
                        pnl >= 0
                          ? "profit"
                          : "loss"
                      }
                    >
                      {pnl >= 0 ? "+" : ""}
                      ₹{pnl.toFixed(2)}
                    </td>

                    {/* Net Change */}

                    <td
                      className={
                        String(stock?.net || "").startsWith("-")
                          ? "loss"
                          : "profit"
                      }
                    >
                      {stock?.net || "0%"}
                    </td>

                    {/* Day Change */}

                    <td
                      className={
                        isDayLoss
                          ? "loss"
                          : "profit"
                      }
                    >
                      {day}
                    </td>

                    {/* SELL */}

                    <td>

                      <button
                        className="sell-btn"
                        onClick={() =>
                          openSellWindow &&
                          openSellWindow(stock)
                        }
                      >
                        SELL
                      </button>

                    </td>

                  </tr>

                );
              })}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
};

export default Holdings;