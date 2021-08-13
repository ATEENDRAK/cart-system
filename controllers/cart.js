const cartService = require('../services/cart')

const addProductsToCart = async (req, res, next) => {
    try {
        const productId = req.body.productId, quantity = req.body.quantity,userId=req.session.sub
        const response = await cartService.addProduct(productId, quantity,userId)
        res.sendStatus(200)
    }
    catch (err) {
        next(err)
    }
}

const getCartDetails = async (req,res,next) =>{
    try{
        const userId=req.session.sub
        const response =  await cartService.getCartDetails(userId)
        res.send(response)
    }
    catch(err){
        next(err)
    }
}

const deleteProduct = async (req,res,next)=>{
    try{
        let productId = req.body.productId, userId=req.session.sub
        const response = await cartService.deleteProduct(productId,userId)
        res.sendStatus(200)
    }
    catch(err){
        next(err)
    }
}

const updateCart = async (req,res,next)=>{
    try{
        let productId = req.body.productId, userId=req.session.sub,quantity=req.body.quantity
        const response = await cartService.updateCart(productId,userId,quantity)
        res.sendStatus(200)
    }
    catch(err){
        next(err)
    }
}

module.exports = {
    addProductsToCart,
    getCartDetails,
    deleteProduct,
    updateCart
}