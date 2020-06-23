const router = require("express").Router();

const trucks = require("./trucksModel");

router.get("/", (req, res) => {
    return trucks.getTrucks().then((truckeroos) => {
        console.log(truckeroos);
        res.status(200).json(truckeroos);
    });
});

router.post("/", (req, res) => {
    return trucks
        .addTruck(req.body)
        .then((newTruck) => {
            console.log(newTruck);
            res.status(201).json(newTruck);
        })
        .catch((err) => {
            res.status(500).json({ message: "Failed to create new scheme" });
        });
});

module.exports = router;
