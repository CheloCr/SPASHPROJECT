const router = require("express").Router();
const Partner = require("../models/Partner.model");
const bcriptjs = require("bcriptjs");
/* 
create
signup : get, post{redirect}


*/
// TODO --------------------SIGNUP--------------------
router.get("/signup", (req, res, next) => {
    res.render("signup");
})
router.post("/signup", (req, res, next) => {
    const { role, ...restPartner } = req.body;
    const salt = bcriptjs.genSaltSync(10);
    const newPassword = bcriptjs.hashSync(restPartner.password, salt);

    Partner.create({...restPartner, password: newPassword})
        .then(partner => {
            res.render("partner/profile", { partner });
            console.log("partner created", partner);
        })
        .catch(err => next(err))
})


// TODO --------------------LOGIN--------------------

router.get("/login", (req,res,next)=>{
	res.render("auth/login")
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

	User.findOne({email})
	.then(user => {

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

		console.log(user)
		
        res.redirect(`/user/profile/${user._id}`)

		
	})
	.catch(error=>{
        const errorMessage = ["Intentalo mas tarde"]
        return res.render("auth/login",{errorMessage,isSignUp:true})
    })

})

// TODO --------------------READ--------------------
//! Listar todos los partners
router.get("/partners", (req, res, next) => {
    res.render("partner/partners-list");
})
// TODO --------------------PROFILE--------------------

router.get("/:id",(req,res,next)=>{
    Partner.findById(id)
    .then(partner => {
        res.render("partner/profile",{partner})
    }).catch(error=>{
        next(error)
    })
})


// TODO --------------------LOGOUT--------------------



// TODO --------------------EDIT--------------------
router.get("/edit/:id",(req,res,next)=>{
    const {id} = req.params
    Partner.findById(id)
    .then(partner => res.render("partner/edit-partner",{partner}))
    .catch(err => next(err))
})
router.post("/edit/:id",(req,res,next)=>{
    const {id} = req.params
    const {role, ...restPartner} = req.body
    Partner.findByIdAndUpdate(id,restPartner, {new:true})
    .then(partner => res.redirect(`/profile/${partner._id}`))
    .catch(err => next(err))
})
// TODO --------------------DELETE--------------------
router.get("/delete/:id",(req,res,next)=>{
    const {id} = req.params
    Partner.findByIdAndDelete(id)
    .then(()=> res.redirect("/partners-list"))
    .catch(err => next(err))
}) 


module.exports = router