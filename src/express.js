const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Merhaba!")
});

app.get("/login", (req, res) => {
    res.send("giris yapin")
});

app.listen(port)