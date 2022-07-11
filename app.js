require('dotenv/config'); // importamos DOTENV
require("./db") // importamos conexion a DB



const express = require("express");
const hbs = require("hbs");
const app = express();

require("./config")(app);




//TODO----------------- RUTAS ----------------- 
app.use("/",require("./routes/index"))

app.use("/auth",require ("./routes/auth"))//  http://localhost:3000/auth
app.use("/user",require ("./routes/user"))


app.use("/partner", require("./routes/partner.routes"))
app.use("/product", require("./routes/product.routes"))





//todo -------------- LEVANTAMOS SERVIDOR --------------
app.listen(process.env.PORT,()=>{
    console.log(`CORRIENDO EN EL PUERTO :  http://localhost:${process.env.PORT}`)
})








module.exports = app;