//todo -------------- IMPORTACIONES --------------
// Para manejar las rutas necesitamos importar Express.
const router            = require("express").Router();

// Importamos los "Controlles" los cuales contienen toda la funcionalidad de la ruta.
const usersController   = require("./../controllers/usersController")


// Importamos las sesiones
const isLoggedOut = require("./../middlewares/isLoggedOut");
const isLoggedIn = require("./../middlewares/isLoggedin");       


// TODO --------------------PROFILE--------------------

// http://localhost:3000/users/profile/:id
router.get("/profile/:id", isLoggedIn ,usersController.viewProfile)



// TODO --------------------EDIT--------------------
router.get = ("/edit/:id", usersController.viewEditProfile)
router.post = ("/edit/:id", usersController.postEditProfile)







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