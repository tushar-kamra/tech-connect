const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUp } = require("./utils/validation");
const app = express();
const port = 2000;

connectDB().then(() => {
    console.log("db connected successfully!");
    app.listen(port, () => {
        console.log("server connected");
    });
});

app.use(express.json());

app.post("/signup", express.json(), async (req, res) => {
    const user = new User(req.body);

    try {
        validateSignUp(req);
        await user.save();
        res.send("User created successfully!");
    } catch (err) {
        res.status(400).send("Error creating user: " + err.message);
    }
});

// get user by email
app.get("/user", async (req, res) => {
    const email = req?.body?.email;

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            res.status(404).send("User not found");
        } else {
            res.send(user);
        }
    } catch (err) {
        console.log(err);
        res.status(400).send("Something went wrong");
    }
});

// feed API - GET /feed - get all the users
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        if (users.length === 0) {
            res.status(404).send("User not found");
        } else {
            res.send(users);
        }
    } catch (err) {
        console.log(err);
        res.status(400).send("Something went wrong");
    }
});

// delete a user
app.delete("/user", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.body.userId);
        console.log(user);
        res.send("User deleted");
    } catch (err) {
        console.log(err);
        res.status(400).send("Something went wrong");
    }
});

// update a user
app.patch("/user/:userId", async (req, res) => {
    const data = req.body;
    const userId = req.params?.userId;

    try {
        const ALLOWED_UPDATES = ["about", "gender", "age", "skills"];

        const isUpdateAllowed = Object.keys(data).every((key) =>
            ALLOWED_UPDATES.includes(key)
        );
        console.log(isUpdateAllowed);
        if (!isUpdateAllowed) {
            throw new Error("Update not allowed");
        }

        const user = await User.findOneAndUpdate({ _id: userId }, data, {
            returnedDocument: "after",
            runValidators: true,
        });
        console.log(user);
        res.send("User updated");
    } catch (err) {
        res.status(400).send("Something went wrong: " + err.message);
    }
});
