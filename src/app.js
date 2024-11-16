const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const port = 2000;

connectDB().then(() => {
    console.log("db connected successfully!");
    app.listen(port, () => {
        console.log("server connected");
    });
});

app.post("/signup", express.json(), async (req, res) => {
    console.log(req.body);
    res.send("api success");
    return;
    const user = new User({
        firstName: "M",
        lastName: "K",
        email: "mk@techconnect.com",
        password: 123456,
        age: 27,
        city: "Delhi",
        gender: "Male",
    });

    try {
        await user.save();
        res.send("User created successfully!");
    } catch (err) {
        res.status(400).send("Error creating user: " + err.message);
    }
});
