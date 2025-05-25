import mongoose from "mongoose";


const requestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    wasteType: {
        type: String,
        enum: ["Dry","Wet"],
        required: true,
    },
    location: {
        type: String,
        enum: ["UnitA", "UnitB"],
        required: true,
    },
    imgUrl: {
        type: String, //cloudinary url
        default: ""
    },
    requestedAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["PENDING","ACCEPTED","COMPLETED","CANCELLED"],
        default: "PENDING",
    },
    collectorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    collectedAt: {
        type: Date,
        default: null,
        required: false
    }
},{timestamps:true})

const Request = mongoose.models["Request"] || mongoose.model("Request",requestSchema)

export default Request;