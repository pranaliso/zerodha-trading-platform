import React from "react";
import { Link } from "react-router-dom";

function Universe() {
  const partners = [
    {
      image: "/media/images/smallcaseLogo.png",
      title: "Thematic investment platform",
    },
    {
      image: "/media/images/smallcaseLogo.png",
      title: "Thematic investment platform",
    },
    {
      image: "/media/images/smallcaseLogo.png",
      title: "Thematic investment platform",
    },
    {
      image: "/media/images/smallcaseLogo.png",
      title: "Thematic investment platform",
    },
    {
      image: "/media/images/smallcaseLogo.png",
      title: "Thematic investment platform",
    },
    {
      image: "/media/images/smallcaseLogo.png",
      title: "Thematic investment platform",
    },
  ];

  return (
    <div className="container mt-5 mb-5">
      <div className="row text-center">
        <h1>The Zerodha Universe</h1>

        <p className="text-muted">
          Extend your trading and investment experience even further with our
          partner platforms.
        </p>

        {partners.map((partner, index) => (
          <div className="col-lg-4 col-md-6 col-12 p-4 mt-3" key={index}>
            <img
              src={partner.image}
              alt="Partner Logo"
              className="img-fluid mb-3"
              style={{ maxHeight: "55px" }}
            />

            <p className="small text-muted">
              {partner.title}
            </p>
          </div>
        ))}

        <Link
          to="/signup"
          className="btn btn-primary fs-5 mt-4"
          style={{ width: "220px", margin: "0 auto" }}
        >
          Signup Now
        </Link>
      </div>
    </div>
  );
}

export default Universe;