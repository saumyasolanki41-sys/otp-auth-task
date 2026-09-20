const{randomInt,createHmac,timingSafeEqual,}=require("node:crypto");

  const OTP_EXPIRY_MS=10*60*1000;
const MAX_OTP_ATTEMPTS = 5;
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
const matchesOtp=(email,otp,storedHash)=>{
  if(
    typeof storedHash!=="string"|| !/^[a-f0-9]{64}$/i.test(storedHash))
     {
    return false;
  }

    const submittedHash=hashOtp(email, otp);

  return timingSafeEqual(
    Buffer.from(submittedHash,"hex"),
    Buffer.from(storedHash,"hex")
  );
};

 module.exports={
  generateOtp,hashOtp,matchesOtp, OTP_EXPIRY_MS, MAX_OTP_ATTEMPTS,
 };