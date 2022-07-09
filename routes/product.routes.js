const router = require("express").Router();
const Partner = require("../models/Partner.model");
const Product = require("../models/Product.model");

// TODO --------------------CREATE--------------------
router.get("/create",(req,res,next)=>{
    res.render("product/create-product")
})
router.post("/create",(req,res,next)=>{
    const {role, ...restProduct} = req.body
    console.log("el restProduct",restProduct)
    
   
    Product.create({...restProduct})
        .then(product => {
            
            // const productList = []
            // productList.push(product.toObject())
             //!Checar aqui si se puede hacer asi o si se debe hacer otra forma
            res.render("partner/dashboard", {product})
            console.log("product created", product);
        })
        .catch(err => next(err))

})




// TODO --------------------EDIT--------------------
router.get("/edit/:id",(req,res,next)=>{
    const {id} = req.params
    Product.findById(id)
    .then(product => {
        console.log("product edited", product);
        res.render("product/edit-product", {product})
    })
    .catch(err => next(err))
})
router.post("/edit/:id",(req,res,next)=>{
    const {id} = req.params
    const {role, ...productEdited} = req.body
    Product.findByIdAndUpdate(id, ...productEdited, {Edit: true})
    .then(productEdited => res.redirect(`/partner/dashboard/${id}`))
    .catch(err => {
        console.log("Error in updating product",err)
        next(err)
    })

})
// TODO --------------------DELETE--------------------



module.exports = router
