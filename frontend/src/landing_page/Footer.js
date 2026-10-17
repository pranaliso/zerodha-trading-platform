import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={{ backgroundColor: "rgb(250, 250, 250)" }}>
      <div className="container border-top mt-5">
        <div className="row mt-5">

          {/* Logo */}
          <div className="col-lg-3 col-md-6 mb-4">
            <Link to="/">
              <img
                src="/media/images/logo.svg"
                alt="Zerodha Logo"
                style={{ width: "50%" }}
              />
            </Link>

            <p className="mt-3 text-muted">
              &copy; 2010 - 2026, Not Zerodha Broking Ltd. All rights reserved.
            </p>
          </div>

          {/* Company */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5>Company</h5>

            <Link className="text-decoration-none d-block mb-2" to="/about">
              About
            </Link>

            <Link className="text-decoration-none d-block mb-2" to="/product">
              Products
            </Link>

            <Link className="text-decoration-none d-block mb-2" to="/pricing">
              Pricing
            </Link>

            <a
              href="https://zerodha.com/careers"
              target="_blank"
              rel="noreferrer"
              className="text-decoration-none d-block mb-2"
            >
              Careers
            </a>

            <a
              href="https://zerodha.tech"
              target="_blank"
              rel="noreferrer"
              className="text-decoration-none d-block mb-2"
            >
              Zerodha.tech
            </a>

            <a
              href="https://zerodha.com/media"
              target="_blank"
              rel="noreferrer"
              className="text-decoration-none d-block mb-2"
            >
              Press & Media
            </a>
          </div>

          {/* Support */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5>Support</h5>

            <Link className="text-decoration-none d-block mb-2" to="/support">
              Contact
            </Link>

            <a
              href="https://support.zerodha.com"
              target="_blank"
              rel="noreferrer"
              className="text-decoration-none d-block mb-2"
            >
              Support Portal
            </a>

            <a
              href="https://zerodha.com/z-connect"
              target="_blank"
              rel="noreferrer"
              className="text-decoration-none d-block mb-2"
            >
              Z-Connect Blog
            </a>

            <a
              href="https://zerodha.com/charges"
              target="_blank"
              rel="noreferrer"
              className="text-decoration-none d-block mb-2"
            >
              Charges
            </a>

            <a
              href="https://zerodha.com/resources"
              target="_blank"
              rel="noreferrer"
              className="text-decoration-none d-block mb-2"
            >
              Downloads & Resources
            </a>
          </div>

          {/* Account */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5>Account</h5>

            <Link className="text-decoration-none d-block mb-2" to="/signup">
              Open an Account
            </Link>

            <a
              href="https://zerodha.com/fund-transfer"
              target="_blank"
              rel="noreferrer"
              className="text-decoration-none d-block mb-2"
            >
              Fund Transfer
            </a>

            <a
              href="https://zerodha.com/60-day-challenge"
              target="_blank"
              rel="noreferrer"
              className="text-decoration-none d-block mb-2"
            >
              60 Day Challenge
            </a>
          </div>
        </div>

        <hr />

        <div className="text-muted" style={{ fontSize: "14px" }}>
          <p>
            Zerodha Broking Ltd. is a member of NSE & BSE and is registered with
            SEBI. Investments in the securities market are subject to market
            risks. Please read all related documents carefully before investing.
          </p>

          <p>
            Procedure to file a complaint on SEBI SCORES: Register on the
            SCORES portal using your PAN, mobile number, email ID and other
            required details for faster grievance resolution.
          </p>

          <p>
            Prevent unauthorised transactions in your account. Update your
            mobile number and email with your broker to receive transaction
            alerts directly from the Exchange.
          </p>

          <p className="mb-4">
            This project is created only for educational purposes as a Zerodha
            clone and is not affiliated with Zerodha Broking Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;