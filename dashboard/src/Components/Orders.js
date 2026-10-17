import React, { useContext } from "react";
import { Link } from "react-router-dom";
import GeneralContext from "./GeneralContext";
import "./Orders.css";

const Orders = () => {
  const context = useContext(GeneralContext);

  const orders = Array.isArray(context?.orders)
    ? context.orders
    : [];

  const dashboardLoading =
    context?.dashboardLoading;

  const error = context?.error;

  // =========================================================
  // LOADING
  // =========================================================

  if (dashboardLoading) {
    return (
      <div className="orders-page">
        <div className="orders-loading">
          <div className="loading-spinner"></div>
          <p>Loading Orders...</p>
        </div>
      </div>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error) {
    return (
      <div className="orders-page">
        <div className="orders-loading">
          <h3>Unable to load orders</h3>
          <p>{error}</p>

          {context?.refreshDashboard && (
            <button
              type="button"
              className="retry-btn"
              onClick={context.refreshDashboard}
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  // =========================================================
  // NO ORDERS
  // =========================================================

  if (orders.length === 0) {
    return (
      <div className="orders-page">

        <div className="no-orders">

          {/* =================================================
              ILLUSTRATION
          ================================================= */}

          <div className="no-orders-image">

            <div className="orders-illustration">

              <div className="illustration-circle">
                <span>📋</span>
              </div>

              <div className="floating-card card-one">
                <span>+</span>
              </div>

              <div className="floating-card card-two">
                <span>₹</span>
              </div>

              <div className="floating-card card-three">
                <span>↗</span>
              </div>

            </div>

          </div>

          {/* =================================================
              TEXT
          ================================================= */}

          <h2>
            No Orders
          </h2>

          <p>
            You haven't placed any orders yet.
          </p>

          <p className="no-orders-subtext">
            Start trading by selecting a stock
            from your watchlist.
          </p>

          {/* =================================================
              GET STARTED
          ================================================= */}

          <Link
            to="/"
            className="get-started-btn"
          >
            Get Started
          </Link>

        </div>

      </div>
    );
  }

  // =========================================================
  // ORDERS TABLE
  // =========================================================

  return (
    <div className="orders-page">

      <div className="order-table">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="orders-header">

          <div>
            <h2>Orders</h2>

            <p>
              Your recent orders
            </p>
          </div>

          <div className="order-count">
            {orders.length}
          </div>

        </div>

        {/* =================================================
            TABLE
        ================================================= */}

        <div className="table-wrapper">

          <table>

            <thead>

              <tr>
                <th>Instrument</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Mode</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {orders.map(
                (order, index) => {

                  const mode =
                    String(
                      order?.mode ||
                      order?.type ||
                      "BUY"
                    ).toUpperCase();

                  const status =
                    String(
                      order?.status ||
                      "COMPLETED"
                    );

                  const price =
                    Number(
                      order?.price || 0
                    );

                  const quantity =
                    Number(
                      order?.qty ||
                      order?.quantity ||
                      0
                    );

                  return (
                    <tr
                      key={
                        order?._id ||
                        order?.id ||
                        index
                      }
                    >

                      {/* INSTRUMENT */}

                      <td>

                        <div className="instrument">

                          <strong>
                            {order?.name ||
                              order?.symbol ||
                              "Unknown"}
                          </strong>

                          {order?.company && (
                            <small>
                              {order.company}
                            </small>
                          )}

                        </div>

                      </td>

                      {/* QUANTITY */}

                      <td>
                        {quantity}
                      </td>

                      {/* PRICE */}

                      <td>
                        ₹
                        {price.toLocaleString(
                          "en-IN",
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}
                      </td>

                      {/* MODE */}

                      <td>

                        <span
                          className={
                            mode === "BUY"
                              ? "buy-badge"
                              : "sell-badge"
                          }
                        >
                          {mode}
                        </span>

                      </td>

                      {/* STATUS */}

                      <td>

                        <span
                          className={
                            String(
                              status
                            ).toLowerCase() ===
                            "completed"
                              ? "status-completed"
                              : "status-pending"
                          }
                        >
                          {status}
                        </span>

                      </td>

                    </tr>
                  );
                }
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Orders;