const router=require('express').Router()
const cartController = require("../../controllers/cart")
const cartValidator = require('../../validations/cart')

router.post('/',cartValidator.addProduct,cartController.addProductsToCart)
router.get('/',cartValidator.getCartDetails,cartController.getCartDetails)
router.delete('/',cartValidator.deleteProduct,cartController.deleteProduct)
router.put('/',cartValidator.updateCart,cartController.updateCart)

module.exports=router