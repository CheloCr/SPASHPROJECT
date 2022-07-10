//todo -------------- IMPORTACIONES --------------
const bcryptjs = require("bcryptjs")
const User = require("./../models/User.model")

// renderiza form de sign up
exports.viewSignup = (req,res,next) => {
    res.render("auth/signup")
}

exports.signup = (req,res,next) => {

    //1.- Obtenemos los datos del formulario

    const {role, user_photo, username, email, description, password, phone_number} = req.body

    console.log("DATOS DEL USUARIO",{ user_photo, username, email, description, password, phone_number})


    // //==============> VALIDACIONES
    // //  A) Campos vacios
    // if(!restUser.password || !restUser.password.length || !restUser.username || !restUser.username.length){
    //     res.render("auth/signup", {
    //         errorMessage:"Por favor llena todos los campos"
    //     })
    //     return
    // }

    // //  B) Fortalecimiento del Password
    // const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
    // if(!regex.test(restUser.password)){
		
	// 	res.render("auth/signup", {
	// 		errorMessage: "Tu password debe contener mínimo 6 caracteres, un número y una mayúscula."
	// 	})		

	// 	return
	// }


    //3.- Creamos usuario nuevo
    const salt = bcryptjs.genSaltSync(10);
    const newPassword = bcryptjs.hashSync(password, salt);

    User.create({user_photo, username, description, phone_number, email, password: newPassword})
        .then(user => {
        
            res.redirect("/auth/login")
            console.log("user created", user)
        })
        .catch(err => next(err))
    .catch(error => {
        console.log("EL ERROR ======>". error)
        res.status(500).render("/signup",{
            errorMessage:"Tu correo no es válido, por favor vuelve a ingresar los datos."
        })
    })
    
}

exports.viewLogin =(req,res,next) => {
    console.log("SESSION====?",req.session)
    res.render("auth/login")
}

exports.login = (req,res,next) => {
    //1.- Obtenemos los datos del formulario
    const {username,email,password} = req.body

    console.log("EN EL LOGIN",req.body)
    
    //==============> VALIDACIONES


    //  //A)validamos que se ingrese datos    
    //  if(!password || !password.length || !email || !email.length ){
    //     res.render("auth/login", {
    //         errorMessage:"Por favor llenar todos los campos"
    //     })

    //     return
    // }

    // B)validamos que la contraseña cumpla con los parametros indicados .

    // const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
    // if(!regex.test(password)){
		
	// 	res.render("auth/login", {
	// 		errorMessage: "Tu password debe contener mínimo 6 caracteres, un número y una mayúscula."
	// 	})		

	// 	return
	// }


    const {id} = req.params
    User.findOne({email})
    .then(user => {

        console.log("EL USUARIOOOOOOOOOOOOO",user)// si no se encuentra user es valor es igual a "null"
        
        //5. Redireccionamos a MI PERFIL
            res.redirect(`user/profile/${user.id}`)
    })
    .catch(error => {
        console.log("error in post de login", error)
    })
    .catch(error => {
        console.log("EL ERROR ======>",error)
        res.status(500).render("auth/login",{
            errorMessage:"Tus datos no son validos por favor vuelve a ingresarlos"
        })
    })
    
    
}

exports.viewProfile = (req,res) => {

    const {id} = req.params
    User.findById(id)
    .then(user => {
        res.render("user/profile",user)
    }).catch(error => {
        console.log("error in post Dashboard", error)
    }    )
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
