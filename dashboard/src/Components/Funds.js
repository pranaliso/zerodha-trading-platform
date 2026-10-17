import React, { useContext, useState } from "react";
import GeneralContext from "./GeneralContext";
import api from "../api";
import "./Funds.css";

const Funds = () => {
  const context = useContext(GeneralContext);

  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  // =========================================================
  // CONTEXT DATA
  // =========================================================

  const funds = context?.funds || {};
  const transactions = Array.isArray(context?.transactions)
    ? context.transactions
    : [];

  // =========================================================
  // SAFE NUMBER
  // =========================================================

  const money = (value) => {
    const number = Number(value);

    return Number.isFinite(number) ? number : 0;
  };

  // =========================================================
  // FORMAT MONEY
  // =========================================================

  const formatMoney = (value) => {
    return money(value).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // =========================================================
  // SUBMIT ADD / WITHDRAW
  // =========================================================

  const submit = async (path) => {
    try {
      setError("");
      setMessage("");

      const value = Number(amount);

      // -----------------------------------------------------
      // VALIDATE AMOUNT
      // -----------------------------------------------------

      if (!Number.isFinite(value) || value <= 0) {
        setError("Enter a valid amount greater than ₹0.");
        return;
      }

      // -----------------------------------------------------
      // MINIMUM AMOUNT
      // -----------------------------------------------------

      if (value < 1) {
        setError("Amount must be at least ₹1.");
        return;
      }

      // -----------------------------------------------------
      // WITHDRAW VALIDATION
      // -----------------------------------------------------

      const isWithdraw = path.includes("withdraw");

      const availableCash = money(
        funds?.availableCash
      );

      if (isWithdraw && value > availableCash) {
        setError(
          `Insufficient funds. Available cash is ₹${formatMoney(
            availableCash
          )}.`
        );
        return;
      }

      // -----------------------------------------------------
      // START PROCESSING
      // -----------------------------------------------------

      setProcessing(true);

      console.log(
        isWithdraw
          ? "Withdrawing funds:"
          : "Adding funds:",
        value
      );

      // -----------------------------------------------------
      // API REQUEST
      // -----------------------------------------------------

      const response = await api.post(path, {
        amount: value,
      });

      console.log(
        "Funds transaction response:",
        response?.data
      );

      // -----------------------------------------------------
      // REFRESH DASHBOARD
      // -----------------------------------------------------

      if (context?.refreshDashboard) {
        await context.refreshDashboard();
      }

      // -----------------------------------------------------
      // CLEAR INPUT
      // -----------------------------------------------------

      setAmount("");

      // -----------------------------------------------------
      // SUCCESS MESSAGE
      // -----------------------------------------------------

      if (isWithdraw) {
        setMessage(
          `₹${formatMoney(value)} withdrawn successfully.`
        );
      } else {
        setMessage(
          `₹${formatMoney(value)} added successfully.`
        );
      }
    } catch (err) {
      console.error(
        "Funds transaction error:",
        err
      );

      const serverMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message;

      setError(
        serverMessage ||
          "Unable to complete the request. Please try again."
      );
    } finally {
      setProcessing(false);
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (context?.dashboardLoading) {
    return (
      <div className="funds-loading">
        <h2>Loading Funds...</h2>
      </div>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (
    context?.error &&
    !context?.funds
  ) {
    return (
      <div className="funds-loading">
        <h2>{context.error}</h2>
      </div>
    );
  }

  // =========================================================
  // FUND VALUES
  // =========================================================

  const availableCash = money(
    funds?.availableCash
  );

  const usedMargin = money(
    funds?.usedMargin
  );

  const openingBalance = money(
    funds?.openingBalance
  );

  const payin = money(
    funds?.payin
  );

  const totalBalance =
    availableCash + usedMargin;

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="funds-page">

      {/* =====================================================
          ADD / WITHDRAW FUNDS
      ===================================================== */}

      <div className="funds">

        <h2>Funds</h2>

        <p>
          Instant, zero-cost fund transfers with UPI
        </p>

        {/* ===================================================
            AMOUNT INPUT
        =================================================== */}

        <input
          type="number"
          min="1"
          step="0.01"
          placeholder="Enter Amount"
          value={amount}
          disabled={processing}
          onChange={(e) => {
            setAmount(e.target.value);
            setError("");
            setMessage("");
          }}
        />

        {/* ===================================================
            MESSAGES
        =================================================== */}

        {error && (
          <p className="loss">
            {error}
          </p>
        )}

        {message && (
          <p className="profit">
            {message}
          </p>
        )}

        {/* ===================================================
            BUTTONS
        =================================================== */}

        <div className="fund-buttons">

          <button
            type="button"
            className="btn btn-green"
            disabled={processing}
            onClick={() =>
              submit("/funds/add")
            }
          >
            {processing
              ? "Processing..."
              : "Add Funds"}
          </button>

          <button
            type="button"
            className="btn btn-blue"
            disabled={processing}
            onClick={() =>
              submit("/funds/withdraw")
            }
          >
            {processing
              ? "Processing..."
              : "Withdraw"}
          </button>

        </div>

      </div>

      {/* =====================================================
          FUND SUMMARY
      ===================================================== */}

      <div className="row">

        {/* ===================================================
            EQUITY
        =================================================== */}

        <div className="col">

          <h3>Equity</h3>

          <div className="table">

            {/* AVAILABLE MARGIN */}

            <div className="data">

              <p>
                Available margin
              </p>

              <p className="imp colored">
                ₹{formatMoney(availableCash)}
              </p>

            </div>

            {/* USED MARGIN */}

            <div className="data">

              <p>
                Used margin
              </p>

              <p className="imp">
                ₹{formatMoney(usedMargin)}
              </p>

            </div>

            {/* AVAILABLE CASH */}

            <div className="data">

              <p>
                Available cash
              </p>

              <p className="imp">
                ₹{formatMoney(availableCash)}
              </p>

            </div>

            <hr />

            {/* TOTAL BALANCE */}

            <div className="data">

              <p>
                Total balance
              </p>

              <p className="imp">
                ₹{formatMoney(totalBalance)}
              </p>

            </div>

            {/* OPENING BALANCE */}

            <div className="data">

              <p>
                Opening Balance
              </p>

              <p>
                ₹{formatMoney(openingBalance)}
              </p>

            </div>

            {/* PAYIN */}

            <div className="data">

              <p>
                Payin
              </p>

              <p>
                ₹{formatMoney(payin)}
              </p>

            </div>

          </div>

          {/* =================================================
              TRANSACTIONS
          ================================================= */}

          <h3>
            Transactions
          </h3>

          <div className="table">

            {transactions.length === 0 ? (
              <p className="sub-text">
                No transactions yet.
              </p>
            ) : (
              transactions
                .slice(0, 10)
                .map((item, index) => {

                  const transactionAmount =
                    money(item?.amount);

                  const type =
                    String(
                      item?.type || ""
                    ).toUpperCase();

                  const isCredit =
                    type.includes("ADD") ||
                    type.includes("DEPOSIT") ||
                    type.includes("PAYIN") ||
                    type.includes("CREDIT");

                  return (
                    <div
                      className="data"
                      key={
                        item?._id ||
                        item?.id ||
                        `${type}-${item?.amount}-${index}`
                      }
                    >

                      <div>

                        <p>
                          {item?.type ||
                            "Transaction"}
                        </p>

                        {item?.note && (
                          <small
                            style={{
                              color: "#777",
                              display: "block",
                              marginTop: "3px",
                            }}
                          >
                            {item.note}
                          </small>
                        )}

                        {item?.createdAt && (
                          <small
                            style={{
                              color: "#999",
                              display: "block",
                              marginTop: "3px",
                              fontSize: "11px",
                            }}
                          >
                            {new Date(
                              item.createdAt
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </small>
                        )}

                      </div>

                      <p
                        className={
                          isCredit
                            ? "profit"
                            : "loss"
                        }
                        style={{
                          margin: 0,
                          fontWeight: 600,
                        }}
                      >
                        {isCredit
                          ? "+"
                          : "-"}
                        ₹
                        {formatMoney(
                          transactionAmount
                        )}
                      </p>

                    </div>
                  );
                })
            )}

          </div>

        </div>

        {/* ===================================================
            COMMODITY
        =================================================== */}

        <div className="col">

          <div className="commodity">

            <h3>
              Commodity
            </h3>

            <p>
              You don't have a commodity
              account.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Funds;