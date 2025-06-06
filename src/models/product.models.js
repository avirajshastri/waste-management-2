import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description: {
        type:String,
        required: true,
    },
    imgUrl:{
        type:String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock:{
        type:Number,
        required:true,
        min: [0,"Stock cannot be negative"]
    },
    available: {
        type: Boolean,
    }
}, {timestamps:true})

const Product = mongoose.models["Product"] || mongoose.model("Product", productSchema)

export default Product;