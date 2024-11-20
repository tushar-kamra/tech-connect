const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        const { "jwt-token": jwtToken } = req.cookies;
        if (!jwtToken) {
            throw new Error("Invalid jwt");
        }

        const payload = jwt.verify(jwtToken, "TechConnect@1234");
        console.log(payload);
        const { _id } = payload;

        const user = await User.findById(_id);
        if (!user) {
            throw new Error("Invalid user");
        }

        req.user = user;

        next();
    } catch (err) {
        res.status(401).send("Unauthorized request: " + err.message);
    }
};

module.exports = {
    userAuth,
};
