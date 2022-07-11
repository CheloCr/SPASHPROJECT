// ESTA RUTA ESTA RELACIONADA UNICAMENTE CON EL REGISTRO

//todo -------------- IMPORTACIONES --------------
// Para manejar las rutas necesitamos importar Express.
const router = require("express").Router();

// Importamos los "Controlles" los cuales contienen toda la funcionalidad de la ruta.
const authController = require("./../controllers/authController")


// Importamos las sesiones
const isLoggedOut = require("./../middlewares/isLoggedOut");
const isLoggedIn = require("./../middlewares/isLoggedin");


//todo ----------------- CREACION DE USUARIO -----------------

//mostramos formulario
// http://localhost:3000/auth/signup
router.get("/signup",isLoggedOut,authController.viewSignup)



// manejo de formulario
// recibe de: http://localhost:3000/auth/signup -------> GET/POST LIGIN
router.post("/signup",isLoggedOut,authController.signup)




//todo ----------------- INICIAR SESION -----------------
//mostramos formulario
// http://localhost:3000/auth/signup
router.get("/login",isLoggedOut,authController.viewLogin)
// manejo de formulario
router.post("/login",isLoggedOut,authController.login)


//todo ----------------- PERFIL DE USUARIO -----------------
router.get("/user/profile/:id",isLoggedIn,authController.viewProfile)





//todo ----------------- CERRAR SESION -----------------
router.post("/logout",isLoggedOut,authController.logout)


module.exports = router


