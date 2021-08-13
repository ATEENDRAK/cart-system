const Product = require('../models/Product')
const files=require('../utils/file')

const getAllProducts = async ()=>{
    let productData = await files.readFile(`products.json`)
    if (productData === null) {
        return null
    }
    let productDataJson = JSON.parse(productData)
    return generateProductsFromJson(productDataJson)
}

const generateProductsFromJson=(productData)=>{
    let products={}
    for (const [key, value] of Object.entries(productData)) {
        let product = new Product(value.name, value.price,value.Id)
        products[key] = product
    }
    return products
}

module.exports={
    getAllProducts
}