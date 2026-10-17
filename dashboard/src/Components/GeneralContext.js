import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import api from "../api";
import BuyActionWindow from "./BuyActionWindow";

// =========================================================
// CONTEXT
// =========================================================

const GeneralContext = createContext();

// =========================================================
// DEFAULT STOCK LIST - 30 STOCKS
// =========================================================

const DEFAULT_STOCKS = [
  {
    name: "RELIANCE",
    company: "Reliance Industries",
    price: 2945.2,
    percent: "+1.25%",
  },
  {
    name: "TCS",
    company: "Tata Consultancy Services",
    price: 3842.4,
    percent: "+0.84%",
  },
  {
    name: "INFY",
    company: "Infosys",
    price: 1742.3,
    percent: "+1.12%",
  },
  {
    name: "HDFCBANK",
    company: "HDFC Bank",
    price: 1965.5,
    percent: "+0.72%",
  },
  {
    name: "ICICIBANK",
    company: "ICICI Bank",
    price: 1428.6,
    percent: "+1.05%",
  },
  {
    name: "SBIN",
    company: "State Bank of India",
    price: 812.35,
    percent: "+0.63%",
  },
  {
    name: "ITC",
    company: "ITC Limited",
    price: 512.45,
    percent: "+0.48%",
  },
  {
    name: "HINDUNILVR",
    company: "Hindustan Unilever",
    price: 2568.2,
    percent: "-0.32%",
  },
  {
    name: "BHARTIARTL",
    company: "Bharti Airtel",
    price: 1865.75,
    percent: "+1.86%",
  },
  {
    name: "KOTAKBANK",
    company: "Kotak Mahindra Bank",
    price: 1872.4,
    percent: "+0.41%",
  },
  {
    name: "AXISBANK",
    company: "Axis Bank",
    price: 1186.25,
    percent: "+0.77%",
  },
  {
    name: "LT",
    company: "Larsen & Toubro",
    price: 3845.3,
    percent: "+1.34%",
  },
  {
    name: "HCLTECH",
    company: "HCL Technologies",
    price: 1584.65,
    percent: "+0.92%",
  },
  {
    name: "WIPRO",
    company: "Wipro",
    price: 542.3,
    percent: "+0.55%",
  },
  {
    name: "TECHM",
    company: "Tech Mahindra",
    price: 1724.8,
    percent: "+0.71%",
  },
  {
    name: "MARUTI",
    company: "Maruti Suzuki",
    price: 12645.5,
    percent: "+1.27%",
  },
  {
    name: "TATAMOTORS",
    company: "Tata Motors",
    price: 785.4,
    percent: "-0.46%",
  },
  {
    name: "M&M",
    company: "Mahindra & Mahindra",
    price: 3185.25,
    percent: "+1.08%",
  },
  {
    name: "BAJFINANCE",
    company: "Bajaj Finance",
    price: 9825.6,
    percent: "+0.64%",
  },
  {
    name: "BAJAJFINSV",
    company: "Bajaj Finserv",
    price: 1986.3,
    percent: "+0.81%",
  },
  {
    name: "SUNPHARMA",
    company: "Sun Pharmaceutical",
    price: 1728.45,
    percent: "+1.42%",
  },
  {
    name: "DRREDDY",
    company: "Dr. Reddy's Laboratories",
    price: 1268.7,
    percent: "+0.34%",
  },
  {
    name: "CIPLA",
    company: "Cipla",
    price: 1534.2,
    percent: "+0.58%",
  },
  {
    name: "DIVISLAB",
    company: "Divi's Laboratories",
    price: 6218.4,
    percent: "-0.27%",
  },
  {
    name: "ADANIENT",
    company: "Adani Enterprises",
    price: 2564.35,
    percent: "+1.73%",
  },
  {
    name: "ADANIPORTS",
    company: "Adani Ports",
    price: 1468.25,
    percent: "+1.12%",
  },
  {
    name: "ASIANPAINT",
    company: "Asian Paints",
    price: 2386.45,
    percent: "-0.41%",
  },
  {
    name: "ULTRACEMCO",
    company: "UltraTech Cement",
    price: 12456.7,
    percent: "+0.95%",
  },
  {
    name: "TATASTEEL",
    company: "Tata Steel",
    price: 168.45,
    percent: "+0.87%",
  },
  {
    name: "TITAN",
    company: "Titan Company",
    price: 3568.45,
    percent: "+0.68%",
  },
];

