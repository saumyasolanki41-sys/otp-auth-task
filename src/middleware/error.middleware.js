const errorHandler=(error,req,res,next)=>{
   if(res.headersSent){
    return next(error);
  }

    if(error.code===11000){
    return res.status(409).json({
       success:false,
      message:"An account already exists with this email",
     }
);
  }

  if(error.name==="ValidationError"){
    return res.status(400).json(
     {
       success:false,
      message:"Submitted data does not meet the required rules",
    }
);
     }

  if(error.type==="entity.parse.failed"){
    return res.status(400).json(
    {
       success:false,
      message:"Request body contains invalid JSON",
    }
);
  }

  if(error.type==="entity.too.large"){
    return res.status(413).json(
    {
      success:false,
       message:"Request body is too large",
    }
);
  }

  console.error("Request failed:",error);
  return res.status(500).json(
{
     success:false,
      message:"Something went wrong. Please try again later.",
  }
);
};
module.exports = errorHandler;