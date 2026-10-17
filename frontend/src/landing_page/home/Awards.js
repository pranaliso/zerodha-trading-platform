import React from "react";

function Awards() {
  return (
    <div className="container py-5">
      <div className="row align-items-center">

        {/* Left Image */}
        <div className="col-lg-6 col-md-12 text-center mb-5">
          <img
            src="/media/images/largestBroker.svg"
            alt="Largest Stock Broker"
            className="img-fluid"
            style={{ maxWidth: "90%" }}
          />
        </div>

        {/* Right Content */}
        <div className="col-lg-6 col-md-12">
          <h1>Largest Stock Broker in India</h1>

          <p className="text-muted mb-4">
            Over 2 million Zerodha clients contribute to more than 15% of all
            retail order volumes in India every day by trading and investing in:
          </p>

          <div className="row">
            <div className="col-sm-6">
              <ul>
                <li>Futures & Options</li>
                <li>Commodity Derivatives</li>
                <li>Currency Derivatives</li>
              </ul>
            </div>

            <div className="col-sm-6">
              <ul>
                <li>Stocks & IPOs</li>
                <li>Direct Mutual Funds</li>
                <li>Bonds & Government Securities</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 text-center text-lg-start">
            <img
              src="/media/images/pressLogos.png"
              alt="Press Logos"
              className="img-fluid"
              style={{ maxWidth: "90%" }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Awards;