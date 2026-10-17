import React from "react";

function Hero() {
  return (
    <div className="container py-5">
      {/* Heading */}
      <div className="row">
        <div className="col-12 text-center mb-5">
          <h1 className="fw-bold">
            We pioneered the discount broking model in India.
            <br />
            Now, we are breaking ground with our technology.
          </h1>
        </div>
      </div>

      {/* Content */}
      <div
        className="row border-top pt-5 text-muted"
        style={{ lineHeight: "1.8", fontSize: "1.1rem" }}
      >
        {/* Left Column */}
        <div className="col-lg-6 col-md-12 mb-4">
          <p>
            We kick-started operations on 15th August 2010 with the goal of
            breaking the barriers that traders and investors faced in India in
            terms of cost, support, and technology. We named the company
            <strong> Zerodha</strong>, a combination of <strong>Zero</strong> and
            <strong> Rodha</strong>, the Sanskrit word for barrier.
          </p>

          <p>
            Today, our disruptive pricing model and in-house technology have
            made us one of the largest stock brokers in India.
          </p>

          <p>
            Over 1 crore clients place millions of orders every day through our
            investment platforms, contributing significantly to India's retail
            trading volume.
          </p>
        </div>

        {/* Right Column */}
        <div className="col-lg-6 col-md-12">
          <p>
            In addition, we run a number of popular educational and community
            initiatives to empower retail traders and investors.
          </p>

          <p>
            <a
              href="https://rainmatter.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              Rainmatter
            </a>
            , our fintech fund and incubator, has invested in several startups
            with the goal of strengthening the Indian capital markets.
          </p>

          <p>
            And yet, we are always building something new. Catch up on the
            latest updates on our blog or see what the media is saying about us.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;