const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");

const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
    res.status(200).json({
        Message:
            "Congrats on loading up the home slash of the server. If you are a developer, you may be looking for /api/trucks",
    });
});

module.exports = server;
