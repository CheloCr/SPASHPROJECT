//todo -------------- IMPORTAMOS LIBRERIAS --------------
const express   = require("express")// importamos EXPRESS nos permite crear el servidor
const hbs       = require("hbs")// importamos HBS
require('dotenv/config'); // importamos DOTENV
const cookieParser = require("cookie-parser");
const morgan = require("morgan")
//const passport  = require("passport")
// const session = require("express-session")







//todo -------------- INIT EXPRESS --------------
const app = express()
require("./db")// conectamos a BD
// require("./passport/local-auth")


//todo -------------- MIDDLEWARES --------------
app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));// nos permite aceder a los datrs del formulario
app.use(cookieParser());
// app.use(session ({
//     secret: process.env.SESSION_SECRET,
//     resave:true,
//     saveUninitialized:false

// }))
// app.use(passport.initialize()) // inicializamos passport
// app.use(passport.session()) // lo almacenamos en sesiones



//todo -------------- SETUP --------------
//Public folder: configuramos que public sea estatica
app.use(express.static("public"))
// configuramos HBS
app.set("views",__dirname+"/views")
//hbs tempaltes
app.set("view engine", "hbs")
//partials
hbs.registerPartials(__dirname+"/views/partials")





//TODO----------------- RUTAS -----------------
 const partnerRoutes = require("./routes/partner.routes")
 const productRoutes = require("./routes/product.routes")
app.use("/partner", partnerRoutes)
app.use("/product", productRoutes)
 app.use("/",require ("./routes/auth"))
 app.use("/user",require ("./routes/user"))








//todo -------------- LEVANTAMOS SERVIDOR --------------
app.listen(process.env.PORT,()=>{
    console.log(`ENTRANDO A :  http://localhost:${process.env.PORT}`)
})