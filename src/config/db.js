const mongoose=require("mongoose");

const connectDB=async()=>{
  const uri=process.env.MONGODB_URI;
  if(!uri){
    throw new Error("MONGODB_URI is missing in .env");
  }
  await mongoose.connect(uri,{
    serverSelectionTimeoutMS:5000,
  });
  console.log("MongoDB connected successfully");
};

module.exports=connectDB;