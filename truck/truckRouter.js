const router = require("express").Router();
const tokenRequired = require("../auth/tokenRequired");

const Trucks = require("./trucksModel");

router.get("/", (req, res) => {
    return Trucks.getTrucks().then((truckeroos) => {
        res.status(200).json(truckeroos);
    });
});
router.get("/ratings", tokenRequired, (req, res) => {
    Trucks.getRatings()
        .then((truckRatings) => {
            res.status(200).json(truckRatings);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});
router.get("/:id", (req, res) => {
    return Trucks.findByTruckId(req.params.id)
        .then((truck) => {
            if (truck) {
                res.status(200).json(truck);
            } else {
                res.status(404).json({
                    message: "Could not find truck with given id.",
                });
            }
        })
        .catch((err) => {
            res.status(500).json({ error: "Failed to get the truck." });
        });
});
router.post("/", tokenRequired, (req, res) => {
    return Trucks.addTruck(req.body)
        .then((newTruck) => {
            if (
                !req.body.truckName ||
                !req.body.cuisineType ||
                !req.body.image
            ) {
                res.status(500).json({
                    error: "Failed to create new truck, missing form data.",
                    newTruck,
                });
            } else {
                res.status(201).json(newTruck);
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: "Failed to create new truck",
                err,
            });
        });
});

router.put("/:id", tokenRequired, (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    Trucks.findByTruckId(id)
        .then((truck) => {
            if (truck) {
                Trucks.updateTruck(changes, id).then((updatedTruck) => {
                    res.status(201).json({
                        UpdatedTruck: `ID ${id}, is now known as '${changes.truckName}'`,
                    });
                });
            } else {
                res.status(404).json({
                    message: "Could not find truck with given id",
                });
            }
        })
        .catch((err) => {
            res.status(500).json({ error: "Failed to update truck", err });
        });
});

router.delete("/:id", tokenRequired, (req, res) => {
    const { id } = req.params;
    Trucks.findByTruckId(id).then((truck) => {
        if (truck) {
            Trucks.removeTruck(id)
                .then((delitem) => {
                    res.status(202).json({
                        Deleted: `${delitem} item deleted`,
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        error:
                            "Could not establish a connection to the database to delete this item.",
                    });
                });
        } else {
            res.status(404).json({
                message: "Could not find truck with given id.",
            });
        }
    });
});

module.exports = router;
