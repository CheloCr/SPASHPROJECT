const router = require("express").Router();
const User = require("../models/User.model")



router.get("/profile/:id",(req,res,next)=>{
    const {id} = req.params
    User.findById(id)
    .then(user=>{res.render("user/profile",user)
    console.log("DENTRO DE PROFILE")
})
    
    .catch(err =>{console.log('error',err)
    next()})
})



module.exports = router;