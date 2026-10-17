import React, {
  useContext,
  useMemo,
  useState,
} from "react";

import GeneralContext from "./GeneralContext";

import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";

import DoughnutChart from "./DoughnutChart";

import "./WatchList.css";

// =========================================================
// WATCHLIST
// =========================================================

const WatchList = () => {
  const context = useContext(GeneralContext);

  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  // =======================================================
  // CONTEXT DATA
  // =======================================================

  const watchlist = Array.isArray(context?.watchlist)
    ? context.watchlist
    : [];

  const stocks = Array.isArray(context?.stocks)
    ? context.stocks
    : [];

  // =======================================================
  // STOCK CATALOG
  //
  // Show maximum 30 stocks.
  //
  // If your GeneralContext contains more than 30 stocks,
  // only the first 30 are shown.
  // =======================================================

  const stockCatalog = useMemo(() => {
    return stocks.slice(0, 30);
  }, [stocks]);

  // =======================================================
  // DISPLAY STOCKS
  //
  // IMPORTANT:
  // We always display the 30-stock catalog.
  //
  // Backend watchlist is still used for identifying stocks
  // that have actually been added to the user's watchlist.
  // =======================================================

  const displayStocks = useMemo(() => {
    if (stockCatalog.length > 0) {
      return stockCatalog;
    }

    return watchlist;
  }, [stockCatalog, watchlist]);

  // =======================================================
  // FILTER STOCKS
  // =======================================================

  const filteredStocks = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return displayStocks;
    }

    return displayStocks.filter((stock) => {
      const name = String(
        stock?.name || ""
      ).toLowerCase();

      const company = String(
        stock?.company || ""
      ).toLowerCase();

      return (
        name.includes(query) ||
        company.includes(query)
      );
    });
  }, [search, displayStocks]);

  // =======================================================
  // SEARCH SUGGESTIONS
  //
  // Shows stocks from the 30-stock catalog that are
  // not already present in backend watchlist.
  // =======================================================

  const suggestions = useMemo(() => {
    const query = search.trim().toUpperCase();

    if (!query) {
      return [];
    }

    const existing = new Set(
      watchlist.map((item) =>
        String(
          item?.name ||
          item?.symbol ||
          ""
        ).toUpperCase()
      )
    );

    return stockCatalog
      .filter((stock) => {
        const stockName = String(
          stock?.name || ""
        ).toUpperCase();

        const companyName = String(
          stock?.company || ""
        ).toUpperCase();

        return (
          (
            stockName.includes(query) ||
            companyName.includes(query)
          ) &&
          !existing.has(stockName)
        );
      })
      .slice(0, 6);
  }, [
    search,
    stockCatalog,
    watchlist,
  ]);

  // =======================================================
  // CHART DATA
  // =======================================================

  const chartData = useMemo(() => {
    const validStocks =
      displayStocks.filter((stock) => {
        const price = Number(
          stock?.price ??
          stock?.ltp ??
          stock?.lastPrice
        );

        return (
          stock?.name &&
          Number.isFinite(price) &&
          price > 0
        );
      });

    return {
      labels: validStocks.map(
        (stock) => stock.name
      ),

      datasets: [
        {
          label: "Stock Price",

          data: validStocks.map((stock) =>
            Number(
              stock?.price ??
              stock?.ltp ??
              stock?.lastPrice ??
              0
            )
          ),

          borderWidth: 1,
        },
      ],
    };
  }, [displayStocks]);

  // =======================================================
  // ADD STOCK
  // =======================================================

  const handleAdd = async (name) => {
    try {
      setMessage("");

      if (!context?.addToWatchlist) {
        setMessage(
          "Watchlist service is unavailable."
        );

        return;
      }

      await context.addToWatchlist(name);

      setSearch("");
      setMessage("");

    } catch (err) {
      console.error(
        "Unable to add stock:",
        err
      );

      setMessage(
        err?.response?.data?.message ||
        err?.message ||
        "Unable to add stock."
      );
    }
  };

  // =======================================================
  // STOCK COUNT
  // =======================================================

  const totalStocks =
    displayStocks.length;

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <div className="watchlist-container">

      {/* =================================================
          SEARCH SECTION
      ================================================= */}

      <div className="search-container">

        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setMessage("");
          }}
          placeholder="Search eg: INFY, TCS, RELIANCE..."
          className="search"
        />

        {/* CLEAR */}

        {search && (
          <button
            type="button"
            className="clear-btn"
            onClick={() => {
              setSearch("");
              setMessage("");
            }}
          >
            ×
          </button>
        )}

        {/* COUNT */}

        <span className="counts">
          {filteredStocks.length}/
          {totalStocks}
        </span>

      </div>

      {/* =================================================
          MESSAGE
      ================================================= */}

      {message && (
        <p className="sub-text">
          {message}
        </p>
      )}

      {/* =================================================
          SEARCH SUGGESTIONS
      ================================================= */}

      {suggestions.length > 0 && (
        <div
          style={{
            background: "#fff",
            borderBottom:
              "1px solid #eee",
          }}
        >

          {suggestions.map((stock) => (
            <div
              key={stock.name}
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                padding:
                  "10px 15px",
                borderBottom:
                  "1px solid #f1f1f1",
              }}
            >

              {/* STOCK INFO */}

              <div>
                <strong
                  style={{
                    fontSize: "13px",
                  }}
                >
                  {stock.name}
                </strong>

                {stock.company && (
                  <small
                    style={{
                      display:
                        "block",
                      color: "#777",
                      fontSize: "11px",
                      marginTop: "2px",
                    }}
                  >
                    {stock.company}
                  </small>
                )}
              </div>

              {/* ADD */}

              <button
                type="button"
                className="buy"
                onClick={() =>
                  handleAdd(
                    stock.name
                  )
                }
              >
                Add
              </button>

            </div>
          ))}

        </div>
      )}

      {/* =================================================
          STOCK LIST
      ================================================= */}

      <ul className="list">

        {filteredStocks.map(
          (stock, index) => (
            <WatchListItem
              key={
                stock?._id ||
                stock?.name ||
                index
              }
              stock={stock}
            />
          )
        )}

      </ul>

      {/* =================================================
          EMPTY STATE
      ================================================= */}

      {filteredStocks.length === 0 && (
        <p className="sub-text">
          {search
            ? `No stocks found for "${search}"`
            : "No stocks available."}
        </p>
      )}

      {/* =================================================
          DOUGHNUT CHART
      ================================================= */}

      {chartData.labels.length > 0 && (
        <div className="chart-box">
          <DoughnutChart
            data={chartData}
          />
        </div>
      )}

    </div>
  );
};

