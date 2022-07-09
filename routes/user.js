//todo -------------- IMPORTACIONES --------------
// Para manejar las rutas necesitamos importar Express.
const router            = require("express").Router();

// Importamos los "Controlles" los cuales contienen toda la funcionalidad de la ruta.
const usersController   = require("./../controllers/usersController")

const routeGuard        = require("./../middlewares/route-guard")        

//todo -------------- RUTEO --------------

// http://localhost:3000/users/profile
router.get("/profile", routeGuard.loggedUser ,usersController.viewProfile)











// router.get("/profile/:id",(req,res,next)=>{
//     const {id} = req.params
//     User.findById(id)
//     .then(user=>{res.render("user/profile",user)
//     console.log("DENTRO DE PROFILE")
// })
    
//     .catch(err =>{console.log('error',err)
//     next()})
// })



module.exports = router;