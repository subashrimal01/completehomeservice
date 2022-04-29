const express = require("express");
const router = new express.Router();
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth")
require("dotenv").config();


router.post("/admin", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    let sqlInsert = "INSERT INTO admin_user (name, email, password) VALUES (?, ?, ?)";

    db.query(sqlInsert, [name, email, hashedPassword], (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result)
        }
        res.send("Admin created");
    });

});

router.post('/admin/login', async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) return res.json({ status: "error", error: "Please enter your email and password" });
    else {
        let sqlFind = "SELECT * FROM admin_user WHERE email = ?";
        db.query(sqlFind, [email], async (err, result) => {
            if (err) throw err
            if (!result.length || !await bcrypt.compare(password, result[0].password)) return res.json({ status: "error", error: "Incorrect email or password" })
            else {
                const token = jwt.sign({ id: result[0].id }, process.env.SECRET_TOKEN_KEY);
                const admin = result[0].name
                const email = result[0].email
                res.status(200).json({ token: token, admin: admin, email: email, message: "Auth successs!" })
            }
        })
    }
})


router.get("/admin", auth.verifyadmin, (req, res) => {

    let sqlGet = "SELECT * FROM admin_user";

    db.query(sqlGet, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result)
        }
        res.status(201).json({ message: "Admin Data", result });
    });

});

router.delete("/admin/:id", auth.verifyadmin, (req, res) => {
    const { id } = req.params;

    let sqlDelete = "DELETE FROM admin_user WHERE id = ?";

    db.query(sqlDelete, id, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result)
        }
        res.status(201).json({ message: "Admin deleted", result });
    });

});

router.put("/admin/:id", auth.verifyadmin, (req, res) => {
    const { id } = req.params;
    const name = req.body.name;
    const email = req.body.email;

    let sqlUpdate = "UPDATE admin_user SET name = ?, email = ? WHERE id = ?";

    db.query(sqlUpdate, [name, email, id], (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result)
        }
        res.status(201).json({ message: "Admin updated", result });
    });

});

module.exports = router;