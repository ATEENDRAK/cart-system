const cartRepository = require('../repository/cart')
const productRepository =  require('../repository/product')
const HttpError = require('../errors')
const UserCart = require('../models/UserCart')


const addProduct= async (productId,quantity,userId)=>{
    let  products = await productRepository.getAllProducts()
    if(products[productId] === null){
        throw new HttpError(404,"Product Not Found")
    }
    let userCart = await cartRepository.getUserCartById(userId)
    if(userCart ===null){
        userCart = new UserCart(userId,{})
    }
    if(userCart.cart[productId] != null)
        throw new HttpError(409,"Product already present in cart")
    let product = products[productId]
    userCart.addProduct(product,quantity)
    await cartRepository.save(userCart)
}

const getCartDetails = async (userId)=>{
    let cartDetails = await cartRepository.getUserCartById(userId)
    if(cartDetails == null){
        cartDetails =  new UserCart(userId,{})
    }
    let aggregate = cartDetails.getAggregate()
    return {
        ...aggregate,
        ...cartDetails
    }
}

const deleteProduct = async (productId,userId)=>{
    let cartDetails = await cartRepository.getUserCartById(userId)
    if(cartDetails == null || cartDetails.cart[productId] == null){
        throw new HttpError(404,"Product Not Found In Cart")
    }
    delete cartDetails.cart[productId]
    await cartRepository.save(cartDetails)
}


const updateCart= async (productId,userId,quantity) =>{
    let cartDetails = await cartRepository.getUserCartById(userId)
    if(cartDetails == null || cartDetails.cart[productId] == null){
        throw new HttpError(404,"Product Not Found In Cart")
    }
    cartDetails.cart[productId].quantity=quantity
    await cartRepository.save(cartDetails)
}


module.exports={
    addProduct,
    getCartDetails,
    deleteProduct,
    updateCart
}