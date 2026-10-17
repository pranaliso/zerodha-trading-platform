import React from "react";
import { Link } from "react-router-dom";

function Stats() {
  return (
    <div className="container py-5">
      <div className="row align-items-center">
        {/* Left Section */}
        <div className="col-lg-6 col-md-12 mb-5">
          <h1 className="fs-2 mb-5">Trust with confidence</h1>

          <h2 className="fs-4">Customer-first always</h2>
          <p className="text-muted">
            That's why 1.3+ crore customers trust Zerodha with ₹3.5+ lakh crores
            worth of equity investments.
          </p>

          <h2 className="fs-4">No spam or gimmicks</h2>
          <p className="text-muted">
            No gimmicks, spam, gamification, or annoying push notifications.
            High-quality apps that you use at your own pace.
          </p>

          <h2 className="fs-4">The Zerodha universe</h2>
          <p className="text-muted">
            Not just an app, but an entire ecosystem. Our investments in
            fintech startups offer services tailored to your needs.
          </p>

          <h2 className="fs-4">Do better with money</h2>
          <p className="text-muted">
            With initiatives like Nudge and Kill Switch, we help investors make
            better financial decisions.
          </p>
        </div>

        {/* Right Section */}
        <div className="col-lg-6 col-md-12 text-center">
          <img
            src="/media/images/ecosystem.png"
            alt="Zerodha Ecosystem"
            className="img-fluid"
            style={{ maxWidth: "90%" }}
          />

          <div className="mt-4">
            <Link
              to="/product"
              className="text-decoration-none me-4"
            >
              Explore our products{" "}
              <i
                className="fa fa-long-arrow-right"
                aria-hidden="true"
              ></i>
            </Link>

            <Link
              to="/product"
              className="text-decoration-none"
            >
              Try Kite Demo{" "}
              <i
                className="fa fa-long-arrow-right"
                aria-hidden="true"
              ></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;