export default WatchList;


// =========================================================
// WATCHLIST ITEM
// =========================================================

const WatchListItem = ({
  stock,
}) => {

  const [showActions, setShowActions] =
    useState(false);

  const generalContext =
    useContext(
      GeneralContext
    );

  // =======================================================
  // STOCK NAME
  // =======================================================

  const stockName =
    stock?.name ||
    stock?.symbol ||
    "Unknown";

  // =======================================================
  // COMPANY
  // =======================================================

  const companyName =
    stock?.company ||
    stock?.companyName ||
    "";

  // =======================================================
  // PRICE
  // =======================================================

  const stockPrice =
    Number(
      stock?.price ??
      stock?.ltp ??
      stock?.lastPrice ??
      0
    );

  const displayPrice =
    Number.isFinite(
      stockPrice
    )
      ? stockPrice
      : 0;

  // =======================================================
  // PERCENTAGE
  // =======================================================

  const rawPercent =
    stock?.percent ??
    stock?.changePercent ??
    stock?.day ??
    "0%";

  const stockPercent =
    String(rawPercent);

  // =======================================================
  // NUMERIC PERCENTAGE
  // =======================================================

  const numericPercent =
    parseFloat(
      stockPercent.replace(
        "%",
        ""
      )
    );

  const isDown =
    Boolean(stock?.isDown) ||
    (
      !Number.isNaN(
        numericPercent
      ) &&
      numericPercent < 0
    );

  // =======================================================
  // SELECT STOCK
  // =======================================================

  const handleSelect = () => {
    generalContext?.setSelectedStock?.(
      stock
    );
  };

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <li
      onClick={handleSelect}
      onMouseEnter={() =>
        setShowActions(true)
      }
      onMouseLeave={() =>
        setShowActions(false)
      }
      style={{
        position:
          "relative",
      }}
    >

      <div className="item">

        {/* ===============================================
            STOCK NAME
        =============================================== */}

        <div
          style={{
            minWidth: 0,
            flex: 1,
          }}
        >

          <p
            className={
              isDown
                ? "down"
                : "up"
            }
          >
            {stockName}
          </p>

          {companyName && (
            <small
              style={{
                display:
                  "block",
                fontSize:
                  "10px",
                color:
                  "#888",
                marginTop:
                  "2px",
                whiteSpace:
                  "nowrap",
                overflow:
                  "hidden",
                textOverflow:
                  "ellipsis",
              }}
            >
              {companyName}
            </small>
          )}

        </div>

        {/* ===============================================
            PRICE INFORMATION
        =============================================== */}

        <div className="itemInfo">

          {/* PERCENT */}

          <span
            className={
              isDown
                ? "down percent"
                : "up percent"
            }
          >
            {stockPercent}
          </span>

          {/* ARROW */}

          {isDown ? (
            <KeyboardArrowDown
              className="down"
              fontSize="small"
            />
          ) : (
            <KeyboardArrowUp
              className="up"
              fontSize="small"
            />
          )}

          {/* PRICE */}

          <span className="price">
            ₹
            {displayPrice.toLocaleString(
              "en-IN",
              {
                minimumFractionDigits:
                  2,
                maximumFractionDigits:
                  2,
              }
            )}
          </span>

        </div>

      </div>

      {/* =================================================
          ACTION BUTTONS
      ================================================= */}

      {showActions && (
        <WatchListActions
          stock={stock}
        />
      )}

    </li>
  );
};


