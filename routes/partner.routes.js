const router = require("express").Router();
const Partner = require("../models/Partner.model");
const bcryptjs = require("bcryptjs");
const partnersAuthController = require("./../controllers/partnersAuthController")



/* 
create
signup : get, post{redirect}


*/
// TODO --------------------SIGNUP--------------------

router.get("/signup",partnersAuthController.viewSignup)


router.post("/signup", partnersAuthController.signup)


// TODO --------------------LOGIN--------------------
router.get("/login", partnersAuthController.viewLogin)

router.post("/login", partnersAuthController.login)

// TODO --------------------PROFILE--------------------
router.get("/profile/:id", partnersAuthController.viewProfile)


// TODO --------------------READ--------------------
//! Listar todos los partners
router.get("/partners", partnersAuthController.viewPartnersList)


// TODO --------------------DASHBOARD--------------------

router.get("/dashboard/:id", partnersAuthController.viewDashboard)

router.post("/dashboard/:id", partnersAuthController.postDashboard)


// TODO --------------------LOGOUT--------------------

// router.get("/logout", isLoggedIn, (req, res) => {
//     req.session.destroy((err) => {
//       if (err) {
//         return res
//           .status(500)
//           .render("auth/logout", { errorMessage: err.message });
//       }
//       res.redirect("/");
//     });
//   });

// TODO --------------------EDIT--------------------
router.get = ("/edit/:id", partnersAuthController.viewEditProfile)

router.post = ("/edit/:id", partnersAuthController.postEditProfile)


// TODO --------------------DELETE--------------------
//! El super User puede eliminar provedores

// router.get = ("/delete/:id", partnersAuthController.deletePartner)
// router.get("/delete/:id",(req,res,next)=>{
//     const {id} = req.params
//     Partner.findByIdAndDelete(id)
//     .then(()=> res.redirect("/partners-list"))
//     .catch(err => next(err))
// }) 


module.exports = router