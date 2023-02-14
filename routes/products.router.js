import { Router } from 'express'
// import {ProductManager} from '../src/dao/fileManager/productManager.js'
import {ProductManager} from '../src/dao/mongoManager/productManager.js'
import { upload } from '../middlewares/multer.js'

const productRouter = Router()
// const productManager = new ProductManager('../src/archivos/products.json') 
const productManager = new ProductManager() 


productRouter.get('/',async(req,res)=>{
    try {
        const {limit} = req.query
        const products = await productManager.getProducts(limit || 'max')
        res.json({products})
    } catch (error) {
        res.send(error)
    }
    
})

productRouter.get('/:idProduct',async(req,res)=>{
    const {idProduct} = req.params
    console.log(idProduct)
    try {
        const product = await productManager.getProductById(idProduct)
        console.log(product)
        if(product){
            res.json({product})
    }else{
        res.send('Producto no encontrado')
    }
} catch (error) {
    res.send(error)
}
})


productRouter.post('/', upload.single('file'), async(req, res) => {
    const product = req.body
    console.log(product)
    const addNewProduct = await productManager.addProduct(product)
    console.log(addNewProduct)
    res.json({ message: 'Producto agregado con exito', addNewProduct })
})


productRouter.put('/:idProduct', async(req, res) => {
    const {idProduct} = req.params
    const product = req.body
    try {
        const updateProduct = await productManager.updateProduct(idProduct, ...product)
        console.log(updateProduct)
        res.json({ message: 'Producto modificado con exito'})
    } catch (error) {
        console.log('error')
        return error
    }
})


productRouter.delete('/:idProduct', async(req, res) => {
    const {idProduct} = req.params
    try {
        const deleteProduct = await productManager.deleteProduct(idProduct)
        console.log(deleteProduct)
        res.json({ message: 'Producto eliminado con exito'})
    } catch (error) {
        console.log('error')
        return error
    }
})




export default productRouter