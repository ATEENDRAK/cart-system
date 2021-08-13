const CartItem = require('../models/CartItem')
const UserCart = require('../models/UserCart')
const files = require('../utils/file')



const getUserCartById = async (userId) => {
    try {
        let userData = await files.readFile(`${userId}.cart.json`)
        if (userData === null) {
            return userData
        }
        let userDataJson = JSON.parse(userData)
        return generateUserCartFromJson(userDataJson)

    }
    catch (err) {
        throw err
    }
}

const generateUserCartFromJson = (data) => {
    let cart = {}
    for (const [key, value] of Object.entries(data.cart)) {
        let cartItem = new CartItem(value.productId, value.productName, value.productPrice, value.quantity)
        cart[key] = cartItem
    }
    let userCart = new UserCart(data.userId, cart)
    return userCart
}

const save = async (userCart)=>{
    let filename=`${userCart.userId}.cart.json`
    let cartData = JSON.stringify(userCart)
    await files.writeFile(cartData,filename)
}

module.exports = {
    getUserCartById,
    save
}