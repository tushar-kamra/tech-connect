const express = require("express");
const validator = require("validator");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { validateSignUp } = require("../utils/validation");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
        firstName,
        lastName: lastName,
        email,
        password: passwordHash,
    });

    try {
        validateSignUp(req);
        await user.save();
        res.send("User created successfully!");
    } catch (err) {
        res.status(400).send("Error creating user: " + err.message);
    }
});

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!validator.isEmail(email)) {
            throw new Error("Invalid email");
        }

        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Invalid user");
        }

        const isPasswordCorrect = await user.validatePassword(password);
        if (isPasswordCorrect) {
            const token = await user.getJWT();
            res.cookie("jwt-token", token);
            res.send("Login successful");
        } else {
            res.send("Invalid credentials");
        }
    } catch (err) {
        res.status(400).send("Something went wrong: " + err.message);
    }
});

authRouter.post("/logout", (req, res) => {
    res.cookie("jwt-token", null, { expires: new Date(Date.now()) }).send(
        "Logout successfully!"
    );
});

module.exports = authRouter;
