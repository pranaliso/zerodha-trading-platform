const mongoose = require("mongoose");

const getUserId = (req) => {
    // ==========================================
    // CHECK AUTHENTICATED USER
    // ==========================================

    if (!req.user) {
        const error = new Error("Unauthorized: User not found");
        error.statusCode = 401;
        throw error;
    }

    // ==========================================
    // SUPPORT BOTH userId AND id
    // ==========================================

    const userId =
        req.user.userId ||
        req.user.id ||
        req.user._id;

    if (!userId) {
        console.error("JWT user payload:", req.user);

        const error = new Error(
            "Unauthorized: User ID missing from token"
        );

        error.statusCode = 401;
        throw error;
    }

    // ==========================================
    // VALIDATE MONGODB OBJECT ID
    // ==========================================

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        console.error("Invalid User ID:", userId);

        const error = new Error(
            "Unauthorized: Invalid User ID"
        );

        error.statusCode = 401;
        throw error;
    }

    return userId;
};

module.exports = getUserId;