const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const KnexSessionsStore = require("connect-session-knex")(session);
const server = express();

const dbConnection = require("../data/connection");
const usersRouter = require("../users/usersRouter");
const authRouter = require("../auth/authRouter.js");
const sessionConfig = {
    name: "monster",
    secret: process.env.SESSION_SECRET || "keep it secret, keep it safe!",
    cookie: {
        maxAge: 1000 * 600,
        secure: process.env.COOKIE_SECURE || false, //  true means only use over https //  true in production
        httpOnly: true, //JS code on the client cannot access the session cookie
    }, // 10 min in milliseconds
    resave: false,
    saveUninitialiezed: false, //  GDPR compliance
    store: new KnexSessionsStore({
        knex: dbConnection,
        sidfieldname: "sid",
        createtable: true,
        clearInterval: 6000, //  delete expired sessions - in milliseconds
    }),
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
    res.status(200).json({
        Message:
            "Congrats on loading up the home slash of the server. If you are a developer, you may be looking for /api/login",
    });
});

module.exports = server;
