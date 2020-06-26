const express = require("express");
const router = express();
const tokenRequired = require("../auth/tokenRequired");
const db = require("./usersModel");

router.get("/", tokenRequired, (req, res) => {
    return db.getUsers().then((users) => {
        res.status(200).json(users);
    });
});
router.get("/favTrucks", tokenRequired, (req, res) => {
    return db.getFavoriteTrucks().then((users) => {
        res.status(200).json(users);
    });
});
router.get("/ownedTrucks", (req, res) => {
    return db
        .getOwnedTrucks()
        .then((trucks) => {
            res.status(200).json(trucks);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

router.get("/operator", tokenRequired, (req, res) => {
    return db.getOperators().then((users) => {
        res.status(200).json(users);
    });
});
router.get("/users", tokenRequired, (req, res) => {
    return db.getConsumers().then((users) => {
        res.status(200).json(users);
    });
});
router.get("/:id/ownedTrucks", tokenRequired, (req, res) => {
    const id = req.params.id;
    return db
        .getOperatorsOwnedTrucks(id)
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});
router.get("/:id/favTrucks", tokenRequired, (req, res) => {
    const id = req.params.id;
    return db
        .getUsersFavoriteTrucks(id)
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

router.get("/:id", tokenRequired, (req, res) => {
    const id = req.params.id;
    return db
        .findByUserId(id)
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});
module.exports = router;
