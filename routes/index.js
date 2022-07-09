//todo -------------- IMPORTACIONES --------------
// Para manejar las rutas necesitamos importar Express.
const router = require("express").Router();


// Importamos los "Controlles" los cuales contienen toda la funcionalidad de la ruta.
const indexControllers = require("./../controllers/indexController")

// http://localhost:3000/
router.get("/",indexControllers.home)



module.exports = router;