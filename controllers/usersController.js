exports.viewProfile = (req,res) => {

    const {id} = req.params
    User.findById(id)
    .then(user => {
        res.render("user/profile",user)
    }).catch(error => {
        console.log("error in post Dashboard", error)
    }    )
}

