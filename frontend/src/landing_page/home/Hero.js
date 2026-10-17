import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="container py-5">
      <div className="row text-center justify-content-center">

        <div className="col-12">
          <img
            src="/media/images/homeHero.png"
            alt="Zerodha Hero"
            className="img-fluid mb-5"
            style={{ maxWidth: "100%" }}
          />
        </div>

        <div className="col-lg-8">
          <h1 className="mt-4 fw-bold">Invest in everything</h1>

          <p className="text-muted fs-5 mt-3">
            Online platform to invest in stocks, derivatives, mutual funds,
            and more.
          </p>

          <Link
            to="/signup"
            className="btn btn-primary btn-lg mt-4 px-5"
          >
            Sign up Now
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Hero;