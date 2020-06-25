const router = require("express").Router();
const tokenRequired = require("../auth/tokenRequired");

const Trucks = require("./trucksModel");

router.get("/", (req, res) => {
    return Trucks.getTrucks().then((truckeroos) => {
        console.log(truckeroos);
        res.status(200).json(truckeroos);
    });
});
router.get("/ratings", tokenRequired, (req, res) => {
    Trucks.getRatings()
        .then((truckRatings) => {
            console.log(truckRatings);
            res.status(200).json(truckRatings);
        })
        .catch((err) => {
            console.log(err);
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
            console.log(err);
            res.status(500).json({ error: "Failed to get the truck." });
        });
});
router.post("/", tokenRequired, (req, res) => {
    return Trucks.addTruck(req.body)
        .then((newTruck) => {
            console.log(newTruck);
            if (newTruck) {
                res.status(201).json(newTruck);
            } else {
                res.status(500).json({
                    error:
                        "Failed to create new truck. Truck name is already in use.",
                });
            }
        })
        .catch((err) => {
            res.status(500).json({ message: "Failed to create new truck" });
        });
});

router.put("/:id", tokenRequired, (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    console.log(id, changes);
    Trucks.findByTruckId(id)
        .then((truck) => {
            console.log("found truck", truck);
            if (truck) {
                console.log("id and changes:", id, changes);
                Trucks.updateTruck(changes, id).then((updatedTruck) => {
                    res.json({
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

    Trucks.removeTruck(id)
        .then((delitem) => {
            console.log(delitem);
            if (delitem > 0) {
                res.status(200).json({ Deleted: `${delitem} item deleted` });
            } else if (delitem === 0)
                res.status(404).json({ error: "Item is not in database" });
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;
