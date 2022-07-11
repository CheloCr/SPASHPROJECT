const bcryptjs = require("bcryptjs")
const User = require("./../models/User.model")
const Partner = require("./../models/Partner.model");

//----------Rednderiza partner signup
exports.viewSignup = (req,res,next) => {
    res.render("partner/signup")
}
//-------Manejo de formulario de signup
exports.signup = (req,res,next) => {
    const {role, ...restPartner } = req.body;
    const salt = bcryptjs.genSaltSync(10);
    const newPassword = bcryptjs.hashSync(restPartner.password, salt);

    Partner.create({...restPartner, password: newPassword})
        .then(partner => {
        
            res.redirect(`/partner/profile/${partner._id}`)
            console.log("partner created", partner);
        })
        .catch(err => next(err))
}
//----------Rednderiza partner login
exports.viewLogin =(req,res,next) => {
    res.render("partner/login")
}
//-------Manejo de formulario de login
exports.login = (req,res,next) => {
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

}
//----------Rednderiza partner profile
exports.viewProfile = (req,res,next) => {
    const {id} = req.params;
    Partner.findById(id)
    .then(partner => {
        res.render("partner/profile", partner)
    }).catch(error=>{
        next(error)
    })
}
//----------Rednderiza partner List
exports.viewPartnersList = (req,res,next) => {
    res.render("partner/partners-list");
}
//!Busqueda de cada partner para renderizar en la lista
// Partner.find()
// .then(partners => {
//     res.render("partner/partners-list", {partners})
// }).catch(error=>{
//     next(error)
//
exports.viewDashboard = (req,res,next) => {
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
}   

exports.postDashboard = (req,res,next) => {
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
}

// TODO --------------------LOGOUT--------------------

//----------fin del Log Out



// TODO --------------------EDIT--------------------

exports.viewEditProfile = (req,res,next) => {
    res.render("partner/edit-profile")
}

exports.postEditProfile = (req,res,next) => {
    const {id} = req.params
    const {role, ...partnerEdited} = req.body
    Partner.findByIdAndUpdate(id, partnerEdited, {Edit: true})
    .then(partnerEdited => res.redirect(`/partner/profile/${id}`))
    .catch(err => {
        console.log("Error in updating partner",err)
        next(err)
    })
}