const express = require("express");
const server = express();

server.use(express.json());

server.get("/", async (req, res) => {
    res.status(200).json({
        Message:
            "Congrats on loading up the home slash of the server. If you are a developer, you may be looking for /api/login",
    });
});

module.exports = server;
