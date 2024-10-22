const express = require("express");

const app = express();
const port = 2000;

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
