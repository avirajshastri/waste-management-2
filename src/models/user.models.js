import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required: [true,"Please provide a name"]
    },
    email:{
        type:String,
        required:[true, "Please provide a email"],
        unique: true,
    },
    phoneNumber:{
        type:String,
        required:[true, "Please provide a phone number"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    role: {
        type:String,
    },
    isVerified: {
        type: Boolean,
        default:false,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    creditPoints:{
        type: Number,
        default: 0
    },
    forgotPasswordToken : String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})


const User = mongoose.models["User"] || mongoose.model("User",userSchema)


export default User;