const CartItem = require("./CartItem")

class UserCart {
    constructor(userId,cart){
        if(!cart)
            cart={}
        this.cart=cart
        this.userId=userId
    }
    addProduct(product,quantity){
        this.cart[product.Id]=new CartItem(product.Id,product.name,product.price,quantity)
    }
    getAggregate(){
        let response = {
            quantity : 0,
            price : 0
        }

        for(const [key,value] of Object.entries(this.cart)){
            response.quantity+=value.quantity
            response.price+=value.productPrice*value.quantity
        }
        return response
    }
}



module.exports=UserCart