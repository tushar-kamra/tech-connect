const express = require("express");
const app = express();
const port = 2000;

app.use("/test", (req, res) => {
    res.send("test page");
});

app.use("/hello", (req, res) => {
    res.send("hello page");
});

app.use("/", (req, res) => {
    res.send("Homepage");
});

app.listen(port, () => {
    console.log(`Server listening to port ${port}`);
});
