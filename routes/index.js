const router = require("express").Router();

router.get("/",(req,res,next)=>{
    res.render("index")
})
router.get("/contact",(req,res,next)=>{
    res.render("contact-us")
})



module.exports = router;