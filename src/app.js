const express=require("express");
 const authRoutes=require("./routes/auth.routes");
const errorHandler=require("./middleware/error.middleware");

const app = express();

 app.use(express.json({limit: "10kb"}));
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success:true,
    message:"API is running",
  }
);
  }
);
app.use("/api/auth", authRoutes);
  app.use((req,res)=>{
   res.status(404).json(
  {
     success: false,
    message: "Route not found",
  });
});
app.use(errorHandler);
module.exports = app;