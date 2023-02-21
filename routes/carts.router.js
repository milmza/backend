import { Router } from 'express'
// import {CartManager} from '../src/dao/fileManager/cartManager.js'
import {CartManager} from '../src/dao/mongoManager/cartManager.js'
import { cartsModel } from '../src/dao/models/carts.model.js'


const cartRouter = Router()
// const cartManager = new CartManager('../src/archivos/carts.json') 
const cartManager = new CartManager() 

// get

cartRouter.get('/', async(req,res) => {
    const carts = await cartManager.getCarts();
    res.json({carts});  
});

cartRouter.get('/:cartId', async(req,res) => {
    const {cartId} = req.params
    const cart = await cartManager.getCartById(cartId);
    if(!cart){
        res.json({message: 'Cart not found'})
    }else{
        res.json({cart});
    }
});

//post 

cartRouter.post('/', async(req, res) => {
    const products = await req.body;
    const newCart = await cartManager.addCart(products);
    if(!newCart){
        res.json({message:"error"});
    }else{
        res.json({message:"Carrito creado con éxito",newCart});
    }
    
})

cartRouter.post('/addProd', async(req, res)=>{
    const {cartId, prodId, quantity} = req.body
    const cart = await cartManager.addProdToCart(cartId, prodId, quantity)
    res.json({message: 'product added successfully', cart})
})

//put

cartRouter.put('/:cartId', async(req, res)=>{
    const {cartId} = req.params
    const {products} = req.body
    const cart = await cartManager.getCartById(cartId)
    const cartMod = await cartManager.addProdToCart(cartId, products)
    res.json({message: 'product added successfully', oldCart: cart, newCart: cartMod})
})

//delete

cartRouter.delete('/:cartId/products/:prodId', async(req, res)=>{
    const {cartId, prodId} = req.params
    const cart = await cartManager.getCartById(cartId)
    const prodDelete = await cartsModel.findByIdAndDelete(prodId)
    if(!prodDelete){
        res.json({message: 'prod not found'})
    }else{
        res.json({message: 'product deleted successfully', cart: cart})
    }
})

cartRouter.delete('/:cartId', async(req, res)=>{
const {cartId} = req.params
const cartDelete = await cartsModel.findByIdAndDelete(cartId)
res.json({message: 'cart deleted successfully', cartDeleted: cartDelete})
})

// cartRouter.post('/:idCart/product/:idProduct',async(req,res) => {
//     const idCart = req.params.idCart;
//     const idProduct = req.params.idProduct;
//     const quantity = req.body.quantity;
//     const newProduct = await cartManager.addProductToCartById(idCart,idProduct,quantity);
//     res.json({message:"producto agregado con éxito",newProduct});
// });


export default cartRouter