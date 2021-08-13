const HttpError=require('../errors')

const addProduct=(req,res,next)=>{
    const productId=req.body.productId, quantity=req.body.quantity
    if(!(typeof productId === "string")){
        next(new HttpError(400,"Invalid Product Id"))
        return
    }
    if(!(typeof quantity === "number" && quantity >0)){
        next(new HttpError(400,"Invalid Quantity to be added"))
        return
    }
    next()
}

const getCartDetails=(req,res,next)=>{
    next()

}

const deleteProduct= (req,res,next)=>{
    let productId = req.body.productId
    if(!(typeof productId === "string")){
        next(new HttpError(400,"Invalid Product Id"))
        return
    }
    next()
}

const updateCart = (req,res,next) =>{
    let productId = req.body.productId ,quantity =req.body.quantity
    if(!(typeof productId === "string")){
        next(new HttpError(400,"Invalid Product Id"))
        return
    }
    if(!(typeof quantity === "number" && quantity >=0)){
        next(new HttpError(400,"Invalid Quantity to be added"))
        return
    }
    next()
}
module.exports={
    addProduct,
    getCartDetails,
    deleteProduct,
    updateCart
}