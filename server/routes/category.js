const express = require("express");
const router = new express.Router();
const db = require("../config/db")
const image_upload = require("../middlewares/imageupload");
const auth = require("../middlewares/auth")



router.post("/category", image_upload.single('image'), async (req, res) => {
    const title = req.body.name;
    const image = req.file.filename;

    let sqlInsert = "INSERT INTO category (category_name, image) VALUES (?, ?)";

    db.query(sqlInsert,[title, image], (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result)
        }
        res.send("Category created");
    });

});

router.post("/category/service", (req, res) => {
    const category_id = req.body.category_id;
    const service_id = req.body.service_id;
    const post = [category_id, service_id]

    let sqlInsert = "INSERT INTO category_service (category_id, service_id) VALUES (?, ?)";

    db.query(sqlInsert,post, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result)
        }
        res.send("Category created");
    });

});


router.get("/category", (req, res) => {

    let sqlGet = "SELECT c.*, s.* FROM category c INNER JOIN category_service cs ON cs.category_id = c.category_id INNER JOIN services s ON s.id = cs.service_id";

    db.query(sqlGet, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result)
        }
        res.status(201).json({message: "Category Data", result});
    });

});

router.delete("/category/:id",auth.verifyadmin, (req, res) => {
    const { id } = req.params;

    let sqlDelete = "DELETE FROM category WHERE id = ?";

    db.query(sqlDelete, id, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result)
        }
        res.status(201).json({message: "Category deleted", result});
    });

});

router.put("/category/:id", auth.verifyadmin, image_upload.single('image'), (req, res) => {
    const { id } = req.params;
    const title = req.body.title;
    const image = req.file.filename;

    let sqlUpdate = "UPDATE category SET title = ?, image = ? WHERE id = ?";

    db.query(sqlUpdate, [title, image, id], (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result)
        }
        res.status(201).json({message: "Category updated", result});
    });

});

module.exports = router;