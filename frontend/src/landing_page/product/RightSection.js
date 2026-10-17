import React from "react";
import { Link } from "react-router-dom";

function RightSection({
  imageURL,
  productName,
  productDescription,
  learnMore,
}) {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">

        <div className="col-lg-6 col-md-12 order-lg-1 order-2 text-center">
          <img
            src={imageURL}
            alt={productName}
            className="img-fluid"
          />
        </div>

        <div className="col-lg-6 col-md-12 p-lg-5 mt-4 mt-lg-0 order-lg-2 order-1">
          <h1>{productName}</h1>

          <p className="text-muted">
            {productDescription}
          </p>

          {learnMore && (
            learnMore.startsWith("http") ? (
              <a
                href={learnMore}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
              >
                Learn More →
              </a>
            ) : (
              <Link to={learnMore} className="text-decoration-none">
                Learn More →
              </Link>
            )
          )}
        </div>

      </div>
    </div>
  );
}

export default RightSection;