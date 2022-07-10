// ESTA RUTA ESTA RELACIONADA UNICAMENTE CON EL REGISTRO

//todo -------------- IMPORTACIONES --------------
// Para manejar las rutas necesitamos importar Express.
const router = require("express").Router();

// Importamos los "Controlles" los cuales contienen toda la funcionalidad de la ruta.
const authController = require("./../controllers/authController")

// ----------------- CREACION DE USUARIO -----------------

//mostramos formulario
// http://localhost:3000/auth/signup
router.get("/signup",authController.viewSignup)



// manejo de formulario
// recibe de: http://localhost:3000/auth/signup -------> GET/POST LIGIN
router.post("/signup",authController.signup)




// ----------------- INICIAR SESION -----------------
//mostramos formulario
// http://localhost:3000/auth/signup
router.get("/login",authController.viewLogin)
// manejo de formulario
router.post("/login",authController.login)


// ----------------- PERFIL DE USUARIO -----------------
router.get("/user/profile/:id",authController.viewProfile)




// ----------------- CERRAR SESION -----------------
router.post("/logout",authController.logout)


module.exports = router


