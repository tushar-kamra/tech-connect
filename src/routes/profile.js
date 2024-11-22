const express = require("express");
const { userAuth } = require("../middlewares/auth");
const bcrypt = require('bcrypt')
const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        res.send(req.user);
    } catch (err) {
        res.status(400).send("Something went wrong: " + err.message);
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        const ALLOWED_UPDATES = [
            "firstName",
            "lastName",
            "age",
            "gender",
            "about",
            "skills",
        ];

        const isUpdateAllowed = Object.keys(req.body).every((key) =>
            ALLOWED_UPDATES.includes(key)
        );
        if (!isUpdateAllowed) {
            throw new Error("Update not allowed");
        }

        const loggedInUser = req.user;

        console.log(req.body);

        Object.keys(req.body).forEach((key) => {
            loggedInUser[key] = req.body[key];
        });

        console.log(loggedInUser);

        await loggedInUser.save();
        res.json({ message: "Update successful", data: loggedInUser });
    } catch (err) {
        res.status(400).send("Something went wrong: " + err.message);
    }
});

profileRouter.patch('/profile/password', userAuth, async (req, res) => {
    try {
        const newPassword = req.body.newPassword;
        const newHashPassword = await bcrypt.hash(newPassword, 10);

        req.user.password = newHashPassword;
        await req.user.save();
        res.send('Password updated successfully');
    } catch (err) {
        res.status(400).send("Something went wrong: " + err.message);
    }
})

module.exports = profileRouter;
