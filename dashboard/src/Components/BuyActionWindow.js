import React, { useContext, useEffect, useState } from "react";
import api from "../api";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ stock, action = "BUY" }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(stock?.price || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generalContext = useContext(GeneralContext);

  useEffect(() => {
    setStockPrice(stock?.price || "");
    setStockQuantity(1);
    setError("");
  }, [stock]);

  const qty = Number(stockQuantity);
  const price = Number(stockPrice);
  const total = (Number.isFinite(qty) && Number.isFinite(price) ? qty * price : 0).toFixed(2);

  const handleOrder = async () => {
    try {
      setLoading(true);
      setError("");

      if (!stock?.name) {
        setError("Invalid stock");
        return;
      }

      if (!qty || qty <= 0 || !price || price <= 0) {
        setError("Enter a valid quantity and price");
        return;
      }

      const data = {
        name: stock.name,
        qty,
        price,
        mode: action,
      };

      await api.post(
        action === "BUY" ? "/orders" : "/orders/sell",
        data
      );

      await generalContext.refreshDashboard();
      generalContext.closeBuyWindow();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="buy-window">
      <div className="buy-header">
        <h3>
          {action} {stock.name}
        </h3>
      </div>

      <div className="buy-body">
        <div className="input-box">
          <label>Qty</label>
          <input
            type="number"
            min="1"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
          />
        </div>

        <div className="input-box">
          <label>Price</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={stockPrice}
            onChange={(e) => setStockPrice(e.target.value)}
          />
        </div>
      </div>

      <p style={{ padding: "0 16px", margin: 0 }}>Total: ₹{total}</p>

      {error && (
        <p style={{ color: "#df514c", padding: "0 16px" }}>{error}</p>
      )}

      <div className="button-container">
        <button
          className={action === "BUY" ? "buy-btn" : "sell-btn"}
          onClick={handleOrder}
          disabled={loading}
        >
          {loading ? "Processing..." : action}
        </button>

        <button
          className="cancel-btn"
          onClick={() => generalContext.closeBuyWindow()}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BuyActionWindow;