// =========================================================
// CREATE DEFAULT WATCHLIST
// =========================================================

const createDefaultWatchlist = () => {
  return DEFAULT_STOCKS.map((stock) => ({
    ...stock,
    _id: `default-${stock.name}`,
    isDefaultStock: true,
  }));
};

// =========================================================
// PRICE HISTORY
// =========================================================

const generatePriceHistory = (stock) => {
  const basePrice = Number(stock?.price) || 100;

  const percentText =
    stock?.percent ??
    stock?.day ??
    "0";

  const parsedPercent =
    parseFloat(
      String(percentText).replace("%", "")
    ) || 0;

  const startPrice =
    basePrice /
    (1 + parsedPercent / 100);

  const points = 40;

  return Array.from(
    { length: points },
    (_, index) => {
      const progress =
        index / (points - 1);

      const wave =
        Math.sin(index * 0.65) * 0.012 +
        Math.sin(index * 0.19) * 0.008;

      const trend =
        (basePrice - startPrice) /
        startPrice;

      const price =
        startPrice *
        (1 + trend * progress + wave);

      return {
        index,
        price: Math.max(price, 1),
      };
    }
  );
};

// =========================================================
// PRICE GRAPH
// =========================================================

const PriceGraph = ({ stock }) => {
  const history =
    generatePriceHistory(stock);

  const width = 720;
  const height = 300;

  const paddingLeft = 60;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 40;

  const chartWidth =
    width -
    paddingLeft -
    paddingRight;

  const chartHeight =
    height -
    paddingTop -
    paddingBottom;

  const prices = history.map(
    (item) => item.price
  );

  const minPrice =
    Math.min(...prices);

  const maxPrice =
    Math.max(...prices);

  const priceRange =
    maxPrice - minPrice || 1;

  const points = history
    .map((item, index) => {
      const x =
        paddingLeft +
        (index /
          (history.length - 1)) *
          chartWidth;

      const y =
        paddingTop +
        chartHeight -
        ((item.price - minPrice) /
          priceRange) *
          chartHeight;

      return `${x},${y}`;
    })
    .join(" ");

  const currentPrice =
    Number(stock?.price) ||
    prices[prices.length - 1];

  const firstPrice =
    prices[0];

  const percentage =
    ((currentPrice - firstPrice) /
      firstPrice) *
    100;

  const isPositive =
    currentPrice >= firstPrice;

  const graphColor =
    isPositive
      ? "#26a69a"
      : "#ef5350";

  const lastIndex =
    history.length - 1;

  const currentX =
    paddingLeft +
    (lastIndex /
      (history.length - 1)) *
      chartWidth;

  const currentY =
    paddingTop +
    chartHeight -
    ((currentPrice - minPrice) /
      priceRange) *
      chartHeight;

  return (
    <div
      style={{
        width: "100%",
        overflowX: "auto",
        marginTop: "20px",
      }}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height="300"
        preserveAspectRatio="none"
      >
        {/* GRID */}

        {[0, 1, 2, 3, 4].map(
          (line) => {
            const y =
              paddingTop +
              (chartHeight / 4) *
                line;

            const price =
              maxPrice -
              (priceRange / 4) *
                line;

            return (
              <g key={line}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={
                    width -
                    paddingRight
                  }
                  y2={y}
                  stroke="#eeeeee"
                  strokeWidth="1"
                />

                <text
                  x="5"
                  y={y + 4}
                  fontSize="12"
                  fill="#666"
                >
                  ₹{price.toFixed(0)}
                </text>
              </g>
            );
          }
        )}

        {/* PRICE LINE */}

        <polyline
          points={points}
          fill="none"
          stroke={graphColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* CURRENT PRICE */}

        <circle
          cx={currentX}
          cy={currentY}
          r="5"
          fill={graphColor}
        />

        {/* X LABELS */}

        <text
          x={paddingLeft}
          y={height - 10}
          fontSize="12"
          fill="#777"
        >
          1D
        </text>

        <text
          x={width / 2 - 15}
          y={height - 10}
          fontSize="12"
          fill="#777"
        >
          Today
        </text>

        <text
          x={width - 45}
          y={height - 10}
          fontSize="12"
          fill="#777"
        >
          Now
        </text>
      </svg>

      {/* PRICE INFORMATION */}

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          padding: "0 8px",
          marginTop: "5px",
        }}
      >
        <strong>
          ₹{currentPrice.toFixed(2)}
        </strong>

        <span
          style={{
            color: graphColor,
            fontWeight: "600",
          }}
        >
          {isPositive ? "+" : ""}
          {percentage.toFixed(2)}%
        </span>
      </div>

      {/* TIME RANGE */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "8px",
          marginTop: "18px",
        }}
      >
        {[
          "1D",
          "1W",
          "1M",
          "6M",
          "1Y",
        ].map((rangeName, index) => (
          <button
            key={rangeName}
            type="button"
            style={{
              border:
                index === 0
                  ? "1px solid #387ed1"
                  : "1px solid #ddd",

              background:
                index === 0
                  ? "#387ed1"
                  : "#fff",

              color:
                index === 0
                  ? "#fff"
                  : "#555",

              padding:
                "5px 12px",

              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            {rangeName}
          </button>
        ))}
      </div>
    </div>
  );
};

