const router = require("express").Router();


router.get("/profile/:id",(req,res,next)=>{
    res.render("user/profile")
})



module.exports = router;