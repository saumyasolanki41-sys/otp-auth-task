const validateSignup=(req,res,next)=>{
  const body=req.body;

  if(!body||typeof body!=="object"||Array.isArray(body)){
    return res.status(400).json({
       success:false,
      message:"Request body must be a JSON object",
    } 
  );
  }

  const{name,email,password}=body;
  if (
         typeof name!=="string"||
        typeof email!=="string"||
       typeof password!=="string"
  ) 
  {
    return res.status(400).json({
      success:false,
       message:"Name,email,and password must be strings",
    } 
 );
  }

  const cleanName=name.trim();
   const cleanEmail=email.trim().toLowerCase();

  if(cleanName.length<2||cleanName.length>50){
    return res.status(400).json({
      success:false,
       message:"Name must contain 2 to 50 characters",
    }
      );
  }
  const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(cleanEmail.length>254||!emailPattern.test(cleanEmail)){
      return res.status(400).json({
        success:false,
      message:"Please provide a valid email address",
    }
      );
  }

  if(password.length < 12) {
    return res.status(400).json({
      success: false,
      message: "Password must contain at least 12 characters",
    }
 );
  }

  if(Buffer.byteLength(password,"utf8")>72){
    return res.status(400).json({
      success:false,
      message:"Password must not exceed 72 bytes",
    }
   );
 }
  req.signupData={
    name:cleanName,
    email:cleanEmail,
    password,
   };
  next();
};

const validateVerifyOtp=(req,res,next)=>{
  const body = req.body;
   if(!body||typeof body!=="object"||Array.isArray(body)){
    return res.status(400).json(
    {
      success:false,
       message:"Request body must be a JSON object",
    }
);
  }

  const{email,otp}=body;
  if(typeof email!=="string"||typeof otp!=="string"){
    return res.status(400).json(
  {
       success:false,
        message:"Email and OTP must be strings",
    }
  );
 }
   const cleanEmail=email.trim().toLowerCase();
  const cleanOtp=otp.trim();
   const emailPattern =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (cleanEmail.length>254||!emailPattern.test(cleanEmail)){
    return res.status(400).json(
    {
      success:false,
       message:"Please provide a valid email address",
      }
  );
  }

  if(!/^\d{6}$/.test(cleanOtp)){
    return res.status(400).json(
    {
      success:false,
       message:"OTP must contain exactly 6 digits",
    }
  );
    }

  req.verificationData={
     email:cleanEmail,
    otp:cleanOtp,
};

  next();
};

const validateLogin=(req,res,next)=>{
  const body=req.body;

  if (!body||typeof body!=="object"||Array.isArray(body)) {
    return res.status(400).json(
      {
      success:false,
      message:"Request body must be a JSON object",
    }
  );
  }

  const{email,password}=body;

  if(typeof email!=="string"||typeof password!=="string") {
    return res.status(400).json(
      {
      success:false,
      message:"Email and password must be strings",
    }
  );
  }

  const cleanEmail=email.trim().toLowerCase();
  const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (cleanEmail.length>254||!emailPattern.test(cleanEmail)) {
    return res.status(400).json(
      {
      success:false,
      message:"Please provide a valid email address",
    }
  );
  }

  if(
    password.length === 0||Buffer.byteLength(password, "utf8") > 72
  ) {
    return res.status(400).json({
      success:false,
      message:"Password must be provided and must not exceed 72 bytes",
    });
  }

  req.loginData={
    email:cleanEmail,password,
  };

  next();
};
module.exports = { validateSignup, validateVerifyOtp,validateLogin};