// =========================================================
// PROVIDER
// =========================================================

export const GeneralContextProvider = ({
  children,
}) => {
  // =======================================================
  // DASHBOARD DATA
  // =======================================================

  const [holdings, setHoldings] =
    useState([]);

  const [orders, setOrders] =
    useState([]);

  const [positions, setPositions] =
    useState([]);

  const [watchlist, setWatchlist] =
    useState(createDefaultWatchlist);

  /*
   * IMPORTANT:
   * Always start with ALL 30 default stocks.
   */
  const [stocks, setStocks] =
    useState(DEFAULT_STOCKS);

  const [funds, setFunds] =
    useState(null);

  const [profile, setProfile] =
    useState(null);

  const [transactions, setTransactions] =
    useState([]);

  // =======================================================
  // LOADING / ERROR
  // =======================================================

  const [
    dashboardLoading,
    setDashboardLoading,
  ] = useState(true);

  const [error, setError] =
    useState(null);

  const [authReady, setAuthReady] =
    useState(false);

  // =======================================================
  // BUY / SELL
  // =======================================================

  const [
    isBuyWindowOpen,
    setIsBuyWindowOpen,
  ] = useState(false);

  const [
    selectedStock,
    setSelectedStock,
  ] = useState(null);

  const [
    selectedStockUID,
    setSelectedStockUID,
  ] = useState("");

  const [action, setAction] =
    useState("BUY");

  // =======================================================
  // ANALYTICS
  // =======================================================

  const [
    isAnalyticsOpen,
    setIsAnalyticsOpen,
  ] = useState(false);

  const [
    analyticsStock,
    setAnalyticsStock,
  ] = useState(null);

  // =======================================================
  // AUTHENTICATION
  // =======================================================

  useEffect(() => {
    try {
      const hash =
        window.location.hash || "";

      if (
        hash.startsWith("#token=")
      ) {
        const encodedToken =
          hash.substring(
            "#token=".length
          );

        const token =
          decodeURIComponent(
            encodedToken
          );

        if (token) {
          localStorage.setItem(
            "token",
            token
          );
        }

        window.history.replaceState(
          null,
          "",
          window.location.pathname +
            window.location.search
        );
      }
    } catch (err) {
      console.error(
        "Token processing error:",
        err
      );
    } finally {
      setAuthReady(true);
    }
  }, []);

  // =======================================================
  // API RESPONSE HELPER
  // =======================================================

  const getArrayFromResponse =
    useCallback(
      (response, key) => {
        if (!response) {
          return [];
        }

        if (
          Array.isArray(
            response.data
          )
        ) {
          return response.data;
        }

        if (
          Array.isArray(
            response.data?.[key]
          )
        ) {
          return response.data[key];
        }

        return [];
      },
      []
    );

  // =======================================================
  // STOCK NORMALIZATION
  // =======================================================

  const normalizeStock = (
    stock
  ) => {
    if (!stock) {
      return null;
    }

    return {
      ...stock,

      name:
        stock.name ||
        stock.symbol ||
        stock.tradingsymbol ||
        "",

      company:
        stock.company ||
        stock.companyName ||
        stock.name ||
        stock.symbol ||
        "",

      price:
        Number(
          stock.price ??
            stock.ltp ??
            stock.lastPrice ??
            0
        ),

      percent:
        stock.percent ??
        stock.changePercent ??
        stock.day ??
        "0%",
    };
  };

  // =======================================================
  // MERGE STOCK CATALOG
  // =======================================================
  //
  // THIS IS THE IMPORTANT FIX.
  //
  // Backend may return only 15 stocks.
  // We merge them with the 30 default stocks.
  //
  // Therefore:
  //
  // Backend 15
  // +
  // Missing default stocks
  // =
  // 30 stocks
  //
  // Backend values take priority.
  // =======================================================

  const mergeStockCatalog =
    useCallback(
      (backendStocks) => {
        const merged = [
          ...DEFAULT_STOCKS,
        ];

        if (
          Array.isArray(
            backendStocks
          )
        ) {
          backendStocks.forEach(
            (backendStock) => {
              const normalized =
                normalizeStock(
                  backendStock
                );

              if (
                !normalized?.name
              ) {
                return;
              }

              const backendName =
                String(
                  normalized.name
                ).toUpperCase();

              const index =
                merged.findIndex(
                  (stock) =>
                    String(
                      stock.name
                    ).toUpperCase() ===
                    backendName
                );

              if (index >= 0) {
                /*
                 * Backend data overrides
                 * default data.
                 */
                merged[index] = {
                  ...merged[index],
                  ...normalized,
                };
              } else {
                /*
                 * If backend contains
                 * an additional stock,
                 * keep it too.
                 */
                merged.push(
                  normalized
                );
              }
            }
          );
        }

        /*
         * Remove duplicates.
         */

        const unique =
          new Map();

        merged.forEach(
          (stock) => {
            const key =
              String(
                stock?.name || ""
              ).toUpperCase();

            if (key) {
              unique.set(
                key,
                stock
              );
            }
          }
        );

        return Array.from(
          unique.values()
        );
      },
      []
    );

  // =======================================================
  // ENRICH WATCHLIST
  // =======================================================

  const enrichWatchlist =
    useCallback(
      (items) => {
        if (
          !Array.isArray(items) ||
          items.length === 0
        ) {
          return createDefaultWatchlist();
        }

        return items
          .map((item) => {
            const normalized =
              normalizeStock(item);

            const catalogStock =
              DEFAULT_STOCKS.find(
                (stock) =>
                  String(
                    stock.name
                  ).toUpperCase() ===
                  String(
                    normalized?.name
                  ).toUpperCase()
              );

            return {
              ...(catalogStock || {}),
              ...(normalized || {}),
              isDefaultStock: false,
            };
          })
          .filter(
            (item) =>
              item?.name
          );
      },
      []
    );

  // =======================================================
  // REFRESH DASHBOARD
  // =======================================================

  const refreshDashboard =
    useCallback(async () => {
      setDashboardLoading(true);
      setError(null);

      const token =
        localStorage.getItem(
          "token"
        );

      // ===================================================
      // NO TOKEN
      // ===================================================

      if (!token) {
        setHoldings([]);
        setOrders([]);
        setPositions([]);

        setWatchlist(
          createDefaultWatchlist()
        );

        setFunds(null);

        /*
         * ALWAYS 30+
         */
        setStocks(
          DEFAULT_STOCKS
        );

        setProfile(null);
        setTransactions([]);

        setError(
          "Please login first."
        );

        setDashboardLoading(false);

        return;
      }

      // ===================================================
      // SAFE REQUEST
      // ===================================================

      const request = async (
        name,
        requestFunction
      ) => {
        try {
          const response =
            await requestFunction();

          console.log(
            `${name} RESPONSE:`,
            response.data
          );

          return {
            success: true,
            response,
          };
        } catch (err) {
          console.error(
            `${name} ERROR:`,
            err
          );

          return {
            success: false,
            error: err,
          };
        }
      };

      // ===================================================
      // API REQUESTS
      // ===================================================

      const [
        holdingsResult,
        ordersResult,
        positionsResult,
        watchlistResult,
        fundsResult,
        stocksResult,
        profileResult,
        transactionsResult,
      ] = await Promise.all([
        request(
          "HOLDINGS",
          () =>
            api.get(
              "/holdings"
            )
        ),

        request(
          "ORDERS",
          () =>
            api.get(
              "/orders"
            )
        ),

        request(
          "POSITIONS",
          () =>
            api.get(
              "/positions"
            )
        ),

        request(
          "WATCHLIST",
          () =>
            api.get(
              "/watchlist"
            )
        ),

        request(
          "FUNDS",
          () =>
            api.get(
              "/funds"
            )
        ),

        request(
          "STOCKS",
          () =>
            api.get(
              "/stocks"
            )
        ),

        request(
          "PROFILE",
          () =>
            api.get(
              "/users/profile"
            )
        ),

        request(
          "TRANSACTIONS",
          () =>
            api.get(
              "/funds/transactions"
            )
        ),
      ]);

      // ===================================================
      // ALL RESULTS
      // ===================================================

      const allResults = [
        holdingsResult,
        ordersResult,
        positionsResult,
        watchlistResult,
        fundsResult,
        stocksResult,
        profileResult,
        transactionsResult,
      ];

      // ===================================================
      // AUTH ERROR
      // ===================================================

      const unauthorizedResult =
        allResults.find(
          (result) =>
            !result.success &&
            result.error?.response
              ?.status === 401
        );

      if (
        unauthorizedResult
      ) {
        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "user"
        );

        setHoldings([]);
        setOrders([]);
        setPositions([]);

        setWatchlist(
          createDefaultWatchlist()
        );

        setFunds(null);

        setStocks(
          DEFAULT_STOCKS
        );

        setProfile(null);
        setTransactions([]);

        setError(
          "Authentication failed. Please login again."
        );

        setDashboardLoading(false);

        return;
      }

      // ===================================================
      // HOLDINGS
      // ===================================================

      if (
        holdingsResult.success
      ) {
        setHoldings(
          getArrayFromResponse(
            holdingsResult.response,
            "holdings"
          )
        );
      } else {
        setHoldings([]);
      }

      // ===================================================
      // ORDERS
      // ===================================================

      if (
        ordersResult.success
      ) {
        setOrders(
          getArrayFromResponse(
            ordersResult.response,
            "orders"
          )
        );
      } else {
        setOrders([]);
      }

      // ===================================================
      // POSITIONS
      // ===================================================

      if (
        positionsResult.success
      ) {
        setPositions(
          getArrayFromResponse(
            positionsResult.response,
            "positions"
          )
        );
      } else {
        setPositions([]);
      }

      // ===================================================
      // STOCKS
      // ===================================================

      /*
       * IMPORTANT FIX:
       *
       * NEVER DO:
       *
       * setStocks(normalizedStocks)
       *
       * because backend may only contain 15.
       *
       * Instead merge backend stocks with
       * the complete 30-stock catalog.
       */

      let finalStocks =
        DEFAULT_STOCKS;

      if (
        stocksResult.success
      ) {
        const backendStocks =
          getArrayFromResponse(
            stocksResult.response,
            "stocks"
          );

        finalStocks =
          mergeStockCatalog(
            backendStocks
          );
      }

      /*
       * Make absolutely sure the
       * stock list is not smaller
       * than the default catalog.
       */

      if (
        finalStocks.length <
        DEFAULT_STOCKS.length
      ) {
        finalStocks =
          mergeStockCatalog(
            finalStocks
          );
      }

      setStocks(
        finalStocks
      );

      console.log(
        "FINAL STOCK CATALOG:",
        finalStocks.length
      );

      // ===================================================
      // WATCHLIST
      // ===================================================

      if (
        watchlistResult.success
      ) {
        const backendWatchlist =
          getArrayFromResponse(
            watchlistResult.response,
            "watchlist"
          );

        if (
          backendWatchlist.length > 0
        ) {
          const enriched =
            enrichWatchlist(
              backendWatchlist
            );

          setWatchlist(
            enriched
          );

          console.log(
            "Backend watchlist:",
            enriched.length
          );
        } else {
          /*
           * Backend watchlist empty.
           *
           * Show ALL 30 default stocks.
           */

          setWatchlist(
            createDefaultWatchlist()
          );

          console.log(
            "Backend watchlist empty."
          );

          console.log(
            "Showing all 30 default stocks."
          );
        }
      } else {
        setWatchlist(
          createDefaultWatchlist()
        );
      }

      // ===================================================
      // TRANSACTIONS
      // ===================================================

      if (
        transactionsResult.success
      ) {
        setTransactions(
          getArrayFromResponse(
            transactionsResult.response,
            "transactions"
          )
        );
      } else {
        setTransactions([]);
      }

      // ===================================================
      // FUNDS
      // ===================================================

      if (
        fundsResult.success
      ) {
        const fundsData =
          fundsResult.response
            .data?.funds ??
          fundsResult.response.data ??
          null;

        setFunds(
          fundsData
        );
      } else {
        setFunds(null);
      }

      // ===================================================
      // PROFILE
      // ===================================================

      if (
        profileResult.success
      ) {
        const userData =
          profileResult.response
            .data?.user ??
          profileResult.response.data ??
          null;

        setProfile(
          userData
        );

        if (userData) {
          localStorage.setItem(
            "user",
            JSON.stringify(
              userData
            )
          );
        }
      } else {
        setProfile(null);
      }

      // ===================================================
      // ERRORS
      // ===================================================

      const failedRequests =
        allResults.filter(
          (result) =>
            !result.success
        );

      if (
        failedRequests.length > 0 &&
        !unauthorizedResult
      ) {
        setError(
          "Some dashboard data could not be loaded. Please check the backend."
        );
      }

      setDashboardLoading(false);

      console.log(
        "========================================"
      );

      console.log(
        "DASHBOARD DATA LOADED"
      );

      console.log(
        "FINAL STOCK COUNT:",
        finalStocks.length
      );

      console.log(
        "========================================"
      );
    }, [
      getArrayFromResponse,
      enrichWatchlist,
      mergeStockCatalog,
    ]);

  // =======================================================
  // LOAD DASHBOARD AFTER AUTH
  // =======================================================

  useEffect(() => {
    if (!authReady) {
      return;
    }

    refreshDashboard();
  }, [
    authReady,
    refreshDashboard,
  ]);

  // =======================================================
  // BUY WINDOW
  // =======================================================

  const openBuyWindow = (
    stock
  ) => {
    if (
      !stock ||
      !stock.name
    ) {
      return;
    }

    setSelectedStock(
      stock
    );

    setSelectedStockUID(
      stock.name
    );

    setAction("BUY");

    setIsBuyWindowOpen(
      true
    );
  };

  // =======================================================
  // SELL WINDOW
  // =======================================================

  const openSellWindow = (
    stock
  ) => {
    if (
      !stock ||
      !stock.name
    ) {
      return;
    }

    setSelectedStock(
      stock
    );

    setSelectedStockUID(
      stock.name
    );

    setAction("SELL");

    setIsBuyWindowOpen(
      true
    );
  };

  // =======================================================
  // CLOSE BUY / SELL
  // =======================================================

  const closeBuyWindow = () => {
    setSelectedStock(null);
    setSelectedStockUID("");
    setAction("BUY");
    setIsBuyWindowOpen(false);
  };

  const closeSellWindow = () => {
    closeBuyWindow();
  };

  // =======================================================
  // ANALYTICS
  // =======================================================

  const openAnalytics = (
    stock
  ) => {
    if (!stock) {
      return;
    }

    setSelectedStock(
      stock
    );

    setAnalyticsStock(
      stock
    );

    setIsAnalyticsOpen(
      true
    );
  };

  const closeAnalytics = () => {
    setAnalyticsStock(null);
    setIsAnalyticsOpen(false);
  };

  // =======================================================
  // ADD TO WATCHLIST
  // =======================================================

  const addToWatchlist =
    async (name) => {
      if (
        !name ||
        !name.trim()
      ) {
        throw new Error(
          "Stock name is required"
        );
      }

      const stockName =
        name
          .trim()
          .toUpperCase();

      const alreadyExists =
        watchlist.some(
          (item) =>
            String(
              item?.name || ""
            ).toUpperCase() ===
            stockName
        );

      /*
       * If the stock exists only
       * in default catalog, allow
       * backend conversion.
       *
       * So do NOT block default
       * stocks just because they
       * are displayed.
       */

      const realBackendExists =
        watchlist.some(
          (item) =>
            !item?.isDefaultStock &&
            String(
              item?.name || ""
            ).toUpperCase() ===
            stockName
        );

      if (
        realBackendExists
      ) {
        throw new Error(
          `${stockName} is already in your watchlist`
        );
      }

      try {
        const response =
          await api.post(
            "/watchlist",
            {
              name: stockName,
            }
          );

        const newItem =
          response.data?.watchlist ??
          response.data?.stock ??
          response.data;

        if (!newItem) {
          throw new Error(
            "Invalid watchlist response"
          );
        }

        const catalogStock =
          stocks.find(
            (stock) =>
              String(
                stock?.name || ""
              ).toUpperCase() ===
              stockName
          ) ||
          DEFAULT_STOCKS.find(
            (stock) =>
              String(
                stock?.name || ""
              ).toUpperCase() ===
              stockName
          );

        const enrichedItem = {
          ...(catalogStock || {}),
          ...normalizeStock(
            newItem
          ),
          isDefaultStock: false,
        };

        setWatchlist(
          (prev) => {
            /*
             * Remove the temporary default
             * version of the same stock.
             */

            const filtered =
              prev.filter(
                (item) =>
                  String(
                    item?.name || ""
                  ).toUpperCase() !==
                  stockName
              );

            return [
              ...filtered,
              enrichedItem,
            ];
          }
        );

        return enrichedItem;
      } catch (err) {
        console.error(
          "Add watchlist error:",
          err
        );

        throw err;
      }
    };

  // =======================================================
  // REMOVE FROM WATCHLIST
  // =======================================================

  const removeFromWatchlist =
    async (id) => {
      if (!id) {
        throw new Error(
          "Watchlist item ID is required"
        );
      }

      const itemToRemove =
        watchlist.find(
          (item) =>
            item?._id === id
        );

      /*
       * Default stock:
       * only remove from UI.
       */

      if (
        itemToRemove?.isDefaultStock
      ) {
        setWatchlist(
          (prev) =>
            prev.filter(
              (item) =>
                item?._id !== id
            )
        );

        return;
      }

      /*
       * Real backend stock.
       */

      try {
        await api.delete(
          `/watchlist/${id}`
        );

        setWatchlist(
          (prev) =>
            prev.filter(
              (item) =>
                item?._id !== id
            )
        );
      } catch (err) {
        console.error(
          "Remove watchlist error:",
          err
        );

        throw err;
      }
    };

  // =======================================================
  // LOGOUT
  // =======================================================

  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    setHoldings([]);
    setOrders([]);
    setPositions([]);

    setWatchlist(
      createDefaultWatchlist()
    );

    setFunds(null);

    setStocks(
      DEFAULT_STOCKS
    );

    setProfile(null);
    setTransactions([]);

    window.location.href =
      "http://localhost:3000/login";
  };

  // =======================================================
  // CONTEXT VALUE
  // =======================================================

  const value = {
    // Dashboard
    holdings,
    orders,
    positions,
    watchlist,
    funds,
    stocks,
    profile,
    transactions,

    // Setters
    setHoldings,
    setOrders,
    setPositions,
    setWatchlist,
    setFunds,
    setStocks,
    setProfile,
    setTransactions,

    // Loading / error
    dashboardLoading,
    error,

    // Refresh
    refreshDashboard,

    // Selected stock
    selectedStock,
    setSelectedStock,
    selectedStockUID,

    // Buy / sell
    action,
    isBuyWindowOpen,

    openBuyWindow,
    openSellWindow,

    closeBuyWindow,
    closeSellWindow,

    // Analytics
    isAnalyticsOpen,
    analyticsStock,

    openAnalytics,
    closeAnalytics,

    // Watchlist
    addToWatchlist,
    removeFromWatchlist,

    // Authentication
    logout,
  };

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <GeneralContext.Provider
      value={value}
    >
      {children}

      {/* =================================================
          BUY / SELL WINDOW
      ================================================= */}

      {isBuyWindowOpen &&
        selectedStock && (
          <BuyActionWindow
            uid={
              selectedStockUID
            }
            stock={
              selectedStock
            }
            action={action}
          />
        )}

      {/* =================================================
          ANALYTICS WINDOW
      ================================================= */}

      {isAnalyticsOpen &&
        analyticsStock && (
          <div
            className="buy-window"
            style={{
              zIndex: 20,
              width: "760px",
              maxWidth: "95vw",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            {/* HEADER */}

            <div
              className="buy-header"
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h3
                  style={{
                    marginBottom:
                      "4px",
                  }}
                >
                  {
                    analyticsStock.name
                  }
                </h3>

                <span
                  style={{
                    fontSize: "13px",
                    color: "#777",
                  }}
                >
                  {
                    analyticsStock.company ||
                    analyticsStock.name
                  }
                </span>
              </div>

              <button
                type="button"
                onClick={
                  closeAnalytics
                }
                style={{
                  border: "none",
                  background:
                    "transparent",
                  fontSize: "24px",
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>

            {/* BODY */}

            <div
              className="buy-body"
              style={{
                padding:
                  "15px 20px 20px",
              }}
            >
              {/* CURRENT PRICE */}

              <div
                style={{
                  display: "flex",
                  alignItems:
                    "baseline",
                  gap: "12px",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                  }}
                >
                  ₹
                  {Number(
                    analyticsStock.price ||
                      0
                  ).toFixed(2)}
                </h2>

                <span
                  style={{
                    color:
                      String(
                        analyticsStock.percent ??
                          ""
                      ).startsWith(
                        "-"
                      )
                        ? "#ef5350"
                        : "#26a69a",
                    fontWeight:
                      "600",
                  }}
                >
                  {
                    analyticsStock.percent ??
                    analyticsStock.day ??
                    "0%"
                  }
                </span>
              </div>

              {/* PRICE GRAPH */}

              <PriceGraph
                stock={
                  analyticsStock
                }
              />

              {/* BUTTONS */}

              <div
                className="button-container"
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "20px",
                }}
              >
                <button
                  type="button"
                  className="buy-btn"
                  onClick={() => {
                    closeAnalytics();

                    openBuyWindow(
                      analyticsStock
                    );
                  }}
                >
                  BUY
                </button>

                <button
                  type="button"
                  className="sell-btn"
                  onClick={() => {
                    closeAnalytics();

                    openSellWindow(
                      analyticsStock
                    );
                  }}
                >
                  SELL
                </button>

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={
                    closeAnalytics
                  }
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;