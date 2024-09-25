const express = require("express");
const app = express();
const port = 2000;



// app.use((req, res, next) => {
//     res.send("Hello from the servers");
//     next();
// });

app.use("/", (req, res) => {
    res.send("Homepage");
});

app.use("/test", (req, res) => {
    res.send("test page");
});


app.listen(port, () => {
    console.log(`Server listening to port ${port}`);
});