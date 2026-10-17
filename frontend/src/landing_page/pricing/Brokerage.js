import React from "react";

function Brokerage() {
  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <div className="row p-5 mt-5 border-top">

        {/* Brokerage Calculator */}
        <div className="col-lg-8 col-md-12 mb-4">
          <a
            href="/"
            onClick={handleClick}
            className="text-decoration-none"
          >
            <h3 className="fs-5">Brokerage Calculator</h3>
          </a>

          <ul
            className="text-muted"
            style={{
              textAlign: "left",
              lineHeight: "2",
              fontSize: "14px",
            }}
          >
            <li>
              Call & Trade and RMS auto square-off: Additional charges of ₹50 +
              GST per order.
            </li>

            <li>
              Digital contract notes will be sent via email.
            </li>

            <li>
              Physical contract notes, if required, are charged ₹20 per note.
              Courier charges apply.
            </li>

            <li>
              For NRI (Non-PIS) accounts: 0.5% or ₹100 per executed order,
              whichever is lower.
            </li>

            <li>
              For NRI (PIS) accounts: 0.5% or ₹200 per executed order,
              whichever is lower.
            </li>

            <li>
              If the account has a debit balance, ₹40 per executed order is
              charged instead of ₹20.
            </li>
          </ul>
        </div>

        {/* Charges */}
        <div className="col-lg-4 col-md-12 text-center">
          <a
            href="/"
            onClick={handleClick}
            className="text-decoration-none"
          >
            <h3 className="fs-5">List of Charges</h3>
          </a>
        </div>

      </div>
    </div>
  );
}

export default Brokerage;