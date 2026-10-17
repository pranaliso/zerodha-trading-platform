import React from "react";

function CreateTicket() {
  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <div className="row p-5 mt-5 mb-5">
        <h2 className="fs-3 mb-4">
          To create a ticket, select a relevant topic
        </h2>

        {/* Category 1 */}
        <div className="col-lg-4 col-md-6 col-12 mb-4">
          <h5>
            <i className="fa fa-plus-circle me-2"></i>
            Account Opening
          </h5>

          <div className="d-flex flex-column">
            <a href="/" onClick={handleClick}>Online account opening</a>
            <a href="/" onClick={handleClick}>Offline account opening</a>
            <a href="/" onClick={handleClick}>Company / Partnership / HUF</a>
            <a href="/" onClick={handleClick}>NRI account opening</a>
            <a href="/" onClick={handleClick}>Charges at Zerodha</a>
            <a href="/" onClick={handleClick}>3-in-1 account (IDFC FIRST)</a>
            <a href="/" onClick={handleClick}>Getting started</a>
          </div>
        </div>

        {/* Category 2 */}
        <div className="col-lg-4 col-md-6 col-12 mb-4">
          <h5>
            <i className="fa fa-plus-circle me-2"></i>
            Your Zerodha Account
          </h5>

          <div className="d-flex flex-column">
            <a href="/" onClick={handleClick}>Login issues</a>
            <a href="/" onClick={handleClick}>Profile updates</a>
            <a href="/" onClick={handleClick}>Change mobile / email</a>
            <a href="/" onClick={handleClick}>Reset password (Kite)</a>
            <a href="/" onClick={handleClick}>Closing account</a>
            <a href="/" onClick={handleClick}>Dormant account</a>
          </div>
        </div>

        {/* Category 3 */}
        <div className="col-lg-4 col-md-6 col-12 mb-4">
          <h5>
            <i className="fa fa-plus-circle me-2"></i>
            Funds
          </h5>

          <div className="d-flex flex-column">
            <a href="/" onClick={handleClick}>Add funds</a>
            <a href="/" onClick={handleClick}>Withdraw funds</a>
            <a href="/" onClick={handleClick}>UPI transfers</a>
            <a href="/" onClick={handleClick}>Bank account change</a>
            <a href="/" onClick={handleClick}>Payment delays</a>
          </div>
        </div>

        {/* Category 4 */}
        <div className="col-lg-4 col-md-6 col-12 mb-4">
          <h5>
            <i className="fa fa-plus-circle me-2"></i>
            Trading & Kite
          </h5>

          <div className="d-flex flex-column">
            <a href="/" onClick={handleClick}>Order types</a>
            <a href="/" onClick={handleClick}>Intraday & MIS</a>
            <a href="/" onClick={handleClick}>Bracket & Cover Orders</a>
            <a href="/" onClick={handleClick}>Option trading basics</a>
            <a href="/" onClick={handleClick}>Charges & Brokerage</a>
          </div>
        </div>

        {/* Category 5 */}
        <div className="col-lg-4 col-md-6 col-12 mb-4">
          <h5>
            <i className="fa fa-plus-circle me-2"></i>
            Console & Reports
          </h5>

          <div className="d-flex flex-column">
            <a href="/" onClick={handleClick}>Tax P&L</a>
            <a href="/" onClick={handleClick}>Tradebook</a>
            <a href="/" onClick={handleClick}>Ledger</a>
            <a href="/" onClick={handleClick}>Reports not matching</a>
          </div>
        </div>

        {/* Category 6 */}
        <div className="col-lg-4 col-md-6 col-12 mb-4">
          <h5>
            <i className="fa fa-plus-circle me-2"></i>
            Stocks & IPOs
          </h5>

          <div className="d-flex flex-column">
            <a href="/" onClick={handleClick}>IPO applications</a>
            <a href="/" onClick={handleClick}>Corporate actions</a>
            <a href="/" onClick={handleClick}>Delisting & mergers</a>
            <a href="/" onClick={handleClick}>Stock not showing</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;
