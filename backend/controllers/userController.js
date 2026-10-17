const UserModel = require("../model/UserModel");
const bcrypt = require("bcrypt");
const getUserId = require("../utils/getUserId");

const getProfile = async (req, res, next) => {
    try {
        const userId = getUserId(req);

        const user = await UserModel.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        next(error);
    }
};

const updateProfile = async (req, res, next) => {
    try {
        const userId = getUserId(req);

        const {
            username,
            email,
            fullName,
            phone,
            bio,
            profileImage,
            currentPassword,
            newPassword
        } = req.body;

        const user = await UserModel.findById(userId).select("+password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (username !== undefined && username !== user.username) {
            const existingUsername = await UserModel.findOne({
                username,
                _id: { $ne: userId }
            });

            if (existingUsername) {
                return res.status(400).json({
                    success: false,
                    message: "Username already exists"
                });
            }

            user.username = username;
        }

        if (email !== undefined && email !== user.email) {
            const existingEmail = await UserModel.findOne({
                email: String(email).toLowerCase(),
                _id: { $ne: userId }
            });

            if (existingEmail) {
                return res.status(400).json({
                    success: false,
                    message: "Email already exists"
                });
            }

            user.email = email;
        }

        if (fullName !== undefined) {
            user.fullName = fullName;
        }

        if (phone !== undefined) {
            user.phone = phone;
        }

        if (bio !== undefined) {
            user.bio = bio;
        }

        if (profileImage !== undefined) {
            user.profileImage = profileImage;
        }

        if (newPassword) {
            if (!currentPassword) {
                return res.status(400).json({
                    success: false,
                    message: "Current password is required to set a new password"
                });
            }

            const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);

            if (!isPasswordCorrect) {
                return res.status(401).json({
                    success: false,
                    message: "Current password is incorrect"
                });
            }

            if (String(newPassword).length < 6) {
                return res.status(400).json({
                    success: false,
                    message: "Password must be at least 6 characters"
                });
            }

            user.password = await bcrypt.hash(newPassword, 10);
        }

        await user.save();

        const updatedUser = user.toObject();
        delete updatedUser.password;

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProfile,
    updateProfile
};
