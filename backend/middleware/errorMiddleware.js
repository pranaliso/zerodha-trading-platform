const errorMiddleware = (err, req, res, next) => {
    console.log(err.stack);

    if (err.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: "Invalid ID"
        });
    }

    if (err.name === "ValidationError") {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

    if (err.code === 11000) {
        return res.status(409).json({
            success: false,
            message: "Duplicate entry"
        });
    }

    return res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Something went wrong"
    });
};

module.exports = errorMiddleware;
