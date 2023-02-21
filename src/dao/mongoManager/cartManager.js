import {cartsModel} from '../models/carts.model.js'
import fs from 'fs';

export class CartManager {

    async getCarts(){
        try {
            const carts = await cartsModel.find()
            return carts
        } catch (error) {
            console.log(error)
        }
    }

    async addCart(objCart){
        try {
            const newCart = await cartsModel.create(objCart)
            return newCart
        } catch (error) {
            console.log(error)
        }
    }

    async getCartById(cartId){
        try {
            const cart = await cartsModel.find({_id:cartId})
            if(cart){
                console.log(cart)
                return cart;
            } else{
                return 'Cart not found'
            }
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async addProdToCart(cartId, prodId){
    try {
        const cart = await cartsModel.findById(cartId)
        cart.products.push(prodId)
        cart.save()
        return cart
    } catch (error) {
        console.log(error)
    }
}


    // async addProductToCartById(idCart,idProduct,quantity){
    //     const read = await this.getCarts();
    //     const cart = read.find((c) => c.id === idCart);
    //     if (cart === undefined)  return console.log("Not found")
    //     else {
    //         const index = read.indexOf(cart);
    //         if (read[index].products.find((p) => p.id === parseInt(idProduct))){
    //             const indexProd = read[index].products.indexOf(read[index].products.find((p) => p.id === parseInt(idProduct)));
    //             read[index].products[indexProd].quantity += quantity;
    //             await fs.promises.writeFile(this.path,JSON.stringify(read, null, 2));
    //             return read[index].products[indexProd];
    //         }else{
    //             const id = parseInt(idProduct);
    //             const product = {
    //             id: id,
    //             quantity: quantity
    //             }
    //             read[index].products.push(product);
    //             await fs.promises.writeFile(this.path,JSON.stringify(read, null, 2));
    //             return product;
    //         }
    //     }

    // }
}