import React, { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FaWallet,
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

import GeneralContext from "./GeneralContext";
import DoughnutChart from "./DoughnutChart";
import "./Summary.css";

const toNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
};

const formatINR = (value) =>
  toNumber(value).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const parsePercent = (value) =>
  toNumber(String(value ?? "0").replace("%", ""));

const signedAmount = (value) => {
  const amount = toNumber(value);
  const prefix = amount > 0 ? "+" : "";
  return `${prefix}₹${formatINR(amount)}`;
};

const Summary = () => {
  const context = useContext(GeneralContext);

  const holdings = Array.isArray(context?.holdings) ? context.holdings : [];
  const orders = Array.isArray(context?.orders) ? context.orders : [];
  const stocks = Array.isArray(context?.stocks) ? context.stocks : [];
  const funds = context?.funds;
  const profile = context?.profile;
  const dashboardLoading = context?.dashboardLoading;
  const error = context?.error;
  const refreshDashboard = context?.refreshDashboard;
  const openBuyWindow = context?.openBuyWindow;
  const openAnalytics = context?.openAnalytics;

  const stats = useMemo(() => {
    const availableCash = toNumber(funds?.availableCash);
    const usedMargin = toNumber(funds?.usedMargin);
    const openingBalance = toNumber(funds?.openingBalance);

    let investment = 0;
    let currentValue = 0;
    let dayPnl = 0;

    holdings.forEach((stock) => {
      const qty = toNumber(stock?.qty);
      const avg = toNumber(stock?.avg);
      const price = toNumber(stock?.price);
      const stockCurrentValue = qty * price;

      investment += qty * avg;
      currentValue += stockCurrentValue;
      dayPnl += stockCurrentValue * (parsePercent(stock?.day ?? stock?.percent) / 100);
    });

    const profit = currentValue - investment;
    const returnPct = investment > 0 ? (profit / investment) * 100 : 0;

    return {
      availableCash,
      usedMargin,
      openingBalance,
      investment,
      currentValue,
      dayPnl,
      totalEquity: availableCash + currentValue,
      profit,
      returnPct,
    };
  }, [funds, holdings]);

  const allocationData = useMemo(() => {
    const topHoldings = [...holdings]
      .map((stock) => ({
        name: stock?.name || stock?.symbol || "Stock",
        value: toNumber(stock?.qty) * toNumber(stock?.price),
      }))
      .filter((item) => item.value > 0)
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);

    return {
      labels: topHoldings.map((item) => item.name),
      datasets: [{ data: topHoldings.map((item) => item.value) }],
    };
  }, [holdings]);

  const topHoldings = useMemo(
    () =>
      [...holdings]
        .map((stock) => {
          const qty = toNumber(stock?.qty);
          const avg = toNumber(stock?.avg);
          const price = toNumber(stock?.price);
          const currentValue = qty * price;
          const pnl = currentValue - qty * avg;
          const dayPct = parsePercent(stock?.day ?? stock?.percent);

          return { ...stock, qty, avg, price, currentValue, pnl, dayPct };
        })
        .sort((a, b) => b.currentValue - a.currentValue)
        .slice(0, 5),
    [holdings]
  );

  const marketMovers = useMemo(
    () =>
      [...stocks]
        .map((stock) => ({
          ...stock,
          dayPct: parsePercent(stock?.percent ?? stock?.day),
        }))
        .sort((a, b) => Math.abs(b.dayPct) - Math.abs(a.dayPct))
        .slice(0, 6),
    [stocks]
  );

  const recentOrders = useMemo(() => orders.slice(0, 5), [orders]);

  const displayName =
    profile?.fullName || profile?.username || profile?.name || "Trader";

  if (!context) {
    return <div className="loading">Unable to load summary.</div>;
  }

  if (dashboardLoading) {
    return (
      <div className="summary-loading">
        <div className="summary-spinner" />
        <strong>Loading your workspace...</strong>
        <p>Fetching funds, holdings, and market data.</p>
      </div>
    );
  }

  return (
    <div className="summary-container">
      <section className="summary-hero">
        <div>
          <div className="summary-eyebrow">
            <span className="live-dot" />
            Trading workspace
          </div>
          <h1>
            Welcome back,
            <span> {displayName}</span>
          </h1>
          <p>
            Track equity, holdings, P&amp;L, and market movers from one modern
            dashboard.
          </p>
          <div className="hero-pills">
            <span>Live watchlist</span>
            <span>Portfolio analytics</span>
            <span>Order history</span>
          </div>
        </div>

        <div className="hero-panel">
          <div className="hero-panel-top">
            <span>Portfolio value</span>
            <span className="online-badge">Online</span>
          </div>
          <strong>₹{formatINR(stats.totalEquity)}</strong>
          <p>
            Cash ₹{formatINR(stats.availableCash)} + Holdings ₹
            {formatINR(stats.currentValue)}
          </p>
          <div className="hero-mini-grid">
            <div>
              <b>{holdings.length}</b>
              <span>Holdings</span>
            </div>
            <div>
              <b>{orders.length}</b>
              <span>Orders</span>
            </div>
            <div>
              <b className={stats.dayPnl >= 0 ? "profit" : "loss"}>
                {stats.dayPnl >= 0 ? "+" : ""}
                {stats.returnPct.toFixed(1)}%
              </b>
              <span>Returns</span>
            </div>
          </div>
        </div>
      </section>

      {error && (
        <div className="summary-error" role="alert">
          <div>
            <strong>Some data could not be loaded</strong>
            <p>{error}</p>
          </div>
          {refreshDashboard && (
            <button type="button" onClick={refreshDashboard}>
              Retry
            </button>
          )}
        </div>
      )}

      <section className="stat-grid">
        <article className="stat-card">
          <div className="stat-icon purple">
            <FaWallet />
          </div>
          <span>Total equity</span>
          <strong>₹{formatINR(stats.totalEquity)}</strong>
          <small>Cash + current holdings</small>
        </article>

        <article className="stat-card">
          <div className="stat-icon blue">
            <FaChartLine />
          </div>
          <span>Available cash</span>
          <strong>₹{formatINR(stats.availableCash)}</strong>
          <small>Ready to deploy</small>
        </article>

        <article className="stat-card">
          <div className={`stat-icon ${stats.profit >= 0 ? "green" : "red"}`}>
            {stats.profit >= 0 ? <FaArrowUp /> : <FaArrowDown />}
          </div>
          <span>Total P&amp;L</span>
          <strong className={stats.profit >= 0 ? "profit" : "loss"}>
            {signedAmount(stats.profit)}
          </strong>
          <small>
            {stats.returnPct >= 0 ? "+" : ""}
            {stats.returnPct.toFixed(2)}% overall
          </small>
        </article>

        <article className="stat-card">
          <div className={`stat-icon ${stats.dayPnl >= 0 ? "green" : "red"}`}>
            {stats.dayPnl >= 0 ? <FaArrowUp /> : <FaArrowDown />}
          </div>
          <span>Day P&amp;L</span>
          <strong className={stats.dayPnl >= 0 ? "profit" : "loss"}>
            {signedAmount(stats.dayPnl)}
          </strong>
          <small>Estimated from day change</small>
        </article>
      </section>

      <section className="overview-grid">
        <article className="panel equity-panel">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Funds</p>
              <h2>Equity overview</h2>
            </div>
            <Link to="/funds">Manage funds</Link>
          </div>

          <div className="detail-grid">
            <div>
              <span>Available funds</span>
              <strong>₹{formatINR(stats.availableCash)}</strong>
            </div>
            <div>
              <span>Margins used</span>
              <strong>₹{formatINR(stats.usedMargin)}</strong>
            </div>
            <div>
              <span>Opening balance</span>
              <strong>₹{formatINR(stats.openingBalance)}</strong>
            </div>
            <div>
              <span>Current value</span>
              <strong>₹{formatINR(stats.currentValue)}</strong>
            </div>
            <div>
              <span>Investment</span>
              <strong>₹{formatINR(stats.investment)}</strong>
            </div>
            <div>
              <span>Holdings</span>
              <strong>{holdings.length}</strong>
            </div>
          </div>
        </article>

        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Allocation</p>
              <h2>Top holdings mix</h2>
            </div>
            <Link to="/holdings">View all</Link>
          </div>
          <DoughnutChart data={allocationData} />
        </article>
      </section>

      <section className="overview-grid">
        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Portfolio</p>
              <h2>Holdings snapshot</h2>
            </div>
            <Link to="/holdings">Open holdings</Link>
          </div>

          {topHoldings.length === 0 ? (
            <div className="empty-panel">
              <strong>No holdings yet</strong>
              <p>Buy stocks from the watchlist to start building your portfolio.</p>
            </div>
          ) : (
            <div className="data-table">
              <div className="table-head">
                <span>Stock</span>
                <span>Qty</span>
                <span>LTP</span>
                <span>P&amp;L</span>
              </div>
              {topHoldings.map((stock) => (
                <div className="table-row" key={stock._id || stock.name}>
                  <div className="stock-cell">
                    <b>{stock.name}</b>
                    <small>{stock.company || "Equity"}</small>
                  </div>
                  <span>{stock.qty}</span>
                  <span>₹{formatINR(stock.price)}</span>
                  <strong className={stock.pnl >= 0 ? "profit" : "loss"}>
                    {signedAmount(stock.pnl)}
                  </strong>
                </div>
              ))}
            </div>
          )}
        </article>

        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Market</p>
              <h2>Top movers</h2>
            </div>
          </div>

          <div className="movers-list">
            {marketMovers.map((stock) => (
              <div className="mover-row" key={stock.name}>
                <div>
                  <b>{stock.name}</b>
                  <small>₹{formatINR(stock.price)}</small>
                </div>
                <span className={stock.dayPct >= 0 ? "profit" : "loss"}>
                  {stock.dayPct >= 0 ? "+" : ""}
                  {stock.dayPct.toFixed(2)}%
                </span>
                <div className="mover-actions">
                  <button
                    type="button"
                    onClick={() => openAnalytics?.(stock)}
                  >
                    Chart
                  </button>
                  <button
                    type="button"
                    className="buy"
                    onClick={() => openBuyWindow?.(stock)}
                  >
                    Buy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="panel-kicker">Activity</p>
            <h2>Recent orders</h2>
          </div>
          <Link to="/orders">View orders</Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="empty-panel">
            <strong>No orders yet</strong>
            <p>Your latest buy and sell activity will appear here.</p>
          </div>
        ) : (
          <div className="data-table orders-table">
            <div className="table-head">
              <span>Instrument</span>
              <span>Side</span>
              <span>Qty</span>
              <span>Price</span>
              <span>Status</span>
            </div>
            {recentOrders.map((order, index) => {
              const side = String(order?.mode || order?.side || order?.type || "BUY").toUpperCase();
              const status = String(order?.status || "COMPLETE").toUpperCase();

              return (
                <div className="table-row" key={order._id || `${order.name}-${index}`}>
                  <b>{order.name || order.instrument || "Stock"}</b>
                  <span className={side.includes("SELL") ? "loss" : "profit"}>
                    {side}
                  </span>
                  <span>{toNumber(order.qty || order.quantity)}</span>
                  <span>₹{formatINR(order.price)}</span>
                  <span className="status-chip">{status}</span>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Summary;
