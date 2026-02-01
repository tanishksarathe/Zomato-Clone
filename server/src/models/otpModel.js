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
        type:String,
        required:true,
        expires:180
    }
})

const OTP = mongoose.model("OTP", otpSchema);

export default OTP;