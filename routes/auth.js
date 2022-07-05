const router = require("express").Router();
const User   = require("../models/User.model")
const bcryptjs = require("bcryptjs")


//TODO ---------------- SINGUP  ----------------

//1.- Creamos un usuario
// renderizamos formulario SIGNUP (signup.hbs)
router.get("/register",(req,res,next)=>{
    res.render("auth/signup")
})

// Permite crear un registro y mandar los datos del FORM a la BD
router.post("/register", (req,res,next)=>{
	const {role, ...restUser} = req.body
	const salt = bcryptjs.genSaltSync(10)
	const passHashed = bcryptjs.hashSync(restUser.password,salt)

	User.create({...restUser, password:passHashed})
	.then(newUser => {
		res.redirect(`/user/profile/${newUser.id}`)
		console.log(newUser)
	})
	.catch(err => next(err))


})


//TODO ---------------- LOGIN  ----------------

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
		res.render("user/profile",user)
        // res.redirect(`/user/profile/${user._id}`)

		
	})
	.catch(error=>{
        const errorMessage = ["Intentalo mas tarde"]
        return res.render("auth/login",{errorMessage,isSignUp:true})
    })






})



module.exports = router;


//User: Emma
//Email:test4@gmail.com
//Psswd: hola

//User: Chelito
//Email:xchellong18@gmail.com
//Psswd: 1234