//todo -------------- IMPORTACIONES --------------
const bcryptjs = require("bcryptjs")
const User = require("./../models/User.model")


exports.viewSignup = (req,res,next) => {
    res.render("auth/signup")
}

exports.signup = (req,res,next) => {


    //1.- Obtenemos los datos del formulario
    const {role,...restUser} = req.body

    console.log("DATOS DEL USUARIO",restUser)


    //==============> VALIDACIONES
    //  A) Campos vacios
    if(!restUser.password || !restUser.password.length || !restUser.username || !restUser.username.length){
        res.render("auth/signup", {
            errorMessage:"Por favor llena todos los campos"
        })
        return
    }

    //  B) Fortalecimiento del Password
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
    if(!regex.test(restUser.password)){
		
		res.render("auth/signup", {
			errorMessage: "Tu password debe contener mínimo 6 caracteres, un número y una mayúscula."
		})		

		return
	}

    //  C) Correo
    //la validacion de correo se hace por medio del Modelo usuario 

     


    //2.- Encriptamos password
    const salt = bcryptjs.genSaltSync(10)
    const encryptedPassword = bcryptjs.hashSync(restUser.password,salt)

    console.log("PASSENCRIPTADO",encryptedPassword)

    //3.- Creamos usuario nuevo
    const newUser = User.create({...restUser,password:encryptedPassword})
    .then(user => {
        //redirigimos a la lista de proveedores
        res.render("partner/mainList") //! Esto debe de deireccionar al get/post de proveedores.
        console.log(user)
    })
    .catch(error => {
        console.log("EL ERROR ======>". error)
        res.status(500).render("auth/signup",{
            errorMessage:"Tu correo no es válido, por favor vuelve a ingresar los datos."
        })
    })

    console.log("EL NUEVO USUARIO CREADO ====>",newUser)




    
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
    
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
    if(!regex.test(password)){
		
		res.render("auth/login", {
			errorMessage: "Tu password debe contener mínimo 6 caracteres, un número y una mayúscula."
		})		

		return
	}

    User.findOne({email})
    .then(user => {
        console.log("EL USUARIOOOOOOOOOOOOO",user)// si no se encuentra user es valor es igual a "null"
        

         // C) Validaciion de usuario existente en BD
     if(!user){
            res.render("auth/login", {
                errorMessage:"Email o contraseña no validos"
            })

                return
        }

        if(!bcryptjs.compareSync(password,user.password)){
            res.render("auth/login", {
                errorMessage:"Email o contraseña no validos"
            })

                return
        }
        // //4. Generar Sesion (Cookie)
        //   //Si te mueves dentro de la plataforma sigues loggeado
          req.session.currentUser = user
          console.log("QQQQQQQQQQQQQQQQ",req.session.currentUser)
          
        //5. Redireccionamos a MI PERFIL
            res.redirect(`users/profile/${user.id}`)
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
