const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/Users")

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(201).json({ message: "User already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })
        res.status(201).json({
            message: "User registered succesfully", user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        })
    }
    catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("LOGIN EMAIL:", email);
        console.log("LOGIN PASSWORD:", password);

        const user = await User.findOne({ email });

        console.log("FOUND USER:", user);

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        console.log("PASSWORD MATCH:", isMatch);

        if (!isMatch) {
            return res.status(400).json({
                message: "Password does not match"
            });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        console.log("TOKEN CREATED");

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.log("LOGIN ERROR:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};
module.exports = {
    registerUser,
    loginUser
}