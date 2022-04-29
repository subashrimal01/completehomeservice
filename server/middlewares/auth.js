const jwt=require('jsonwebtoken');
const db = require("../config/db")
require("dotenv").config();

// for admin varification 

module.exports.verifyadmin=function(req,res,next){
    try{
        const token= req.headers.authorization.split(" ")[1];
        const data=jwt.verify(token, process.env.SECRET_TOKEN_KEY);

        let sqlFind = "SELECT * FROM admin_user WHERE id = ?";
        db.query(sqlFind, [data.id], async (err, result) => {
            if(err){
                res.json({err: "Error"})
            }
            req.userData=result;
            next()
        })
    }
    catch(error){
        res.json({error: "Not Allowed"})
    }
}