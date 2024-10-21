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

// This will handle only GET requests to /user
app.get("/user", (req, res) => {
    res.send({ fname: "tushar", lname: "kamra" });
});

app.listen(port, () => {
    console.log(`Server listening to port ${port}`);
});
