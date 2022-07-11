//todo -------------- IMPORTACIONES DE LIBRERÍAS --------------
const express           = require("express")// importamos EXPRESS nos permite crear el servidor
const morgan            = require("morgan")//sete los requests en l terminal y nos permite ver errores en ellos.
const cookieParser      = require("cookie-parser"); //Se necesita para el uso de cookies  
const session           = require("express-session");
const MongoStore        = require("connect-mongo")
const MONGODB_URI       = require("../db/index.js")
const hbs               = require("hbs");
const path              = require("path");



//todo -------------- MIDDLEWARESS --------------

        module.exports = (app) => {
        console.log("EN LA SESSIOOOOOONS")



        //accedemos al req.body
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));// nos permite aceder a los datrs del formulario
        app.use(cookieParser());

        //configuramos el path para HBS
        app.set("views", path.join(__dirname, "..", "views"));
        app.set("view engine", "hbs");
        app.use(express.static(path.join(__dirname, "..", "public")));
        hbs.registerPartials(__dirname+"/views/partials") //partials

     //configuramos el SESSIONS

        //? a) Establecer seguridad ante servidores externos (Cloud)
        app.set("trust proxy",1) // Seguridad en Heroku

        //? b) Establecer la configuracion de la sesion
        app.use(session({
                    secret:process.env.SESSION_SECRET, // palabra secreta para coincidir en la sesion
                    resave:false,
                    saveUninitialized:false, // no inserta la cookie como visitante sino hasta que se inicia sesion
                        cookie: { //Archivo con datos del usuario
                            httpOnly: true, // Fevita ataques XSS

                        },
                            store: MongoStore.create({
                                mongoUrl:MONGODB_URI,
                            }),
            })  
        )   
}
