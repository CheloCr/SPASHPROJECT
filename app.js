//todo -------------- IMPORTACIONES DE LIBRERÍAS --------------
const express           = require("express")// importamos EXPRESS nos permite crear el servidor
const app               = express()
const hbs               = require("hbs")// importamos HBS





require('dotenv/config'); // importamos DOTENV
require("./db/index") // importamos conexion a DB





const morgan = require("morgan")





//todo -------------- MIDDLEWARES --------------
//----------------- SESSION MANAGER  -----------------
require("./cofig/session.js")(app)
//----------------- HBS  -----------------
app.use(express.static("public")) //Public folder: configuramos que public sea estatica
app.set("views",__dirname+"/views") // configuramos HBS

app.set("view engine", "hbs") //hbs tempaltes
hbs.registerPartials(__dirname+"/views/partials") //partials

//----------------- MANEJO DE FORMULARIOS  -----------------
app.use(express.urlencoded({ extended: true }));// nos permite aceder a los datrs del formulario

app.use(morgan("dev"))




//TODO----------------- RUTAS -----------------
 const partnerRoutes = require("./routes/partner.routes")
 const productRoutes = require("./routes/product.routes")
app.use("/partner", partnerRoutes)
app.use("/product", productRoutes)
 app.use("/",require ("./routes/auth"))
 app.use("/user",require ("./routes/user"))









//todo -------------- LEVANTAMOS SERVIDOR --------------
app.listen(process.env.PORT,()=>{
    console.log(`CORRIENDO EN EL PUERTO :  http://localhost:${process.env.PORT}`)
})