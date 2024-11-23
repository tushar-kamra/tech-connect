const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestRouter = express.Router();

requestRouter.post(
    "/request/send/:status/:toUserId",
    userAuth,
    async (req, res) => {
        try {
            const fromUserId = req.user._id;
            const status = req.params.status;
            const toUserId = req.params.toUserId;

            const allowedStatus = ["ignored", "interested"];
            if (!allowedStatus.includes(status)) {
                return res.json({ message: "Invalid status" });
            }
        } catch (err) {
            res.status(400).send("Something went wrong: " + err.message);
        }
    }
);
