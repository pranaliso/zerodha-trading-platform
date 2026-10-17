import React from "react";

function Hero() {
  return (
    <div className="container">
      {/* Heading */}
      <div className="row p-5 mt-5 border-bottom text-center">
        <div className="col-12">
          <h1>Pricing</h1>

          <h3 className="text-muted mt-3 fs-5">
            Free equity investments and flat ₹20 intraday and F&O trades
          </h3>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="row p-5 mt-4 text-center">

        <div className="col-lg-4 col-md-6 col-12 mb-4">
          <img
            src="/media/images/pricingEquity.svg"
            alt="Free Equity Delivery"
            className="img-fluid mb-3"
          />

          <h2 className="fs-3">Free Equity Delivery</h2>

          <p className="text-muted">
            All equity delivery investments (NSE & BSE) are absolutely free —
            ₹0 brokerage.
          </p>
        </div>

        <div className="col-lg-4 col-md-6 col-12 mb-4">
          <img
            src="/media/images/intradayTrades.svg"
            alt="Intraday Trading"
            className="img-fluid mb-3"
          />

          <h2 className="fs-3">Intraday & F&O Trades</h2>

          <p className="text-muted">
            Flat ₹20 or 0.03% (whichever is lower) per executed order across
            equity, currency and commodity.
          </p>
        </div>

        <div className="col-lg-4 col-md-12 col-12 mb-4">
          <img
            src="/media/images/pricingEquity.svg"
            alt="Direct Mutual Funds"
            className="img-fluid mb-3"
          />

          <h2 className="fs-3">Free Direct Mutual Funds</h2>

          <p className="text-muted">
            Invest in direct mutual funds with zero commission and zero DP
            charges.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Hero;