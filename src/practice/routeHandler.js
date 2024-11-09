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
