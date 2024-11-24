const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
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
                return res.status(400).json({ message: "Invalid status" });
            }

            const toUser = await User.findById(toUserId);
            if (!toUser) {
                throw new Error("Invalid user");
            }

            const connectionRequest = new ConnectionRequest({
                fromUserId,
                toUserId,
                status,
            });
            await connectionRequest.save();
            res.json({ message: ``, data: connectionRequest });
        } catch (err) {
            res.status(400).send("Something went wrong: " + err.message);
        }
    }
);

module.exports = requestRouter;
