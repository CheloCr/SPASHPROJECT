exports.viewProfile = (req,res) => {

    const {id} = req.params
    User.findById(id)
    .then(user => {
        res.render("user/profile",)
    }).catch(error => {
        console.log("error EN EDITAR PERFIL", error)
    }    )
}

exports.viewEditProfile = (req,res,next) => {
    res.render("user/edit-user")
}

exports.postEditProfile = (req,res,next) => {
    const {id} = req.params
    const {role, ...partnerEdited} = req.body
    Partner.findByIdAndUpdate(id, partnerEdited, {Edit: true})
    .then(partnerEdited => res.redirect(`/user/profile/${id}`))
    .catch(err => {
        console.log("Error in updating partner",err)
        next(err)
    })
}



