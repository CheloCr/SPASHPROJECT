const router = require("express").Router();

router.get("/home",(req,res,next)=>{
    res.render("index")
})



module.exports = router;