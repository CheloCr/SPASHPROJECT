//todo -------------- IMPORTACIONES --------------
const bcryptjs = require("bcryptjs")
const User = require("./../models/User.model")

// renderiza form de sign up
exports.viewSignup = (req,res,next) => {
    res.render("auth/signup")
}

exports.signup = (req,res,next) => {

    //1.- Obtenemos los datos del formulario
    const {email,password,username,...resUser} = req.body

    console.log("EL REQ BODYYYY",req.body)


     //==============> VALIDACIONES
    //  A) Campos vacios
    if(!password || !password.length || !username || !username.length){
        res.render("auth/signup", {
            errorMessage:"Por favor llena todos los campos"
        })
        return
    }
    
    //  B) Fortalecimiento del Password
    // const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
    // if(!regex.test(restUser.password)){
		
	// 	res.render("auth/signup", {
	// 		errorMessage: "Tu password debe contener mínimo 6 caracteres, un número y una mayúscula."
	// 	})		

	// 	return
	// }

    User.findOne({email})
        //? si ya existe un email redirecciona a signup
    .then((foundUser) => {
        if(foundUser) {
            res.render("auth/signup", {
                errorMessage:"Usuario ya existente"
            })
            return
        }
        //? si no existe el usuario crear uno Nuevo con psswd Encriptado 
         const salt = bcryptjs.genSaltSync(10)
         const encryptedPassword = bcryptjs.hashSync(password,salt)
         console.log("PASSENCRIPTADO",encryptedPassword)

         User.create({
            username,
            email
         })
         .then(newUser =>{
            res.redirect("/auth/login")
         })
    })


   

    
    // //2.- Encriptamos password
    // const salt = bcryptjs.genSaltSync(10)
    // const encryptedPassword = bcryptjs.hashSync(restUser.password,salt)

    // console.log("PASSENCRIPTADO",encryptedPassword)

    // //3.- Creamos usuario nuevo
    // const newUser = User.create({...restUser,password:encryptedPassword})
    // .then(user => {
    //     //redirigimos a la lista de proveedores
    //     res.redirect(`user/userProfile/${user._id}`) //! Esto debe de deireccionar al get/post de Dashoboard.
    //     console.log(user)
    // })
    // .catch(error => {
    //     console.log("EL ERROR ======>". error)
    //     res.status(500).render("auth/signup",{
    //         errorMessage:"Tu correo no es válido, por favor vuelve a ingresar los datos."
    //     })
    // })

    // console.log("EL NUEVO USUARIO CREADO ====>",newUser)

    
}

exports.viewLogin =(req,res,next) => {
    console.log("SESSION====?",req.session)
    res.render("auth/login")
}

exports.login = (req,res,next) => {
    //1.- Obtenemos los datos del formulario
    const {email,password} = req.body

    console.log("EN EL LOGIN",req.body)
    
    //==============> VALIDACIONES


     //A)validamos que se ingrese datos    
     if(!password || !password.length || !email || !email.length ){
        res.render("auth/login", {
            errorMessage:"Por favor llenar todos los campos"
        })

        return
    }

    // B)validamos que la contraseña cumpla con los parametros indicados .
    // const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
    // if(!regex.test(password)){
		
	// 	res.render("auth/login", {
	// 		errorMessage: "Tu password debe contener mínimo 6 caracteres, un número y una mayúscula."
	// 	})		

	// 	return
	// }

    User.findOne({email})
    .then(user => {
        console.log('User',user)
         // C) Validaciion de usuario existente en BD si no lo encuentra lanza error y mensje
     if(!user){
            res.render("auth/login", {
                errorMessage:"Email o contraseña no validos"
            })
             return
             // si lo encuentra compara contraseña para ver que haga match con BD
        } 
        // else if(bcryptjs.compareSync(password,user.password)){
        //     res.redirect("/user/profile", {
        //         errorMessage:"Email o contraseña no validos"
        //     })

        //         return
        // }

        res.redirect(`/user/profile/${user._id}`)
    })
    .catch(error => {
        console.log("EL ERROR ======>",error)
        res.status(500).render("auth/login",{
            errorMessage:"Tus datos no son validos por favor vuelve a ingresarlos"
        })
    })
    
    
}

exports.viewProfile = (req,res,next) => {
    const {id} = req.params
    User.findById(id)
    .then(user => {
        res.render("user/profile",user)
    })
    .catch(error => {
        next(error)
    })
}

exports.logout = (req,res,next) => {
    //! NO BORRA SESION DE MONGO
    req.session.destroy((error)=>{

        if(error){
            console.log(error)
            return
        }

        res.redirect("/")
        

    })
}
