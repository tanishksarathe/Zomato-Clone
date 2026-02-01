import mongoose from "mongoose";

const otpSchema = mongoose.Schema({
    otp:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    createdAt:{
        type: Date,
        required:true,
        default:Date.now,
        expires:180 //expires in 180 seconds
    }
})

const OTP = mongoose.model("OTP", otpSchema);

export default OTP;