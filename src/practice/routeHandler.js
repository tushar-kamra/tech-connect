const express = require("express");
const app = express();
const port = 2000;

// this will match all the HTTP method API calls to /test/*
app.use("/test", (req, res) => {
    res.send("test page");
});

// app.use("/hello", (req, res) => {
//     res.send("hello page");
// });

// app.use("/", (req, res) => {
//     res.send("Homepage");
// });

// app.use("/user", (req, res, next) => {
//     // res.send("user page");
//     next();
// });

// This will handle only GET requests to /user
app.get("/user", (req, res) => {
    console.log(req.query);
    res.send({ fname: "tushar", lname: "kamra" });
});

// This will handle only POST requests to /user
app.post("/user", (req, res) => {
    res.send("POST req successful");
});

// dynamic routes
app.get("/user/:userId", (req, res) => {
    console.log(req.params);
});

app.use(
    "/user",
    (req, res, next) => {
        next();
        console.log("route handler 1");
        // res.send("response 1");
    },
    (req, res, next) => {
        console.log("route handler 2");
        // res.send("response 2");
        next();
    }
);

app.listen(port, () => {
    console.log(`Server listening to port ${port}`);
});

/**
 * Admin authorization middleware - 1
 */
app.use("/admin", (req, res, next) => {
    const token = "xyz";
    const isAdminAuthorized = token === "xysz";
    if (isAdminAuthorized) {
        next();
    } else {
        res.status(401).send("Unauthorized request");
    }
});

app.use("/admin/deleteUser", (req, res) => {
    res.send("User deleted");
});

app.use("/admin/addUser", (req, res) => {
    res.send("User added");
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
