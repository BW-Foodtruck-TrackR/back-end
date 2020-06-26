const express = require("express");
const router = express();
const db = require("./menuModel");
const tokenRequired = require("../auth/tokenRequired");

router.get("/", (req, res) => {
    return db.getMenuItems().then((food) => {
        res.status(200).json(food);
    });
});
router.get("/ratings", tokenRequired, (req, res) => {
    db.getRatings()
        .then((menuRatings) => {
            res.status(200).json(menuRatings);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});
router.get("/:id", (req, res) => {
    return db
        .findByMenuItemId(req.params.id)
        .then((menuItem) => {
            if (menuItem) {
                res.status(200).json(menuItem);
            } else {
                res.status(404).json({
                    message: "Could not find menuItem with given id.",
                });
            }
        })
        .catch((err) => {
            res.status(500).json({ error: "Failed to get the menu item." });
        });
});
router.put("/:id", tokenRequired, (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    db.findByMenuItemId(id)
        .then((scheme) => {
            if (scheme) {
                db.updateMenuItem(changes, req.params.id).then(
                    (updatedMenuItem) => {
                        res.status(201).json({
                            updatedMenuItem: `ID ${id}, is now known as '${changes.itemName}'`,
                        });
                    }
                );
            } else {
                res.status(404).json({
                    message: "Could not find menu item with given id",
                });
            }
        })
        .catch((err) => {
            res.status(500).json({ message: "Failed to update menu item" });
        });
});
router.delete("/:id", tokenRequired, (req, res) => {
    const { id } = req.params;

    db.removeMenuItem(id)
        .then((delitem) => {
            if (delitem > 0) {
                res.status(203).json({ Deleted: `${delitem} item deleted` });
            } else if (delitem === 0)
                res.status(404).json({ error: "Item is not in database" });
        })
        .catch((err) => {
            res.status(500).json({
                error: "Could not accomplish the connection to the database.",
            });
        });
});

module.exports = router;
