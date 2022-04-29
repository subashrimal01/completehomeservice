const express = require("express");
const router = new express.Router();
const db = require("../config/db");
const auth = require("../middlewares/auth")


router.post("/customer", auth.verifyadmin, async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;

    let sqlInsert = "INSERT INTO customer (name, email, phone, address) VALUES (?, ?, ?, ?)";

    db.query(sqlInsert, [name, email, phone, address], (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result)
        }
        res.send("Customer created");
    });

});


router.get("/customer", auth.verifyadmin, (req, res) => {

    let sqlGet = "SELECT * FROM customer";

    db.query(sqlGet, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result)
        }
        res.status(201).json({ message: "Customer Data", result });
    });

});

router.get("/customer/:id", (req, res) => {
    const { id } = req.params;

    let sqlGet = "SELECT * FROM customer where id = ?";

    db.query(sqlGet,[id], (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result)
        }
        res.status(201).json({message: "Service Data", result});
    });

});

router.delete("/customer/:id", auth.verifyadmin, (req, res) => {
    const { id } = req.params;

    let sqlDelete = "DELETE FROM customer WHERE id = ?";

    db.query(sqlDelete, id, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result)
        }
        res.status(201).json({ message: "Customer data deleted", result });
    });

});

router.put("/customer/:id", (req, res) => {
    const { id } = req.params;
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;

    let sqlUpdate = "UPDATE customer SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?";

    db.query(sqlUpdate, [name, email, phone, address, id], (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result)
        }
        res.status(201).json({ message: "Customer updated", result });
    });

});

module.exports = router;