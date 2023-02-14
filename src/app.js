import express from 'express'
import productsRouter from '../routes/products.router.js'
import cartRouter from '../routes/cart.router.js'
import viewsRouter from '../routes/views.router.js'
import chatRouter from '../routes/chat.router.js'
import { __dirname } from '../utils.js'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import './dbConfig.js'
import { messagesModel } from "./dao/models/messages.model.js";

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

// ROUTES
app.use('/', viewsRouter)
app.use('/api/products', productsRouter)
app.use('/api/cart', cartRouter)
app.use('/chat', chatRouter)


const PORT = 8080

const httpServer = app.listen(PORT, () => {
  console.log(`Escuchando al puerto ${PORT}`)
})

const mensajes = []

const socketServer = new Server(httpServer) 

socketServer.on('connection', (socket)=>{
    console.log(`Usuario conectado: ${socket.id}`)

    socket.on('disconnect', ()=>{
        console.log(`Usuario desconectado`)
    })

    //chat

    socket.on('mensaje', info=>{
      mensajes.push(info)
      socketServer.emit('chat', mensajes)
      async function addMessage(){
        try {
          const newMessage = await messagesModel.create(info)
          return newMessage
        } catch (error) {
          console.log(error)
        }
      }
      addMessage()
        console.log(info)
    })


})

export default socketServer;






