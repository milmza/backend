import { Router } from 'express'
// import {ProductManager} from '../src/dao/fileManager/productManager.js'
import {ProductManager} from '../src/dao/mongoManager/productManager.js'
import socketServer from "../src/app.js";
import {productsModel} from '../src/dao/models/products.model.js';

const viewsRouter = Router()
// const productManager = new ProductManager('./archivos/products.json') 
const productManager = new ProductManager() 


//get 

viewsRouter.get('/',async(req,res)=>{
  const products = await productManager.getProducts()
    res.render('home', {products})
})

viewsRouter.get('/realtimeproducts',async (req,res)=>{
  const products = await productManager.getProducts('max')
  socketServer.on('connection', (socket)=>{
    socket.emit('products', products)
  })
    res.render('realTimeProducts', {products})
})


viewsRouter.get('/products',async(req,res)=>{
    try {
        // /?limit=1&page=1
        const {limit=1, page=1} = req.query //default 1 y 1
        const products = await productManager.getProducts()
        const productsPag = await productsModel.paginate({productsPag}, {limit, page})
        if(!limit || !page || !category){
          res.render('products', {products})
        }else{
          res.json({productsPag})
        }
    } catch (error) {
        res.json({error, status: 'error'})
    }
})

//post

viewsRouter.post('/realtimeproducts', async(req, res)=>{
  try {
    const product = await req.body
    console.log('product:',product)
    await productManager.addProduct(product)
    const products = await productManager.getProducts('max')
    socketServer.sockets.emit('products', products)
  } catch (error) {
    return error
  }
})


export default viewsRouter