const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Merhaba!")
});

app.get("/login", (req, res) => {
    res.send("giris yapin")
});

let port = 3000;
app.listen(port)