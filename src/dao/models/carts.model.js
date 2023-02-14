import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    products:{
        id: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    },  
})

export const cartsModel = mongoose.model('Carts', cartsSchema)