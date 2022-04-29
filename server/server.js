require("dotenv").config();
const express = require("express");
const app = express();
const category_route = require("./routes/category")
const admin_route = require("./routes/admin")
const service_enquiry = require("./routes/serviceEnquiry")
const service = require("./routes/service")
const customer = require("./routes/customer")
const cors = require("cors");
const path = require("path");
var bodyParser = require('body-parser');


app.use(express.json());
app.use(cors());


const imageDir = path.join(__dirname,"images");

//Importing bodyParser
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(express.static(imageDir));

app.use((err, req, res, next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);

    res.status(500).json({
        message: "Something went wrong"
    })

})

app.use(category_route);
app.use(admin_route);
app.use(service_enquiry);
app.use(service);
app.use(customer);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));