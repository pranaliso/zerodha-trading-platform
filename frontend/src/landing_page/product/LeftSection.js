import React from "react";
import { Link } from "react-router-dom";

function LeftSection({
  imageURL,
  productName,
  productDescription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">

        {/* Product Image */}
        <div className="col-lg-6 col-md-12 text-center mb-4 mb-lg-0">
          <img
            src={imageURL}
            alt={productName}
            className="img-fluid"
          />
        </div>

        {/* Product Details */}
        <div className="col-lg-6 col-md-12 p-lg-5">
          <h1>{productName}</h1>

          <p className="text-muted">
            {productDescription}
          </p>

          <div className="mb-4">

            {tryDemo &&
              (tryDemo.startsWith("http") ? (
                <a
                  href={tryDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  Try Demo →
                </a>
              ) : (
                <Link to={tryDemo} className="text-decoration-none">
                  Try Demo →
                </Link>
              ))}

            {learnMore &&
              (learnMore.startsWith("http") ? (
                <a
                  href={learnMore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none ms-4"
                >
                  Learn More →
                </a>
              ) : (
                <Link to={learnMore} className="text-decoration-none ms-4">
                  Learn More →
                </Link>
              ))}
          </div>

          <div className="d-flex align-items-center gap-4">

            {googlePlay && (
              <a
                href={googlePlay}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/media/images/googlePlayBadge.svg"
                  alt="Google Play"
                  className="img-fluid"
                  style={{ maxWidth: "160px" }}
                />
              </a>
            )}

            {appStore && (
              <a
                href={appStore}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/media/images/appstoreBadge.svg"
                  alt="App Store"
                  className="img-fluid"
                  style={{ maxWidth: "160px" }}
                />
              </a>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

export default LeftSection;