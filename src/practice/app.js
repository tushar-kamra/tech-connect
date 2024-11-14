const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();
const port = 2000;

app.use("/", (req, res, next) => {
    // res.send("homepage");
    next();
});

app.use("/test", (req, res, next) => {});

app.use("/user", userAuth, (req, res) => {
    res.send("User data sent");
});

app.use("/admin", adminAuth);

app.use("/admin/deleteUser", (req, res) => {
    res.send("User deleted");
});

app.use("/admin/addUser", (req, res) => {
    res.send("User added");
});

app.listen(port, () => {
    console.log(`Server listening to port ${port}`);
});