// =========================================================
// WATCHLIST ACTIONS
// =========================================================

const WatchListActions = ({
  stock,
}) => {

  const generalContext =
    useContext(
      GeneralContext
    );

  const [showMore, setShowMore] =
    useState(false);

  // =======================================================
  // ANALYTICS
  // =======================================================

  const handleAnalytics = () => {

    generalContext?.openAnalytics?.(
      stock
    );

    setShowMore(false);
  };

  // =======================================================
  // BUY
  // =======================================================

  const handleBuy = () => {

    generalContext?.openBuyWindow?.(
      stock
    );
  };

  // =======================================================
  // SELL
  // =======================================================

  const handleSell = () => {

    generalContext?.openSellWindow?.(
      stock
    );
  };

  // =======================================================
  // REMOVE
  // =======================================================

  const handleRemove = async () => {

    /*
     * Default catalog stocks don't necessarily
     * have a MongoDB _id.
     *
     * Therefore we only remove stocks that are
     * actual backend watchlist records.
     */

    if (!stock?._id) {

      setShowMore(false);

      console.warn(
        "This stock is part of the default stock catalog and cannot be removed from the backend watchlist."
      );

      return;
    }

    try {

      if (
        generalContext
          ?.removeFromWatchlist
      ) {

        await generalContext.removeFromWatchlist(
          stock._id
        );
      }

      setShowMore(false);

    } catch (err) {

      console.error(
        "Unable to remove stock:",
        err
      );
    }
  };

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <div
      className="actions"
      onClick={(e) =>
        e.stopPropagation()
      }
    >

      {/* =================================================
          BUY
      ================================================= */}

      <button
        type="button"
        className="buy"
        onClick={handleBuy}
      >
        Buy
      </button>

      {/* =================================================
          SELL
      ================================================= */}

      <button
        type="button"
        className="sell"
        onClick={handleSell}
      >
        Sell
      </button>

      {/* =================================================
          ANALYTICS
      ================================================= */}

      <button
        type="button"
        className="action"
        onClick={
          handleAnalytics
        }
        title="View analytics"
      >
        <BarChartOutlined
          fontSize="small"
        />
      </button>

      {/* =================================================
          MORE
      ================================================= */}

      <div className="more-container">

        <button
          type="button"
          className="action"
          onClick={() =>
            setShowMore(
              (prev) => !prev
            )
          }
          title="More actions"
        >
          <MoreHoriz
            fontSize="small"
          />
        </button>

        {/* MORE MENU */}

        {showMore && (
          <div className="more-menu">

            {/* VIEW DETAILS */}

            <p
              onClick={
                handleAnalytics
              }
            >
              View Details
            </p>

            {/* REMOVE */}

            <p
              onClick={
                handleRemove
              }
            >
              Remove from Watchlist
            </p>

          </div>
        )}

      </div>

    </div>
  );
};