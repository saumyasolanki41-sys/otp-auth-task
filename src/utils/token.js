const jwt=require("jsonwebtoken");

const generateAccessToken=(userId)=>{
  const secret=process.env.JWT_SECRET;

    if(!secret){
     throw new Error("JWT_SECRET is missing");
 }
  return jwt.sign({},secret,{
     algorithm: "HS256",
      subject: userId.toString(),
      issuer:"otp-ath-task",
     audience:"otp-auth-taskclient",
     expiresIn:"1h",
  }
  );
};
module.exports = { generateAccessToken };