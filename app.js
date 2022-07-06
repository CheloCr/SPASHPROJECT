//TODO importamos EXPRESS
const express = require("express")
const app = express()
//TODO importamos DOTENV
require('dotenv/config');
//TODO importamos HBS
const hbs =require("hbs")

//Public folder
app.use(express.static("public"))

// configuramos HBS
app.set("views",__dirname+"/views")
//hbs tempaltes
app.set("view engine", "hbs")
//partials
hbs.registerPartials(__dirname+"/views/partials")





// ----------------- RUTAS -----------------
 const index = require ("./routes/index")
 const partnerRoutes = require("./routes/partner.routes")
app.use("/partner", partnerRoutes)
 app.use("/",index)








//TODO levantamos servidor.
app.listen(process.env.PORT,()=>{
    console.log(`ENTRANDO A :  http://localhost:${process.env.PORT}`)
})