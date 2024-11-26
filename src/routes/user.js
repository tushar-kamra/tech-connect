const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUserId,
            status: "interested",
        }).populate("fromUserId", ["firstName", "lastName", "about", "skills"]);

        res.json({
            message: "Data fetched successfully",
            data: connectionRequests,
        });
    } catch (err) {
        res.status(400).send("Something went wrong: " + err.message);
    }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
    const loggedInUserId = req.user._id;

    try {
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUserId, status: "accepted" },
                { toUserId: loggedInUserId, status: "accepted" },
            ],
        })
            .populate("fromUserId", [
                "firstName",
                "lastName",
                "about",
                "skills",
            ])
            .populate("toUserId", ["firstName", "lastName", "about", "skills"]);

        const data = connectionRequests.map((row) => {
            // if (row.fromUserId._id.equals(loggedInUserId)) {
            if (row.fromUserId._id.toString() === loggedInUserId.toString()) {
                return row.toUserId;
            } else {
                return row.fromUserId;
            }
        });

        res.json({ data });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

module.exports = userRouter;
