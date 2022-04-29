const express = require("express");
const router = new express.Router();
const db = require("../config/db")
const image_upload = require("../middlewares/imageupload");
const auth = require("../middlewares/auth")


router.post("/service", image_upload.single('Simage'), function (req, res) {
    const title = req.body.Sname;
    const description = req.body.Sdescription;
    const image = req.file.filename;
    const price = req.body.Sprice;
    const post = [title, description, image, price]

    let sqlInsert = "INSERT INTO services (service_name, description, image, price) VALUES (?, ?, ?, ?)";

    db.query(sqlInsert,post, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result)
        }
        res.send("Service created");
    });

});


router.get("/service", (req, res) => {

    let sqlGet = "SELECT * FROM services";

    db.query(sqlGet, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result)
        }
        res.status(201).json({message: "Service Data", result});
    });

});

router.get("/service/:id", (req, res) => {
    const { id } = req.params;

    let sqlGet = "SELECT * FROM services where id = ?";

    db.query(sqlGet,[id], (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result)
        }
        res.status(201).json({message: "Service Data", result});
    });

});

router.delete("/service/:id", (req, res) => {
    const { id } = req.params;

    let sqlDelete = "DELETE FROM services WHERE id = ?";

    db.query(sqlDelete, id, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result)
        }
        res.status(201).json({message: "Service deleted", result});
    });

});

router.put("/service", (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;

    let sqlUpdate = "UPDATE services SET title = ?, description = ?, price = ? WHERE id = ?";

    db.query(sqlUpdate, [title, description, price, id], (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result)
        }
        res.status(201).json({message: "Service updated", result});
    });

});

module.exports = router;