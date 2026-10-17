const stocks = [
    { name: "INFY", price: 1555.45, percent: "-1.60%", isDown: true },
    { name: "TCS", price: 3194.8, percent: "-0.25%", isDown: true },
    { name: "WIPRO", price: 577.75, percent: "0.32%", isDown: false },
    { name: "RELIANCE", price: 2112.4, percent: "1.44%", isDown: false },
    { name: "HDFCBANK", price: 1522.35, percent: "0.11%", isDown: false },
    { name: "ICICIBANK", price: 1084.2, percent: "0.45%", isDown: false },
    { name: "SBIN", price: 430.2, percent: "-0.34%", isDown: true },
    { name: "ITC", price: 207.9, percent: "0.80%", isDown: false },
    { name: "HINDUNILVR", price: 2417.4, percent: "0.21%", isDown: false },
    { name: "BHARTIARTL", price: 541.15, percent: "2.99%", isDown: false },
    { name: "ONGC", price: 116.8, percent: "-0.09%", isDown: true },
    { name: "TATAPOWER", price: 124.15, percent: "-0.24%", isDown: true },
    { name: "M&M", price: 779.8, percent: "-0.01%", isDown: true },
    { name: "HUL", price: 512.4, percent: "1.04%", isDown: false },
    { name: "KPITTECH", price: 266.45, percent: "3.54%", isDown: false }
];

const findStock = (name) => {
    if (!name) return null;
    const symbol = String(name).trim().toUpperCase();
    return stocks.find((stock) => stock.name === symbol) || null;
};

module.exports = { stocks, findStock };
