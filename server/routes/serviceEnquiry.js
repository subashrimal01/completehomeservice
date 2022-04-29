const express = require("express");
const { add } = require("nodemon/lib/rules");
const router = new express.Router();
const db = require("../config/db");
const auth = require("../middlewares/auth")


router.post("/service/enquiry", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;
    const serviceID = req.body.serviceID;
    const serviceRemark = req.body.serviceRemark;
    
    let sqlInsert = "INSERT INTO service_enquiry (customer_name, customer_email, customer_number, customer_address, service_id, service_remark) VALUES (?, ?, ?, ?, ?, ?)";

    db.query(sqlInsert, [name, email, phone, address, serviceID, serviceRemark, Date.now()], (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result)
        }
        res.send("Service Enquiry created");
    });

});


router.get("/service/enquiry", (req, res) => {

    let sqlGet = "SELECT s.*, se.* FROM services s INNER JOIN service_enquiry se ON se.service_id = s.id";

    db.query(sqlGet, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result)
        }
        res.status(201).json({ message: "Service Enquiry Data", result });
    });

});

router.get("/service/enquiry/day", (req, res) => {

    let sqlGet = "SELECT * FROM service_enquiry WHERE date BETWEEN now()-1 AND date";

    db.query(sqlGet, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result)
        }
        res.status(201).json({ message: "Service Enquiry Data", result });
    });

});

router.delete("/service/enquiry/:id", auth.verifyadmin, (req, res) => {
    const { id } = req.params;

    let sqlDelete = "DELETE FROM service_enquiry WHERE id = ?";

    db.query(sqlDelete, id, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result)
        }
        res.status(201).json({ message: "Service Enquiry deleted", result });
    });

});

router.get("/service/enquiry/single", (req, res) => {
    const id = req.body.id;
    console.log(id)

    let sqlFetch = "SELECT * FROM service_enquiry where id = ?";

    db.query(sqlFetch, [id], (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result)
        }
        res.status(201).json({ message: "Service Enquiry data", result });
    });

});

router.put("/service/enquiry/:id", (req, res) => {
    const { id } = req.params;
    const status = req.body.status;

    let sqlUpdate = "UPDATE service_enquiry SET status = ? WHERE id = ?";

    db.query(sqlUpdate, [status, id], (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result)
        }
        res.status(201).json({ message: "Service Enquiry updated", result });
    });

});

module.exports = router;