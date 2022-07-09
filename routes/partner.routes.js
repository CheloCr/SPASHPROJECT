const router = require("express").Router();
const Partner = require("../models/Partner.model");
const bcryptjs = require("bcryptjs");

/* 
create
signup : get, post{redirect}


*/
// TODO --------------------SIGNUP--------------------
router.get("/signup", (req, res, next) => {
    res.render("partner/signup");
})
router.post("/signup", (req, res, next) => {
    const {_id} = req.params
    const {role, ...restPartner } = req.body;
    const salt = bcryptjs.genSaltSync(10);
    const newPassword = bcryptjs.hashSync(restPartner.password, salt);

    Partner.create({...restPartner, password: newPassword})
        .then(partner => {
        
            res.redirect(`/partner/profile/${partner._id}`)
            console.log("partner created", partner);
        })
        .catch(err => next(err))
})


// TODO --------------------LOGIN--------------------

router.get("/login", (req,res,next)=>{
	res.render("partner/login")
})


router.post("/login",(req,res,next)=>{
	const {email,password} = req.body
	console.log("EL RQUESTTTTT",req.body)
// Validacion de campos vacios
	// if(!password || !password.length || !username || !username.length){
    //     const errorMessage = ["Debes de llenar todos los campos"]
    //     return res.render("auth/login", {errorMessage})
    // }

	// Validacion de parametros en contraseña
	// if( !password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/) ){
    //     const errorMessage = ["La contraseña debe cumplir con los parametros"]
    //     return res.render("auth/login", {errorMessage})
    // }

	Partner.findOne({email})
	.then(partner => {

		// if(!user){
        //     const errorMessage = ["El correo o contraseña es incorrecto"]
        //     return res.render("auth/register",{errorMessage,isSignUp:true})
        // }
        // //verificar si la contraseña ya está registrada
        // if(!bcryptjs.compareSync(password,user.password)){
        //     const errorMessage = ["El correo o contraseña es incorrecto"]
        //     return res.render("auth/register",{errorMessage,isSignUp:true})
        // }

        //si todo lo anterior es correcto se manda a perfil

		console.log(partner)
		
        res.redirect(`/partner/profile/${partner._id}`)

		
	})
	.catch(error=>{
        const errorMessage = ["Intentalo mas tarde"]
        return res.render("partner/login",{errorMessage,isSignUp:true})
    })

})
// TODO --------------------PROFILE--------------------

router.get("/profile/:id",(req,res,next)=>{
    const {id} = req.params;
    Partner.findById(id)
    .then(partner => {
        res.render("partner/profile", partner)
    }).catch(error=>{
        next(error)
    })
})

// TODO --------------------READ--------------------
//! Listar todos los partners
router.get("/partners", (req, res, next) => {
    res.render("partner/partners-list");
})
// TODO --------------------READ--------------------

//! DASHBOARD
// router.get("/dashboard",(req,res,next)=>{
//     res.render("product/dashboard")
// })
router.get("/dashboard/:id", (req, res, next) => {
    const { id } = req.params;
    const { role, ...Product } = req.body
    Product.findById(id)
        .then(product => {
            res.render("partner/dashboard", product)
        })
        .catch(err => {
            console.log("error in post/dashboard", err);
            next()
        })


})

router.post("/dashboard/:id", (req, res, next) => {
const {id} = req.params;
const {role, ...restPartner } = req.body;

Partner.findById(id)
    .then(partner => {
        res.redirect(`/product/edit-product/${id}`)
    })
    .catch(error=>{
        console.log("error in post Dashboard", error)
        next()
    })
})


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
router.get("/edit/:id",(req,res,next)=>{
    const {id} = req.params
    Partner.findById(id)
    .then(partnerEdited => res.render("partner/edit-partner",{partner:partnerEdited}))
    .catch(err => next(err))
})
router.post("/edit/:id",(req,res,next)=>{
    const {id} = req.params
    const {role, ...partnerEdited} = req.body
    Partner.findByIdAndUpdate(id, partnerEdited, {Edit: true})
    .then(partnerEdited => res.redirect(`/partner/profile/${id}`))
    .catch(err => {
        console.log("Error in updating partner",err)
        next(err)
    })

})


// TODO --------------------DELETE--------------------
//! El super User puede eliminar provedores
router.get("/delete/:id",(req,res,next)=>{
    const {id} = req.params
    Partner.findByIdAndDelete(id)
    .then(()=> res.redirect("/partners-list"))
    .catch(err => next(err))
}) 


module.exports = router