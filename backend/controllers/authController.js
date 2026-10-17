const User = require("../model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const FundsModel = require("../model/FundsModel");

const createToken = (user) => {
    return jwt.sign(
        {
            userId: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );
};

const toPublicUser = (user) => ({
    id: user._id,
    username: user.username,
    email: user.email,
    fullName: user.fullName || "",
    phone: user.phone || "",
    bio: user.bio || "",
    profileImage: user.profileImage || ""
});

const ensureFunds = async (userId) => {
    let funds = await FundsModel.findOne({ user: userId });

    if (!funds) {
        funds = await FundsModel.create({ user: userId });
    }

    return funds;
};

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (String(password).length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            });
        }

        const existingUsername = await User.findOne({ username });

        if (existingUsername) {
            return res.status(400).json({
                success: false,
                message: "Username already exists"
            });
        }

        const existingEmail = await User.findOne({ email: String(email).toLowerCase() });

        if (existingEmail) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        await ensureFunds(newUser._id);

        const token = createToken(newUser);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user: toPublicUser(newUser)
        });
    } catch (error) {
        console.error("Register Error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ email: String(email).toLowerCase() }).select("+password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        await ensureFunds(user._id);

        const token = createToken(user);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: toPublicUser(user)
        });
    } catch (error) {
        console.error("Login Error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = {
    registerUser,
    loginUser
};
