import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="container-fluid" id="supportHero">
      <div className="p-5" id="supportWrapper">
        <h4>Support Portal</h4>

        <Link
          to="/support"
          className="text-white text-decoration-none"
        >
          Track Tickets
        </Link>
      </div>

      <div className="row p-5 m-3">
        <div className="col-lg-6 col-md-12 p-3">
          <h1 className="fs-3">
            Search for an answer or browse help topics to create a ticket
          </h1>

          <input
            type="text"
            className="form-control my-4"
            placeholder="Eg. How do I activate F&O?"
          />

          <div className="d-flex flex-column gap-2">
            <a href="#" className="text-white">
              Track account opening
            </a>

            <a href="#" className="text-white">
              Track segment activation
            </a>

            <a href="#" className="text-white">
              Intraday margins
            </a>

            <a href="#" className="text-white">
              Kite user manual
            </a>
          </div>
        </div>

        <div className="col-lg-6 col-md-12 p-3">
          <h2 className="fs-3">Featured</h2>

          <ol className="mt-3">
            <li className="mb-3">
              <a href="#" className="text-white">
                Current Takeovers and Delisting - January 2024
              </a>
            </li>

            <li>
              <a href="#" className="text-white">
                Latest Intraday Leverages - MIS & CO
              </a>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Hero;