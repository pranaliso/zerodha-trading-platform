import React from "react";

function Team() {
  return (
    <div className="container py-5">
      {/* Heading */}
      <div className="row border-top pt-5">
        <div className="col-12 text-center">
          <h1>People</h1>
        </div>
      </div>

      {/* Content */}
      <div
        className="row align-items-center mt-5"
        style={{ lineHeight: "1.8" }}
      >
        {/* Left */}
        <div className="col-lg-6 col-md-12 text-center mb-5">
          <img
            src="/media/images/nithinKamath.jpg"
            alt="Nithin Kamath"
            className="img-fluid rounded-circle"
            style={{ maxWidth: "280px" }}
          />

          <h4 className="mt-4 mb-1">Nithin Kamath</h4>
          <p className="text-muted">Founder & CEO</p>
        </div>

        {/* Right */}
        <div className="col-lg-6 col-md-12 text-muted">
          <p>
            Nithin bootstrapped and founded Zerodha in 2010 to overcome the
            hurdles he faced during his decade-long journey as a trader. Today,
            Zerodha has transformed the Indian broking industry.
          </p>

          <p>
            He is a member of the SEBI Secondary Market Advisory Committee
            (SMAC) and the Market Data Advisory Committee (MDAC).
          </p>

          <p>Playing basketball is his zen.</p>

          <p>
            Connect on{" "}
            <a
              href="https://zerodha.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Homepage
            </a>{" "}
            {" | "}
            <a
              href="https://tradingqna.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              TradingQnA
            </a>{" "}
            {" | "}
            <a
              href="https://x.com/Nithin0dha"
              target="_blank"
              rel="noopener noreferrer"
            >
              X (Twitter)
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;