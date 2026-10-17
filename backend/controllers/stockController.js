const { stocks, findStock } = require("../data/stocks");

const getStocks = (req, res) => {
    const query = String(req.query.q || "").trim().toUpperCase();

    const data = query
        ? stocks.filter((stock) => stock.name.includes(query))
        : stocks;

    res.status(200).json(data);
};

const getStock = (req, res) => {
    const stock = findStock(req.params.symbol);

    if (!stock) {
        return res.status(404).json({
            success: false,
            message: "Stock not found"
        });
    }

    res.status(200).json(stock);
};

module.exports = {
    getStocks,
    getStock
};
