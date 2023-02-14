import { Router } from 'express'
// import {CartManager} from '../src/dao/fileManager/cartManager.js'
import {CartManager} from '../src/dao/mongoManager/cartManager.js'


const cartRouter = Router()
// const cartManager = new CartManager('../src/archivos/carts.json') 
const cartManager = new CartManager() 


cartRouter.post('/', async(req, res) => {
    const products = await req.body;
    const newCart = await cartManager.addCart(products);
    res.json({message:"Carrito creado con éxito",newCart});
})

cartRouter.get('/', async(req,res) => {
    const carts = await cartManager.getCarts();
    res.json({carts});  
});


cartRouter.get('/:idCart', async(req,res) => {
    const cart = await cartManager.getCartById(req.params.idCart);
    res.json({cart});
  
});


cartRouter.post('/:idCart/product/:idProduct',async(req,res) => {
    const idCart = req.params.idCart;
    const idProduct = req.params.idProduct;
    const quantity = req.body.quantity;
    const newProduct = await cartManager.addProductToCartById(idCart,idProduct,quantity);
    res.json({message:"producto agregado con éxito",newProduct});
});


export default cartRouter