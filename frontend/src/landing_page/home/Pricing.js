import React from "react";
import { Link } from "react-router-dom";

function Pricing() {
  return (
    <div className="container py-5">
      <div className="row align-items-center">
        {/* Left Section */}
        <div className="col-lg-4 col-md-12 mb-5">
          <h1 className="mb-3 fs-2">Unbeatable Pricing</h1>

          <p className="text-muted">
            We pioneered the concept of discount broking and price transparency
            in India. Flat fees and no hidden charges.
          </p>

          <Link
            to="/pricing"
            className="text-decoration-none"
          >
            See Pricing{" "}
            <i
              className="fa fa-long-arrow-right"
              aria-hidden="true"
            ></i>
          </Link>
        </div>

        {/* Spacer */}
        <div className="col-lg-2 d-none d-lg-block"></div>

        {/* Right Section */}
        <div className="col-lg-6 col-md-12">
          <div className="row text-center">

            <div className="col-sm-6 mb-3">
              <div className="border rounded p-4 h-100">
                <h1>₹0</h1>

                <p className="mb-0">
                  Free equity delivery
                  <br />
                  & direct mutual funds
                </p>
              </div>
            </div>

            <div className="col-sm-6 mb-3">
              <div className="border rounded p-4 h-100">
                <h1>₹20</h1>

                <p className="mb-0">
                  Intraday & F&O Trades
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;