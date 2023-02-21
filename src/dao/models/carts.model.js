import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    products:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Products',
            default:[]
        },
        {
            quantity: {
            type: Number,
            required: true
            }
        }
        
    ],
    // quantity: {
    //     type: Number,
    //     required: true
    // }
})

//populate en el find sin ponerlo en el manager
cartsSchema.pre('find', function(next){
    this.populate('products')
    next()
})

export const cartsModel = mongoose.model('Carts', cartsSchema)