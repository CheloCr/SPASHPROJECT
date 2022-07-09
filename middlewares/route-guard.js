// En este archivo se hace una verificacion de cada ruta para saber si ya se es usuario.

const loggedUser = (req,res,next) => {
    //En las rutas que se le digan hara una redireccion a donde queremos

    //Evaluar si el usuario NO esta loggeado
    if(!req.session.currentUser){
        res.redirect("auth/login")// si no tiene sesion enviarlo a login

        return
    }
    
    next() // si tiene sesion enviarlo a Controller

}

module.exports = {
    loggedUser
}