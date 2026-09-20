const{randomInt,createHmac}=require("node:crypto");

  const OTP_EXPIRY_MS=10*60*1000;

 const generateOtp=()=>{
   return randomInt(100000,1000000).toString();
 };

const hashOtp=(email,otp)=>{
  const secret=process.env.OTP_SECRET;

  if(!secret){
    throw new Error("OTP_SECRET is missing");
}

  return createHmac("sha256", secret)
     .update(`${email}:${otp}`)
    .digest("hex");
  };

 module.exports={
  generateOtp,hashOtp,
  OTP_EXPIRY_MS,
 };