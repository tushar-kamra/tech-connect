const express = require("express");

const app = express();
const port = 2000;

app.listen(port, () => {
    console.log(`Server listening to port ${port}`);
});
