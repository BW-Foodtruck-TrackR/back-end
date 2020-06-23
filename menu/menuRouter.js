const express = require("express");
const router = express();
const db = require("./menuModel");
router.get("/", (req, res) => {
    return db.getMenuItems().then((food) => {
        console.log(food);
        res.status(200).json(food);
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
            console.log(err);
            res.status(500).json({ error: "Failed to get the menu item." });
        });
});
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db.findByMenuItemId(id)
        .then((scheme) => {
            if (scheme) {
                db.updateMenuItem(changes, req.params.id).then(
                    (updatedMenuItem) => {
                        res.json({
                            updatedMenuItem: `ID ${id}, is now known as '${changes}'`,
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
module.exports = router;
