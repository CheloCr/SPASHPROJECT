const router = require("express").Router();
const Partner = require("../models/Partner.model");
const bcryptjs = require("bcryptjs");
const Product = require("../models/Product.model");

// TODO --------------------CREATE--------------------
router.get("/create",(req,res,next)=>{
    res.render("product/create-product")
})
router.post("/create",(req,res,next)=>{
    const {role, ...restProduct} = req.body
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(req.body.password, salt);
   
    Product.create({...restProduct, password: hash})
        .then(product => {
            res.redirect(`/product/dashboard/${product._id}`)
            console.log("product created", product);
        })
        .catch(err => next(err))

})

// TODO --------------------DASHBOARD--------------------

//! DASHBOARD
// router.get("/dashboard",(req,res,next)=>{
//     res.render("product/dashboard")
// })
router.get("/dashboard/:id", (req, res, next) => {
    const { id } = req.params;
    const { role, ...Product } = req.body
    Product.findById(id)
        .then(product => {
            res.render("product/dashboard", product)
        })
        .catch(err => {
            console.log("error in post/dashboard", err);
            next()
        })


})

router.post("/dashboard/:id", (req, res, next) => {
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
})


// TODO --------------------EDIT--------------------
router.get("/edit/:id",(req,res,next)=>{
    const {id} = req.params
    Product.findById(id)
    .then(productEdited => res.render("product/edit-product",{product:productEdited}))
    .catch(err => next(err))
})
router.post("/edit/:id",(req,res,next)=>{
    const {id} = req.params
    const {role, ...productEdited} = req.body
    Product.findByIdAndUpdate(id, productEdited, {Edit: true})
    .then(productEdited => res.redirect(`/product/dashboard/${id}`))
    .catch(err => {
        console.log("Error in updating product",err)
        next(err)
    })

})
module.exports = router
