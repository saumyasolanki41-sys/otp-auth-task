require("dotenv").config();

const app=require("./app");
const connectDB=require("./config/db");
const User=require("./models/user");
const PORT=process.env.PORT ||5000;

const startServer=async()=>{
  try{
   const requiredVariables=["MONGODB_URI", "GMAIL_USER","GMAIL_APP_PASSWORD", "OTP_SECRET"];

    for(const variable of requiredVariables) {
      if(!process.env[variable]) {
        throw new Error(`${variable} is missing in .env`);
      }
    }

    if(!/^[a-f0-9]{64}$/i.test(process.env.OTP_SECRET)){
      throw new Error("OTP_SECRET must be a generated 64-character hex string");
  }
      await connectDB();
    await User.init();
    
     console.log("User model and indexes are ready");
    
    app.listen(PORT,()=>{
      console.log(`Server running at http://localhost:${PORT}`);
    }
  );

}catch(error){
    console.error("Failed to start application:", error.message);
     process.exit(1);
  }
};
startServer();