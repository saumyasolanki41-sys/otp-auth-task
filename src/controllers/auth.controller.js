const User=require("../models/user");
const{hashPassword}=require("../utils/password");
const{
   generateOtp,
  hashOtp,
    OTP_EXPIRY_MS,
 }=require("../utils/otp");
  const{sendOtpEmail}=require("../services/email.service");

const signup=async(req,res,next)=>{
  try{
     const{name,email,password}=req.signupData;
    const existingUser=await User.exists({ email });
     if(existingUser){
      return res.status(409).json({
         success:false,
        message:"An account already exists with this email",
      } 
    );
 }
     const passwordHash=await hashPassword(password);
     const otp= generateOtp();
     const otpHash=hashOtp(email,otp);
      const now=new Date();
    const user=await User.create({
       name,
      email,
       passwordHash,
        isVerified:false,
       otpHash,
       otpExpiresAt:new Date(now.getTime()+OTP_EXPIRY_MS),
      otpAttempts:0,
      otpLastSentAt:now,
      }
);
     try{
       await sendOtpEmail(email, otp);
  } 
    catch(mailError){
      await User.deleteOne({
        _id:user._id,
        isVerified:false,
        otpHash,
      });

      console.error(
        "Signup email failed:",mailError.code||"SMTP_ERROR"
     );

      return res.status(503).json(
         {
        success:false,
        message:"Could not send verification email. Please try signup again.",
      }
    );
 }
    return res.status(201).json({
      success:true,
      message:"Verification email sent. Enter the OTP to complete registration.",
      data:{
        email:user.email,
        isVerified:user.isVerified,
      },
    }
);
  } 
  catch(error) {
    next(error);
  }
};

module.exports = { signup };