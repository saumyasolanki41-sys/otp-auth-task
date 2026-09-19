require("dotenv").config();

const app=require("./app");
const connectDB=require("./config/db");
const User=require("./models/user");
const PORT=process.env.PORT ||5000;

const startServer=async()=>{
  try{
    await connectDB();

    await User.init();
    console.log("User model and indexes are ready");
    
    app.listen(PORT,()=>{
      console.log(`Server running at http://localhost:${PORT}`);
    });

}catch(error){
    console.error("Failed to start application:", error.message);
    process.exit(1);
  }
};
startServer();