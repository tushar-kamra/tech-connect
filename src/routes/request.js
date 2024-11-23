const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestRouter = express.Router();

requestRouter.post(
    "/request/send/:status/:toUserId",
    userAuth,
    async (req, res) => {
        try {
        } catch (err) {
            res.status(400).send("Something went wrong: " + err.message);
        }
    }
);
