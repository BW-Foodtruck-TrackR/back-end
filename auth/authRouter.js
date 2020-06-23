const router = require("express").Router();
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");
const randomConsts = require("../config/randomConsts");

const db = require("../allModel/allModel");

function isValid(user) {
    return Boolean(
        user.email && user.password && typeof user.password === "string"
    );
}

router.post("/register", (req, res) => {
    const { username, password, userType, email } = req.body;

    //  hash user password
    const rounds = process.env.HASH_ROUNDS || 8;
    const hash = bcryptjs.hashSync(password, rounds);
    db.addUser({ username, password: hash, userType, email })
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((err) => res.status(500).json({ error: err.detail, err }));
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    if (isValid(req.body)) {
        db.findByUser(email)
            .then(([user]) => {
                // compare the password the hash stored in the database
                if (user && bcryptjs.compareSync(password, user.password)) {
                    const token = createToken(user);

                    res.status(200).json({
                        message: "Welcome to our API",
                        user: user,
                        session: req.session,
                        token,
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
            message: "please provide username and password.",
        });
    }
});

router.get("/logout", (req, res) => {
    if (req.session) {
        cookie = {};
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
        userType: user.userType,
    };
    const secret = randomConsts.jwtSecret;
    const options = {
        expiresIn: "30m",
    };
    return jwt.sign(payload, secret, options);
}

module.exports = router;
