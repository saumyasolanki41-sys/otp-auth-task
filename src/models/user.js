const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:{
      type:String,
      required:[true,"Name is required"],
      trim:true,
      minlength:[2,"Name must contain at least 2 characters"],
      maxlength:[50,"Name cannot exceed 50 characters"],
  },

    email:{
      type:String,
      required:[true,"Email is required"],
      trim:true,
      lowercase:true,
      maxlength:254,
      unique:true,
    },

    passwordHash:{
      type:String,
      required:true,
      select:false,
 },

    isVerified:{
      type:Boolean,
      default:false,
  },

    otpHash:{
      type:String,
      default:null,
      select:false,
  },

    otpExpiresAt:{
      type:Date,
      default:null,
 },

    otpAttempts:{
      type:Number,
      default:0,
      min:0,
 },

    otpLastSentAt:{
      type:Date,
      default:null,
 },
  },
    {
    timestamps:true,
 }
);
const User=mongoose.model("User",userSchema);
module.exports=User;