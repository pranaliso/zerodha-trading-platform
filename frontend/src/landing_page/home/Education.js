import React from "react";

function Education() {
  return (
    <div className="container py-5">
      <div className="row align-items-center">

        {/* Left Image */}
        <div className="col-lg-6 col-md-12 text-center mb-4">
          <img
            src="/media/images/education.svg"
            alt="Zerodha Education"
            className="img-fluid"
            style={{ maxWidth: "70%" }}
          />
        </div>

        {/* Right Content */}
        <div className="col-lg-6 col-md-12">
          <h1 className="mb-4 fs-2">
            Free and Open Market Education
          </h1>

          <p className="text-muted">
            Varsity is one of the largest online stock market education
            platforms, covering everything from the basics to advanced trading.
          </p>

          <a
            href="https://zerodha.com/varsity/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none"
          >
            Varsity{" "}
            <i
              className="fa fa-long-arrow-right"
              aria-hidden="true"
            ></i>
          </a>

          <p className="text-muted mt-5">
            TradingQ&A is one of India's most active trading and investment
            communities where you can ask market-related questions.
          </p>

          <a
            href="https://tradingqna.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none"
          >
            TradingQ&A{" "}
            <i
              className="fa fa-long-arrow-right"
              aria-hidden="true"
            ></i>
          </a>
        </div>

      </div>
    </div>
  );
}

export default Education;