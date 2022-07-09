//todo -------------- GESTION DE CONFIGURACION ------------------
// Se configura y se setea el tiempo de expiracion para la sesion

//todo -------------- IMPORTAMOS------------------
const session       = require("express-session")
const MongoStore    = require("connect-mongo")


//todo -------------- GESTION DE SESION------------------

    

    module.exports = app => {
        console.log("EN LA SESSIOOOOOONS")

        // a) Establecer seguridad ante servidores externos (Cloud)
        app.set("trust proxy",1) // Seguridad en Heroku

            // b) Establecer la configuracion de la sesion
            app.use(session({
            secret:process.env.SESSION_SECRET, // palabra secreta para coincidir en la sesion
            resave:true,
            saveUninitialized:false, // no inserta la cookie como visitante sino hasta que se inicia sesion
                cookie: {
                    sameSite:process.env.NODE_ENV === "production" ? "none" : "lax",
                    secure: process.env.NODE_ENV === "production",
                    httpOnly:true,
                    maxAge:60000
        },
        }))
    }

    

    


