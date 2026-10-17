const FundsModel = require("../model/FundsModel");
const HoldingsModel = require("../model/HoldingsModel");
const TransactionModel = require("../model/TransactionModel");
const getUserId = require("../utils/getUserId");

// =========================================================
// GET OR CREATE USER FUNDS
// =========================================================

const getOrCreateFunds = async (userId) => {
    if (!userId) {
        throw new Error("User ID is required");
    }

    // Find ONLY this user's funds
    let funds = await FundsModel.findOne({
        user: userId
    });

    // Create funds only for this user
    if (!funds) {
        funds = await FundsModel.create({
            user: userId,
            availableCash: 100000,
            usedMargin: 0,
            openingBalance: 100000,
            payin: 0
        });
    }

    // =====================================================
    // CALCULATE USED MARGIN FOR THIS USER ONLY
    // =====================================================

    const holdings = await HoldingsModel.find({
        user: userId
    });

    const usedMargin = holdings.reduce(
        (sum, stock) => {
            const qty = Number(stock.qty) || 0;
            const avg = Number(stock.avg) || 0;

            return sum + qty * avg;
        },
        0
    );

    funds.usedMargin = Number(
        usedMargin.toFixed(2)
    );

    await funds.save();

    return funds;
};

// =========================================================
// GET FUNDS
// =========================================================

const getFunds = async (req, res, next) => {
    try {
        const userId = getUserId(req);

        console.log(
            "GET FUNDS USER:",
            userId
        );

        const funds =
            await getOrCreateFunds(userId);

        res.status(200).json({
            success: true,
            funds
        });

    } catch (error) {
        console.error(
            "GET FUNDS ERROR:",
            error
        );

        next(error);
    }
};

// =========================================================
// ADD FUNDS
// =========================================================

const addFunds = async (req, res, next) => {
    try {
        const userId = getUserId(req);

        const amount =
            Number(req.body.amount);

        // =====================================================
        // VALIDATION
        // =====================================================

        if (
            !Number.isFinite(amount) ||
            amount <= 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Enter a valid amount"
            });
        }

        // =====================================================
        // GET THIS USER'S FUNDS
        // =====================================================

        const funds =
            await getOrCreateFunds(userId);

        console.log(
            "ADD FUNDS USER:",
            userId
        );

        console.log(
            "OLD BALANCE:",
            funds.availableCash
        );

        // =====================================================
        // UPDATE ONLY THIS USER
        // =====================================================

        funds.availableCash =
            Number(funds.availableCash) +
            amount;

        funds.openingBalance =
            Number(funds.openingBalance) +
            amount;

        funds.payin =
            Number(funds.payin) +
            amount;

        await funds.save();

        console.log(
            "NEW BALANCE:",
            funds.availableCash
        );

        // =====================================================
        // TRANSACTION
        // =====================================================

        await TransactionModel.create({
            user: userId,
            type: "ADD",
            amount,
            note: "Funds added"
        });

        res.status(200).json({
            success: true,
            message: "Funds added successfully",
            funds
        });

    } catch (error) {
        console.error(
            "ADD FUNDS ERROR:",
            error
        );

        next(error);
    }
};

// =========================================================
// WITHDRAW FUNDS
// =========================================================

const withdrawFunds = async (req, res, next) => {
    try {
        const userId = getUserId(req);

        const amount =
            Number(req.body.amount);

        // =====================================================
        // VALIDATION
        // =====================================================

        if (
            !Number.isFinite(amount) ||
            amount <= 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Enter a valid amount"
            });
        }

        // =====================================================
        // GET THIS USER'S FUNDS
        // =====================================================

        const funds =
            await getOrCreateFunds(userId);

        console.log(
            "WITHDRAW USER:",
            userId
        );

        console.log(
            "CURRENT BALANCE:",
            funds.availableCash
        );

        // =====================================================
        // CHECK BALANCE
        // =====================================================

        if (
            Number(funds.availableCash) <
            amount
        ) {
            return res.status(400).json({
                success: false,
                message: "Insufficient balance"
            });
        }

        // =====================================================
        // UPDATE BALANCE
        // =====================================================

        funds.availableCash =
            Number(funds.availableCash) -
            amount;

        await funds.save();

        console.log(
            "NEW BALANCE:",
            funds.availableCash
        );

        // =====================================================
        // TRANSACTION
        // =====================================================

        await TransactionModel.create({
            user: userId,
            type: "WITHDRAW",
            amount,
            note: "Funds withdrawn"
        });

        res.status(200).json({
            success: true,
            message: "Withdrawal successful",
            funds
        });

    } catch (error) {
        console.error(
            "WITHDRAW FUNDS ERROR:",
            error
        );

        next(error);
    }
};

// =========================================================
// GET TRANSACTIONS
// =========================================================

const getTransactions = async (
    req,
    res,
    next
) => {
    try {
        const userId = getUserId(req);

        const transactions =
            await TransactionModel
                .find({
                    user: userId
                })
                .sort({
                    createdAt: -1
                });

        res.status(200).json({
            success: true,
            transactions
        });

    } catch (error) {
        console.error(
            "TRANSACTIONS ERROR:",
            error
        );

        next(error);
    }
};

// =========================================================
// EXPORT
// =========================================================

module.exports = {
    getFunds,
    addFunds,
    withdrawFunds,
    getTransactions,
    getOrCreateFunds
};