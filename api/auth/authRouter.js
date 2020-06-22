const router = require("express").Router();
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");
const randomConsts = require("../../config/randomConsts");

const db = require("../allModel/allModel");

function isValid(user) {
    return Boolean(
        user.username && user.password && typeof user.password === "string"
    );
}

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

    if (isValid(req.body)) {
        db.findByUser({ username: username })
            .then(([user]) => {
                // compare the password the hash stored in the database
                console.log(user);
                if (user && bcryptjs.compareSync(password, user.password)) {
                    const token = createToken(user);

                    res.status(200).json({
                        token,
                        message: "Welcome to our API",
                        session: req.session,
                        user: user,
                    });
                } else {
                    res.status(401).json({ message: "Invalid credentials" });
                }
            })
            .catch((error) => {
                res.status(500).json({ message: error.message });
            });
    } else {
        res.status(400).json({
            message:
                "please provide username and password and the password shoud be alphanumeric",
        });
    }
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
    const secret = randomConsts.jwtSecret;
    const options = {
        expiresIn: "30m",
    };
    return jwt.sign(payload, secret, options);
}

module.exports = router;
