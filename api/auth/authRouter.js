const router = require("express").Router();
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");
const randomConsts = require("../../config/randomConsts");

const db = require("../allModel/allModel");

router.post("/register", (req, res) => {
    const { username, password, userOrOperator } = req.body;

    //  hash user password
    const rounds = process.env.HASH_ROUNDS || 8;
    const hash = bcryptjs.hashSync(password, rounds);
    db.addUser({ username, password: hash, userOrOperator })
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((err) => res.send(err));
});

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    //  verify user password
    Users.findByUser({ username })
        .then(([user]) => {
            console.log(user);
            req.session.user = { user };
            if (user && bcryptjs.compareSync(password, user.password)) {
                const token = createToken(user);
                res.status(200).json({
                    user,
                    session: req.session,
                    token: token,
                });
            } else
                res.status(401).json({
                    Error:
                        "The username and password combination was not found in our database.",
                });
        })
        .catch((err) => {
            // console.log(err);
            res.status(500).json(err);
        });
});

router.get("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
                res.status(500).json({
                    Error: "Could not log out, please try again...",
                });
            } else res.status(204).end();
        });
    } else {
        req.status(204).end();
    }
});

function createToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        userType: user.userOrOperator,
    };
    const secret = consts.jwtSecret;
    const options = {
        expiresIn: "30m",
    };
    return jwt.sign(payload, secret, options);
}

module.exports = router;
