const { generateAccessToken } = require("../utils/token");
const User=require("../models/user");
const{hashPassword,comparePassword,}=require("../utils/password");
const{ generateOtp,hashOtp,OTP_EXPIRY_MS,matchesOtp,MAX_OTP_ATTEMPTS,}=require("../utils/otp");
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

const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.verificationData;
    const user = await User.findOneAndUpdate(
      {
         email,
          isVerified:false,
         otpHash:{$type:"string" },
        otpExpiresAt:{ $gt: new Date() },
         otpAttempts:{ $lt: MAX_OTP_ATTEMPTS },
      },
        {
        $inc:{otpAttempts:1},
     },
      {
        returnDocument:"after",
       }
    ).select("+otpHash");

    if (!user) {
      return res.status(400).json({
        success:false,
        message: "Verification unavailable. The OTP may have expired, the attempt limit was reached, or the account is already verified.",
      });
    }

    const isCorrect = matchesOtp(email, otp, user.otpHash);

    if(!isCorrect){
      return res.status(400).json({
         success:false,
        message:"Invalid OTP",
      });
    }
    const verifiedUser=await User.findOneAndUpdate(
      {
        _id: user._id,
        isVerified: false,
        otpHash: user.otpHash,
        otpExpiresAt:{ $eq: user.otpExpiresAt,$gt: new Date(),
        },
      },
      {
        $set:{
          isVerified: true,
          otpHash: null,
          otpExpiresAt: null,
          otpAttempts: 0,
          otpLastSentAt: null,
        },
      },
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if(!verifiedUser){
      return res.status(400).json({
        success:false,
        message:"OTP is no longer available for verification.",
      });
    }

    return res.status(200).json({
      success: true,
      message:"Email verified successfully. Registration is complete.",
      data: {
        id: verifiedUser._id,
        name: verifiedUser.name,
        email: verifiedUser.email,
        isVerified: verifiedUser.isVerified,
      },
    });
  } catch(error) {
    next(error);
  }
};
const login=async(req,res,next)=>{
    try{
   const{email,password}=req.loginData;
    const user=await User.findOne({ email })
      .select("+passwordHash");

    if(!user){
      return res.status(401).json({
        success:false,
        message:"Invalid email or password",
       }
      );
   }

    const isPasswordCorrect = await comparePassword(
      password,user.passwordHash
 );
    if(!isPasswordCorrect){
      return res.status(401).json({
         success: false,
        message: "Invalid email or password",
      }
       );
    }

    if(!user.isVerified){
     return res.status(403).json({
         success:false,
        message:"Please verify your email before logging in",
      }
    );
    }

    const accessToken=generateAccessToken(user._id);
    res.set("Cache-Control", "no-store");

    return res.status(200).json({
     success:true,
      message:"Login successful",
       data:{
        accessToken, tokenType: "Bearer",expiresIn: 3600,
      user: {
        id: user._id,
           name: user.name,
          email: user.email,
          isVerified: user.isVerified,
         },
 },
    });
  } catch (error) {
    next(error);
  }
};
module.exports={signup,verifyOtp,login,};